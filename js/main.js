// Main JavaScript File
// Load components and initialize common functionality

class MainApp {
    constructor() {
        this.isLoading = false;
        this.init();
    }
    
    async init() {
        // Load components
        await this.loadComponents();
        
        // Initialize common functionality
        this.initCommonFeatures();
        
        // Remove loading screen
        this.removeLoadingScreen();
    }
    
    async loadComponents() {
        try {
            // Load Header
            const headerResponse = await fetch('components/header.html');
            const headerHTML = await headerResponse.text();
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
            }
            
            // Load Footer
            const footerResponse = await fetch('components/footer.html');
            const footerHTML = await footerResponse.text();
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }
            
            console.log('Components loaded successfully');
            
        } catch (error) {
            console.error('Error loading components:', error);
            this.showError('Unable to load page components. Please refresh the page.');
        }
    }
    
    initCommonFeatures() {
        // Initialize tooltips
        this.initTooltips();
        
        // Initialize form validation
        this.initForms();
        
        // Initialize smooth scrolling for anchor links
        this.initSmoothScroll();
        
        // Initialize lazy loading for images
        this.initLazyLoading();
    }
    
    initTooltips() {
        // Tooltip initialization
        const tooltipElements = document.querySelectorAll('[title]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = e.target.getAttribute('title');
                if (tooltipText) {
                    this.showTooltip(e, tooltipText);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    showTooltip(event, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.position = 'fixed';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '10000';
        tooltip.style.pointerEvents = 'none';
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const x = event.clientX + 10;
        const y = event.clientY + 10;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        
        // Store reference
        this.currentTooltip = tooltip;
    }
    
    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }
    
    initForms() {
        // Form validation for all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            // Remove previous error messages
            const existingError = input.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }
            
            // Validate based on input type
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    this.showInputError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                if (!phoneRegex.test(input.value)) {
                    this.showInputError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
            
            // Required field validation
            if (!input.value.trim()) {
                this.showInputError(input, 'This field is required');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showInputError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        
        input.parentNode.insertBefore(errorElement, input.nextSibling);
        
        // Auto-remove error class on input
        input.addEventListener('input', function clearError() {
            this.classList.remove('error');
            if (errorElement.parentNode) {
                errorElement.remove();
            }
            this.removeEventListener('input', clearError);
        });
    }
    
    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initLazyLoading() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img.lazy').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Add fade-out animation
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }
    }
    
    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'global-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        // Style the error
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.zIndex = '9999';
        errorDiv.style.background = 'linear-gradient(135deg, #f44336, #e53935)';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '15px 20px';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        errorDiv.style.animation = 'slideInRight 0.3s ease';
        
        document.body.appendChild(errorDiv);
        
        // Close button
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => errorDiv.remove(), 300);
        });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 10000);
    }
}

// Initialize the main application
document.addEventListener('DOMContentLoaded', () => {
    window.criyagenApp = new MainApp();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MainApp, debounce, throttle };
}
