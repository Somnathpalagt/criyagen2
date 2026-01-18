// Footer Component JavaScript
class FooterComponent {
    constructor() {
        this.backToTop = document.getElementById('backToTop');
        this.newsletterForm = document.getElementById('footerNewsletter');
        this.currentYearElements = document.querySelectorAll('.current-year');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCurrentYear();
        this.initBackToTop();
        this.initNewsletterForm();
    }
    
    bindEvents() {
        // Smooth scroll for footer links
        const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    updateCurrentYear() {
        const currentYear = new Date().getFullYear();
        this.currentYearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    initBackToTop() {
        if (!this.backToTop) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        this.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    initNewsletterForm() {
        if (!this.newsletterForm) return;
        
        this.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = this.newsletterForm.querySelector('input[type="email"]');
            const submitButton = this.newsletterForm.querySelector('.btn-subscribe');
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!this.isValidEmail(email)) {
                this.showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In production, this would be an actual API call
                console.log('Subscribed email:', email);
                
                // Show success message
                this.showNotification('Thank you for subscribing to our newsletter!', 'success');
                
                // Reset form
                this.newsletterForm.reset();
                
                // Restore button
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.footer-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `footer-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('#footer-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'footer-notification-styles';
            style.textContent = `
                .footer-notification {
                    position: fixed;
                    bottom: 100px;
                    right: 30px;
                    z-index: 1000;
                    animation: slideInUp 0.3s ease;
                }
                
                .footer-notification.success {
                    background: linear-gradient(135deg, #2e7d32, #4caf50);
                    color: white;
                }
                
                .footer-notification.error {
                    background: linear-gradient(135deg, #f44336, #e53935);
                    color: white;
                }
                
                .notification-content {
                    padding: 15px 20px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: 10px;
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutDown 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add slideOutDown animation
        if (!document.querySelector('#slideOutDown')) {
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOutDown {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(slideOutStyle);
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('footer.footer')) {
        window.criyagenFooter = new FooterComponent();
    }
});
