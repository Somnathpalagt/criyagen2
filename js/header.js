// Header Component JavaScript
class HeaderComponent {
    constructor() {
        this.header = document.getElementById('mainHeader');
        this.navMenu = document.getElementById('navMenu');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileSearchBtn = document.getElementById('mobileSearchBtn');
        this.mobileSearchBar = document.getElementById('mobileSearchBar');
        this.searchCloseBtn = document.getElementById('searchCloseBtn');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setActiveNav();
        this.initStickyHeader();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Mobile search toggle
        if (this.mobileSearchBtn) {
            this.mobileSearchBtn.addEventListener('click', () => this.toggleMobileSearch());
        }
        
        // Close search
        if (this.searchCloseBtn) {
            this.searchCloseBtn.addEventListener('click', () => this.closeMobileSearch());
        }
        
        // Dropdowns
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Close mobile menu on link click
        const navLinks = this.navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
                this.closeAllDropdowns();
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
                this.closeAllDropdowns();
                this.closeMobileSearch();
            }
        });
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page === 'index' ? 'home' : page;
    }
    
    setActiveNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            link.classList.toggle('active', page === this.currentPage);
            
            // Also activate parent dropdown if child is active
            if (page === this.currentPage) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('active');
                }
            }
        });
    }
    
    initStickyHeader() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Close search if open
        this.closeMobileSearch();
    }
    
    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    toggleMobileSearch() {
        this.mobileSearchBar.classList.toggle('active');
        
        // Focus on input when opened
        if (this.mobileSearchBar.classList.contains('active')) {
            const searchInput = this.mobileSearchBar.querySelector('input');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
        }
        
        // Close menu if open
        this.closeMobileMenu();
    }
    
    closeMobileSearch() {
        this.mobileSearchBar.classList.remove('active');
    }
    
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        this.closeAllDropdowns();
        
        if (!isActive) {
            dropdown.classList.add('active');
        }
    }
    
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mainHeader')) {
        window.criyagenHeader = new HeaderComponent();
    }
});
