// AI Analysis Service
import { dbAdd } from './firebase-utils.js';
import { showToast, animateCount } from './ui.js';

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === "") 
    ? 'http://127.0.0.1:5000' 
    : 'https://your-production-backend.onrender.com';

export const analyzeContent = async (selectedFile, commentInput, currentUser) => {
    const hasTopic = commentInput.value.trim() !== "";
    const hasImage = !!selectedFile;

    if (!hasTopic && !hasImage) {
        showToast("Please upload an image or enter a topic.", "error");
        return;
    }

    const analyzeBtn = document.getElementById('analyze_image_btn');
    const analysisResultsDiv = document.getElementById('analysis_results');
    const resSentiment = document.getElementById('analysed_sentiment');
    const resTime = document.getElementById('analysed_time');
    const resViral = document.getElementById('analysed_viral');
    const resCaption = document.getElementById('analysed_caption');
    const resHashtags = document.getElementById('analysed_hashtags');

    analyzeBtn.disabled = true;
    analysisResultsDiv.style.opacity = '1';
    
    // Initial states
    [resSentiment, resTime, resViral].forEach(el => el.textContent = "...");
    resCaption.textContent = "AI is thinking...";

    let aiPredictions = [];
    let blipCaption = "";
    let clipHashtags = "";

    if (hasImage) {
        try {
            analyzeBtn.innerHTML = '<i data-lucide="scan" class="w-5 h-5 animate-spin"></i> Vision API Scanning...';
            if (window.lucide) lucide.createIcons();
            
            const formData = new FormData();
            formData.append('file', selectedFile);

            const aiRes = await fetch(`${API_BASE_URL}/analyze_image`, { method: 'POST', body: formData });
            if (!aiRes.ok) throw new Error("Vision server unavailable");
            
            const data = await aiRes.json();
            aiPredictions = (data.predictions || []).map(p => p.label);
            blipCaption = data.blip_caption || "";
            clipHashtags = data.clip_hashtags || "";

            const cnnBadge = document.getElementById('cnn_detected');
            const cnnContainer = document.getElementById('cnn_badge_container');
            if (cnnBadge) cnnBadge.textContent = aiPredictions.join(', ');
            if (cnnContainer) cnnContainer.classList.remove('hidden');
            
            const blipEl = document.getElementById('blip_description');
            if (blipEl) blipEl.textContent = blipCaption;
            
            if (resHashtags) resHashtags.textContent = clipHashtags;
        } catch (e) {
            console.error("Vision Error:", e);
            showToast("Vision API error. Using text fallback.", "info");
        }
    }

    analyzeBtn.innerHTML = '<i data-lucide="brain" class="w-5 h-5 animate-pulse"></i> Generating Strategy...';
    if (window.lucide) lucide.createIcons();

    const prompt = `Act as an expert Instagram growth strategist. Analyze this content: 
        ${hasImage ? `Visuals: ${aiPredictions.join(', ')}. Description: ${blipCaption}` : ''}
        Topic: ${commentInput.value.trim()}
        Return ONLY a JSON object with keys: sentiment, time, viral, caption, hashtags, comments (array).`;

    try {
        const aiRes = await fetch(`${API_BASE_URL}/generate_caption`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        const data = await aiRes.json();
        const res = parseAIResponse(data.caption);
        
        // Update UI
        resSentiment.textContent = res.sentiment;
        resTime.textContent = res.time;
        resViral.textContent = res.viral;
        resCaption.textContent = res.caption;
        if (!clipHashtags) resHashtags.textContent = res.hashtags;

        // Update suggested comments
        const commentsDiv = document.getElementById('suggested_comments');
        if (commentsDiv && res.comments) {
            commentsDiv.innerHTML = res.comments.map(c => `
                <div class="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl text-xs text-gray-300 italic flex items-start gap-3">
                    <i data-lucide="message-circle" class="w-4 h-4 text-purple-400 shrink-0"></i>
                    <span>${c}</span>
                </div>
            `).join('');
            if (window.lucide) lucide.createIcons();
        }

        // Animate Dashboard Stats
        updateDashboardStats(res.viral);

        // Save to History if logged in
        if (currentUser) {
            await dbAdd('analysis_history', {
                email: currentUser.email,
                topic: commentInput.value.trim() || blipCaption,
                result: res,
                type: 'analysis'
            });
        }
        
        showToast("Strategy generated successfully!", "success");
    } catch (err) {
        showToast("Failed to generate AI strategy.", "error");
    } finally {
        analyzeBtn.innerHTML = 'Optimize for Explore';
        analyzeBtn.disabled = false;
        if (window.lucide) lucide.createIcons();
    }
};

function parseAIResponse(text) {
    try {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}') + 1;
        return JSON.parse(text.substring(start, end));
    } catch {
        return {
            sentiment: "Optimized",
            time: "7:00 PM",
            viral: "High",
            caption: text.substring(0, 100),
            hashtags: "#instagram #growth",
            comments: []
        };
    }
}

function updateDashboardStats(viralScore) {
    const scoreMatch = viralScore.match(/(\d+(\.\d+)?)/);
    const score = scoreMatch ? parseFloat(scoreMatch[0]) : 8.5;
    
    animateCount(document.getElementById('est_likes'), Math.floor(score * 1200), "k");
    animateCount(document.getElementById('est_saves'), Math.floor(score * 300), "k");
    animateCount(document.getElementById('est_engagement'), Math.floor(score * 0.8), "%");
}
