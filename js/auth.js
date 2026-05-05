// Authentication and Profile Logic
import { 
    signInUser, 
    signUpUser, 
    signInWithGoogle, 
    signOutUser, 
    dbSet, 
    dbGet 
} from './firebase-utils.js';
import { showToast, hideAllModals, showModal } from './ui.js';

let currentUser = null;

export const getCurrentUser = () => currentUser;

export const updateAuthUI = (user) => {
    if (user !== undefined) {
        if (user) {
            currentUser = { 
                name: user.displayName || user.name || user.email.split('@')[0], 
                email: user.email,
                photo: user.photoURL || user.photo
            };
            localStorage.setItem('social_user', JSON.stringify(currentUser));
        } else {
            currentUser = null;
            localStorage.removeItem('social_user');
        }
    }

    const navName = document.getElementById('navUserName');
    const navAvatar = document.getElementById('navUserAvatar');
    const loginBtn = document.getElementById('loginBtn');
    
    if (currentUser) {
        const pName = document.getElementById('profileName');
        const pEmail = document.getElementById('profileEmail');
        if (pName) pName.textContent = currentUser.name;
        if (pEmail) pEmail.textContent = currentUser.email;
        
        if (navName) navName.textContent = currentUser.name.split(' ')[0];
        
        if (navAvatar && currentUser.photo) {
            navAvatar.innerHTML = `<img src="${currentUser.photo}" class="w-full h-full object-cover">`;
        } else if (navAvatar) {
            navAvatar.innerHTML = `<i data-lucide="user" class="w-5 h-5"></i>`;
            if (window.lucide) lucide.createIcons();
        }

        if (loginBtn) loginBtn.textContent = 'Dashboard';
    } else {
        if (navName) navName.textContent = 'Profile';
        if (navAvatar) navAvatar.innerHTML = `<i data-lucide="user" class="w-5 h-5"></i>`;
        if (window.lucide) lucide.createIcons();
        if (loginBtn) loginBtn.textContent = 'Start Growing';
    }
};

export const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Authenticating...';
        const email = document.getElementById('login_email').value;
        const password = document.getElementById('login_password').value;

        const user = await signInUser(email, password);
        const profile = await dbGet('profiles', email);
        const name = profile ? profile.name : (user.displayName || email.split('@')[0]);
        
        updateAuthUI({ ...user, name });
        hideAllModals();
        showToast(`Welcome back, ${name}!`, 'success');
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
};

export const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    try {
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;
        const name = document.getElementById('signup_name').value;
        const email = document.getElementById('signup_email').value;
        const password = document.getElementById('signup_password').value;
        
        const user = await signUpUser(email, password, name);
        await dbSet('profiles', email, { name, email, type: 'auth_signup' });
        
        updateAuthUI({ ...user, name });
        hideAllModals();
        showToast(`Account created! Welcome ${name}!`, 'success');
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        submitBtn.textContent = 'Generate Account';
        submitBtn.disabled = false;
    }
};

export const handleGoogleAuth = async () => {
    try {
        const user = await signInWithGoogle();
        const name = user.displayName || user.email.split('@')[0];
        const email = user.email;

        const profile = await dbGet('profiles', email);
        if (!profile) {
            await dbSet('profiles', email, { name, email, type: 'google_auth' });
        }

        updateAuthUI(user);
        hideAllModals();
        showToast(`Signed in as ${name}`, 'success');
    } catch (err) {
        if (!['auth/cancelled-popup-request', 'auth/popup-closed-by-user'].includes(err.code)) {
            showToast(err.message, 'error');
        }
    }
};

export const handleLogout = async () => {
    try {
        await signOutUser();
        updateAuthUI(null);
        hideAllModals();
        showToast("Signed out successfully.", 'success');
    } catch (err) {
        showToast(err.message, 'error');
    }
};
