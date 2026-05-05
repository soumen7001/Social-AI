// UI Interactions and Components
export const showModal = (modal) => {
    hideAllModals();
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

export const hideAllModals = () => {
    const modals = ['loginModal', 'signupModal', 'profileModal', 'forgotModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('hidden');
    });
    
    // Reset specific states
    const forgotSuccess = document.getElementById('forgotSuccess');
    const forgotForm = document.getElementById('forgotForm');
    if (forgotSuccess) forgotSuccess.classList.add('hidden');
    if (forgotForm) forgotForm.classList.remove('hidden');
    
    document.body.style.overflow = '';
};

// Toast Notification System
export const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-xl shadow-2xl backdrop-blur-md border animate-fade-in-up flex items-center gap-3 min-w-[300px] z-[200]
        ${type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
          type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
          'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`;
    
    const icon = type === 'error' ? 'alert-circle' : type === 'success' ? 'check-circle' : 'info';
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <span class="text-sm font-semibold">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-8 right-8 flex flex-col gap-3 z-[200]';
    document.body.appendChild(container);
    return container;
}

// Stats Counter Animation
export const animateCount = (el, target, suffix = "") => {
    if (!el) return;
    let current = 0;
    const duration = 1000; // 1 second
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = (target > 1000 ? (target/1000).toFixed(1) + "k" : target) + suffix;
            clearInterval(timer);
        } else {
            el.textContent = (current > 1000 ? (current/1000).toFixed(1) + "k" : Math.floor(current)) + suffix;
        }
    }, stepTime);
};
