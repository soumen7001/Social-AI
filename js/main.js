// Main Entry Point
import { onAuthUpdate } from './firebase-utils.js';
import { updateAuthUI, handleLogin, handleSignup, handleGoogleAuth, handleLogout, getCurrentUser } from './auth.js';
import { showModal, hideAllModals, showToast } from './ui.js';
import { analyzeContent } from './analysis.js';
import { fetchUserHistory, clearUserHistory } from './history.js';
import { sendResetEmail } from './firebase-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const loginBtn = document.getElementById('loginBtn');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleSignupBtn = document.getElementById('googleSignupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const analyzeBtn = document.getElementById('analyze_image_btn');
    const imageInput = document.getElementById('image_upload');
    const commentInput = document.getElementById('comment_input');
    
    const profileBtn = document.getElementById('profileBtn');
    const historyList = document.getElementById('historyList');
    const historyCount = document.getElementById('historyCount');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    // Restoration of missing logic
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const forgotPwdBtn = document.getElementById('forgotPwdBtn');
    const forgotForm = document.getElementById('forgotForm');

    let selectedFile = null;
    let currentHistoryItems = [];

    // Initialize Auth
    onAuthUpdate(user => {
        updateAuthUI(user);
    });

    // Initialize UI from cache
    const cachedUser = localStorage.getItem('social_user');
    if (cachedUser) updateAuthUI(JSON.parse(cachedUser));

    // Event Listeners
    loginBtn?.addEventListener('click', () => {
        const user = getCurrentUser();
        if (user) {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            showModal(document.getElementById('loginModal'));
        }
    });

    document.getElementById('scrollToTools')?.addEventListener('click', () => {
        document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Modal Switching
    switchToSignup?.addEventListener('click', () => showModal(document.getElementById('signupModal')));
    switchToLogin?.addEventListener('click', () => showModal(document.getElementById('loginModal')));
    forgotPwdBtn?.addEventListener('click', () => showModal(document.getElementById('forgotModal')));

    // Forgot Password
    forgotForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot_email').value;
        const submitBtn = forgotForm.querySelector('button[type="submit"]');
        try {
            submitBtn.disabled = true;
            await sendResetEmail(email);
            document.getElementById('forgotSuccess')?.classList.remove('hidden');
            showToast("Reset link sent!", "success");
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            submitBtn.disabled = false;
        }
    });

    // Forms
    loginForm?.addEventListener('submit', handleLogin);
    signupForm?.addEventListener('submit', handleSignup);
    googleLoginBtn?.addEventListener('click', handleGoogleAuth);
    googleSignupBtn?.addEventListener('click', handleGoogleAuth);
    logoutBtn?.addEventListener('click', handleLogout);

    // Analysis
    imageInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('image_preview');
                const prompt = document.getElementById('upload_prompt');
                if (preview) {
                    preview.src = event.target.result;
                    preview.classList.remove('hidden');
                }
                if (prompt) prompt.classList.add('hidden');
                document.getElementById('change_content_btn')?.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    analyzeBtn?.addEventListener('click', () => {
        analyzeContent(selectedFile, commentInput, getCurrentUser());
    });

    // Profile & History
    profileBtn?.addEventListener('click', async () => {
        const user = getCurrentUser();
        if (user) {
            showModal(document.getElementById('profileModal'));
            currentHistoryItems = await fetchUserHistory(user, historyList, historyCount);
        } else {
            showModal(document.getElementById('loginModal'));
        }
    });

    clearHistoryBtn?.addEventListener('click', async () => {
        const success = await clearUserHistory(getCurrentUser(), currentHistoryItems);
        if (success) {
            currentHistoryItems = [];
            fetchUserHistory(getCurrentUser(), historyList, historyCount);
        }
    });

    // Modal Close logic
    document.querySelectorAll('[id^="close"], [id$="Overlay"]').forEach(el => {
        el.addEventListener('click', hideAllModals);
    });

    // Initialize Icons
    if (window.lucide) lucide.createIcons();
});
