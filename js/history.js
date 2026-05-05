// History Management Service
import { dbQuery, dbDelete } from './firebase-utils.js';
import { showToast } from './ui.js';

export const fetchUserHistory = async (currentUser, historyList, historyCount) => {
    if (!currentUser || !historyList) return;

    historyList.innerHTML = '<div class="py-10 text-center animate-pulse text-gray-500 text-sm">Syncing with neural records...</div>';

    try {
        const [analysisHits, commentHits] = await Promise.all([
            dbQuery('analysis_history', 'email', currentUser.email),
            dbQuery('comment_suggestions', 'email', currentUser.email)
        ]);

        let combined = [
            ...analysisHits.map(h => ({ ...h, type: 'analysis' })),
            ...commentHits.map(h => ({ ...h, type: 'comment' }))
        ].sort((a, b) => new Date(b.serverTimestamp || b.updatedAt) - new Date(a.serverTimestamp || a.updatedAt));

        if (historyCount) historyCount.textContent = `${combined.length} Items`;

        if (combined.length === 0) {
            historyList.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 text-gray-600">
                  <i data-lucide="history" class="w-12 h-12 mb-4 opacity-20"></i>
                  <p class="text-sm">No recent activity found.</p>
                </div>
            `;
        } else {
            historyList.innerHTML = combined.slice(0, 20).map(item => {
                const date = new Date(item.serverTimestamp || item.updatedAt).toLocaleDateString();
                const isAnalysis = item.type === 'analysis';
                return `
                    <div class="bg-white/5 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all text-left">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <div class="p-1.5 rounded-lg ${isAnalysis ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}">
                                    <i data-lucide="${isAnalysis ? 'bar-chart' : 'message-circle'}" class="w-3 h-3"></i>
                                </div>
                                <span class="text-[10px] uppercase font-bold tracking-widest text-gray-400">${isAnalysis ? 'AI Audit' : 'Engagement Gen'}</span>
                            </div>
                            <span class="text-[10px] text-gray-600 font-medium">${date}</span>
                        </div>
                        <p class="text-sm font-semibold text-white truncate mb-1">${item.topic || 'Untitled Session'}</p>
                        <p class="text-xs text-gray-500 line-clamp-1">${isAnalysis ? (item.result?.sentiment || 'Analysis generated') : (item.suggestions?.[0] || 'Suggestions generated')}</p>
                    </div>
                `;
            }).join('');
        }
        if (window.lucide) lucide.createIcons();
        return combined;
    } catch (err) {
        console.error("History Syncing Failed:", err);
        historyList.innerHTML = '<p class="text-red-400 text-xs py-4 text-center">Failed to load history.</p>';
        return [];
    }
};

export const clearUserHistory = async (currentUser, items) => {
    if (!currentUser || items.length === 0) return;
    
    if (!confirm("Are you sure you want to permanently delete all your recent activity?")) return;

    try {
        const deletePromises = items.map(item => {
            const collection = item.type === 'analysis' ? 'analysis_history' : 'comment_suggestions';
            return dbDelete(collection, item.id);
        });
        
        await Promise.all(deletePromises);
        showToast("History cleared successfully.", "success");
        return true;
    } catch (err) {
        showToast("Failed to clear some items.", "error");
        return false;
    }
};
