// Main JavaScript for Margo & Drew's Adventures Travel Blog - Optimized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components with performance optimization
    const components = [
        initializeTheme,
        initializeSearch,
        initializeGallery,
        initializeNewsletter,
        initializeSmoothScrolling,
        initializeMobileMenu,
        initializeActiveNavigation,
        initializeGalleryFilters,
        initializeLazyLoading
    ];
    
    // Use requestAnimationFrame to batch component initialization
    const initializeComponents = () => {
        if (components.length > 0) {
            const component = components.shift();
            component();
            if (components.length > 0) {
                requestAnimationFrame(initializeComponents);
            }
        }
    };
    
    requestAnimationFrame(initializeComponents);
});

// Theme toggle functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('darkMode');
    
    // Set initial theme
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            this.innerHTML = isDarkMode ? '☀️' : '🌙';
            this.title = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            
            localStorage.setItem('darkMode', isDarkMode);
        });
    }
}

// Enhanced search functionality - Optimized
function initializeSearch() {
    const searchForm = document.querySelector('.nav-search-form');
    const searchInput = document.querySelector('.nav-search-input');
    
    if (!searchInput) return;
    
    // Debounced input handler
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.trim();
            if (query.length > 2) {
                // Future: implement search suggestions
            }
        }, 300);
    });
    
    // Optimized form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const query = searchInput.value.trim();
            if (!query) {
                e.preventDefault();
                searchInput.focus();
                searchInput.placeholder = 'Please enter a search term';
                setTimeout(() => {
                    searchInput.placeholder = 'Search...';
                }, 2000);
            }
        });
    }
}

// Enhanced gallery lightbox - Optimized
function initializeGallery() {
    // Remove any existing lightbox elements
    const existingLightbox = document.getElementById('lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create new lightbox
    createLightbox();
    
    // Use event delegation for better performance
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.matches('.lightbox-trigger, .gallery-img, .destination-card img, .post-card img')) {
            e.preventDefault();
            const src = target.src;
            const alt = target.alt;
            const caption = target.dataset.caption || alt;
            const location = target.dataset.location || '';
            const post = target.dataset.post || '';
            openLightbox(src, caption, location, post);
        }
    });
}

// Create lightbox HTML structure
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-overlay" id="lightbox-overlay"></div>
        <div class="lightbox-container">
            <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="lightbox-content">
                <img id="lightbox-image" alt="" />
                <div class="lightbox-info">
                    <h3 id="lightbox-caption"></h3>
                    <div class="lightbox-meta">
                        <span id="lightbox-location"></span>
                        <span id="lightbox-post"></span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add event listeners
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closeLightbox);
    }
    
    // Close when clicking X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Open lightbox with enhanced info - Optimized
function openLightbox(imageSrc, caption, location, post) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const captionEl = document.getElementById('lightbox-caption');
    const locationEl = document.getElementById('lightbox-location');
    const postEl = document.getElementById('lightbox-post');
    
    if (!lightbox || !lightboxImage) return;
    
    // Batch DOM updates
    requestAnimationFrame(() => {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = caption;
        
        if (captionEl) captionEl.textContent = caption || '';
        if (locationEl) locationEl.textContent = location ? `📍 ${location}` : '';
        if (postEl) postEl.textContent = post ? `📝 ${post}` : '';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close lightbox - Optimized
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Gallery filtering functionality
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with animation
            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    const category = item.dataset.category;
                    if (category && category.includes(filter)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
        });
    });
}

// Newsletter form handling
// Newsletter functionality - Optimized
function initializeNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    if (!forms.length) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (!emailInput || !button) return;
            
            const email = emailInput.value.trim();
            const originalText = button.textContent;
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Simulate API call with reduced delay
            setTimeout(() => {
                showMessage('Thank you for subscribing!', 'success');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    });
}

// Optimized email validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Show notification messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.notification-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `notification-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: #4caf50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-20px)';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Modern Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle mobile menu
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = isActive ? '' : 'hidden';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Add function to highlight active navigation links
function initializeActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-btn, .mobile-nav-btn');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove existing active classes
        link.classList.remove('active');
        
        // Add active class for exact matches or path matches
        if (href === currentPath || 
            (href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
        
        // Special case for home page
        if (currentPath === '/' && href === '/') {
            link.classList.add('active');
        }
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility function for AJAX requests (for future enhancements)
function makeRequest(url, method = 'GET', data = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: data ? JSON.stringify(data) : null
    }).then(response => response.json());
}

// Get CSRF token for Django
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Back to top functionality
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #42a5f5;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', addBackToTop);

// Global functions for template use
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Enhanced Destination Directory Functionality
class DestinationDirectory {
    constructor() {
        this.currentView = 'grid';
        this.currentFilter = 'all';
        this.currentSort = 'name';
        this.searchTimeout = null;
        this.destinations = [];
        this.filteredDestinations = [];
        this.carouselIndex = 0;
        this.carouselItemsPerView = 3;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeDestinations();
        this.initializeCarousel();
        this.initializeSearch();
        this.setupQuickActions();
    }
    
    bindEvents() {
        // View toggle events
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e.target.dataset.view));
        });
        
        // Filter tab events
        document.querySelectorAll('.filter-tab').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByContinent(e.target.dataset.continent));
        });
        
        // Sort events
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.sortDestinations(e.target.value));
        }
        
        // Search events
        const searchInput = document.getElementById('destination-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
            searchInput.addEventListener('blur', () => {
                setTimeout(() => this.hideSearchSuggestions(), 200);
            });
        }
        
        // Load more events
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreDestinations());
        }
        
        // Carousel events
        const carouselPrev = document.getElementById('carousel-prev');
        const carouselNext = document.getElementById('carousel-next');
        if (carouselPrev) carouselPrev.addEventListener('click', () => this.carouselPrevious());
        if (carouselNext) carouselNext.addEventListener('click', () => this.carouselNext());
        
        // Quick action events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-action')) {
                this.handleQuickAction(e);
            }
        });
        
        // Window resize for carousel
        window.addEventListener('resize', () => this.updateCarouselItemsPerView());
    }
    
    initializeDestinations() {
        // Collect all destination data from the DOM
        const destinationCards = document.querySelectorAll('.destination-card.enhanced, .destination-list-item');
        this.destinations = Array.from(destinationCards).map((card, index) => ({
            element: card,
            name: card.dataset.name || '',
            country: card.dataset.country || '',
            continent: card.dataset.continent || '',
            index: index
        }));
        this.filteredDestinations = [...this.destinations];
    }
    
    toggleView(view) {
        this.currentView = view;
        
        // Update toggle buttons
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Show/hide views
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        const mapView = document.getElementById('map-view');
        
        if (gridView) gridView.style.display = view === 'grid' ? 'grid' : 'none';
        if (listView) listView.style.display = view === 'list' ? 'block' : 'none';
        if (mapView) mapView.style.display = view === 'map' ? 'block' : 'none';
        
        if (view === 'map') {
            this.initializeMap();
        }
        
        // Animate view change
        this.animateViewChange();
    }
    
    animateViewChange() {
        const container = document.querySelector('.destinations-container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.3s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    filterByContinent(continent) {
        this.currentFilter = continent;
        
        // Update filter buttons
        document.querySelectorAll('.filter-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.continent === continent);
        });
        
        // Filter destinations
        if (continent === 'all') {
            this.filteredDestinations = [...this.destinations];
        } else {
            this.filteredDestinations = this.destinations.filter(dest => 
                dest.continent.includes(continent) || dest.country.includes(continent)
            );
        }
        
        this.updateDestinationDisplay();
        this.updateStats();
    }
    
    sortDestinations(sortBy) {
        this.currentSort = sortBy;
        
        this.filteredDestinations.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'country':
                    return a.country.localeCompare(b.country);
                case 'recent':
                    return b.index - a.index; // Reverse order for most recent
                case 'popular':
                    // Could be based on actual popularity metrics
                    return Math.random() - 0.5; // Random for demo
                default:
                    return 0;
            }
        });
        
        this.updateDestinationDisplay();
    }
    
    handleSearch(query) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            if (query.trim() === '') {
                this.filteredDestinations = [...this.destinations];
            } else {
                const searchTerm = query.toLowerCase();
                this.filteredDestinations = this.destinations.filter(dest => 
                    dest.name.includes(searchTerm) || 
                    dest.country.includes(searchTerm)
                );
            }
            
            this.updateDestinationDisplay();
            this.updateSearchSuggestions(query);
        }, 300);
    }
    
    updateDestinationDisplay() {
        // Hide all destinations first
        this.destinations.forEach(dest => {
            dest.element.style.display = 'none';
        });
        
        // Show filtered destinations
        this.filteredDestinations.forEach((dest, index) => {
            dest.element.style.display = 'block';
            dest.element.style.animationDelay = `${index * 0.1}s`;
            dest.element.classList.add('fade-in');
        });
        
        // Update empty state
        this.updateEmptyState();
    }
    
    updateEmptyState() {
        const hasResults = this.filteredDestinations.length > 0;
        const emptyState = document.querySelector('.empty-state');
        const destinationsContainer = document.querySelector('.destinations-container');
        
        if (emptyState && destinationsContainer) {
            if (hasResults) {
                emptyState.style.display = 'none';
                destinationsContainer.style.display = 'block';
            } else {
                emptyState.style.display = 'block';
                destinationsContainer.style.display = 'none';
            }
        }
    }
    
    updateStats() {
        // Update destination count in hero
        const countElement = document.querySelector('.hero-subtitle');
        if (countElement) {
            const count = this.filteredDestinations.length;
            countElement.textContent = `${count} Amazing Places${this.currentFilter !== 'all' ? ' Found' : ''}`;
        }
    }
    
    initializeSearch() {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;
        
        // Create suggestion items based on destinations
        const allTerms = new Set();
        this.destinations.forEach(dest => {
            allTerms.add(dest.name);
            allTerms.add(dest.country);
        });
        
        this.searchSuggestions = Array.from(allTerms).sort();
    }
    
    updateSearchSuggestions(query) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions || !query.trim()) {
            this.hideSearchSuggestions();
            return;
        }
        
        const matches = this.searchSuggestions.filter(term => 
            term.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        if (matches.length === 0) {
            this.hideSearchSuggestions();
            return;
        }
        
        suggestions.innerHTML = matches.map(match => 
            `<div class="suggestion-item" onclick="destinationDirectory.selectSuggestion('${match}')">${match}</div>`
        ).join('');
        
        this.showSearchSuggestions();
    }
    
    showSearchSuggestions() {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.classList.add('show');
        }
    }
    
    hideSearchSuggestions() {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.classList.remove('show');
        }
    }
    
    selectSuggestion(term) {
        const searchInput = document.getElementById('destination-search');
        if (searchInput) {
            searchInput.value = term;
            this.handleSearch(term);
        }
        this.hideSearchSuggestions();
    }
    
    initializeCarousel() {
        const carousel = document.getElementById('featured-carousel');
        if (!carousel) return;
        
        this.carouselItems = carousel.querySelectorAll('.carousel-card');
        this.updateCarouselItemsPerView();
        this.updateCarouselPosition();
        
        // Auto-play carousel
        setInterval(() => {
            this.carouselNext();
        }, 5000);
    }
    
    updateCarouselItemsPerView() {
        const width = window.innerWidth;
        if (width < 768) {
            this.carouselItemsPerView = 1;
        } else if (width < 1200) {
            this.carouselItemsPerView = 2;
        } else {
            this.carouselItemsPerView = 3;
        }
    }
    
    carouselNext() {
        if (!this.carouselItems) return;
        
        const maxIndex = this.carouselItems.length - this.carouselItemsPerView;
        this.carouselIndex = this.carouselIndex >= maxIndex ? 0 : this.carouselIndex + 1;
        this.updateCarouselPosition();
    }
    
    carouselPrevious() {
        if (!this.carouselItems) return;
        
        const maxIndex = this.carouselItems.length - this.carouselItemsPerView;
        this.carouselIndex = this.carouselIndex <= 0 ? maxIndex : this.carouselIndex - 1;
        this.updateCarouselPosition();
    }
    
    updateCarouselPosition() {
        const carousel = document.getElementById('featured-carousel');
        if (!carousel) return;
        
        const itemWidth = 350 + 24; // Item width + gap
        const translateX = -this.carouselIndex * itemWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    initializeMap() {
        const mapContainer = document.getElementById('world-map');
        if (!mapContainer) return;
        
        // This would integrate with a real map library like Leaflet or Mapbox
        console.log('Map initialized - would integrate with mapping library');
        
        // For demo, just update the placeholder text
        const placeholder = mapContainer.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.textContent = `Interactive Map - ${this.filteredDestinations.length} destinations`;
        }
    }
    
    setupQuickActions() {
        // Initialize favorites from localStorage
        this.favorites = JSON.parse(localStorage.getItem('destination-favorites') || '[]');
        this.updateFavoriteButtons();
    }
    
    handleQuickAction(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const action = e.target.closest('.quick-action');
        const card = action.closest('.destination-card, .destination-list-item');
        const destinationName = card.dataset.name;
        
        if (action.title === 'Add to Favorites') {
            this.toggleFavorite(destinationName);
        } else if (action.title === 'Share') {
            this.shareDestination(destinationName);
        }
    }
    
    toggleFavorite(destinationName) {
        const index = this.favorites.indexOf(destinationName);
        
        if (index === -1) {
            this.favorites.push(destinationName);
            this.showNotification(`Added ${destinationName} to favorites!`);
        } else {
            this.favorites.splice(index, 1);
            this.showNotification(`Removed ${destinationName} from favorites!`);
        }
        
        localStorage.setItem('destination-favorites', JSON.stringify(this.favorites));
        this.updateFavoriteButtons();
    }
    
    updateFavoriteButtons() {
        document.querySelectorAll('.destination-card, .destination-list-item').forEach(card => {
            const name = card.dataset.name;
            const favoriteBtn = card.querySelector('.quick-action[title="Add to Favorites"]');
            
            if (favoriteBtn) {
                const isFavorite = this.favorites.includes(name);
                favoriteBtn.style.background = isFavorite ? '#ef4444' : 'rgba(255, 255, 255, 0.9)';
                favoriteBtn.querySelector('svg').style.fill = isFavorite ? 'white' : 'none';
            }
        });
    }
    
    shareDestination(destinationName) {
        if (navigator.share) {
            navigator.share({
                title: `Check out ${destinationName}!`,
                text: `I found this amazing destination on Margo & Drew's Adventures`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!');
            });
        }
    }
    
    loadMoreDestinations() {
        // This would typically load more data from the server
        // For demo, just show a message
        this.showNotification('Loading more destinations... (Demo feature)');
        
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                loadMoreBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--blue-600);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Video Background Management
class VideoBackground {
    constructor() {
        this.video = document.querySelector('.hero-video');
        this.heroSection = document.querySelector('.hero, .about-hero, .search-hero, .destinations-hero');
        this.observer = null;
        
        if (this.video && this.heroSection) {
            this.init();
        }
    }
    
    init() {
        this.setupVideoEvents();
        this.setupIntersectionObserver();
        this.checkConnectionSpeed();
    }
    
    setupVideoEvents() {
        // Handle video load events
        this.video.addEventListener('loadeddata', () => {
            this.video.classList.add('loaded');
            console.log('Hero video loaded successfully');
        });
        
        this.video.addEventListener('error', () => {
            console.log('Video failed to load, using fallback background');
            this.video.style.display = 'none';
        });
        
        // Ensure video plays when ready
        this.video.addEventListener('canplaythrough', () => {
            this.video.play().catch(error => {
                console.log('Video autoplay failed:', error);
                // Fallback to poster image or static background
                this.video.style.display = 'none';
            });
        });
        
        // Handle video end (though it should loop)
        this.video.addEventListener('ended', () => {
            this.video.currentTime = 0;
            this.video.play();
        });
    }
    
    setupIntersectionObserver() {
        // Pause video when not in viewport for performance
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playVideo();
                } else {
                    this.pauseVideo();
                }
            });
        }, {
            threshold: 0.25
        });
        
        this.observer.observe(this.heroSection);
    }
    
    playVideo() {
        if (this.video && this.video.paused) {
            this.video.play().catch(error => {
                console.log('Could not resume video:', error);
            });
            this.video.classList.remove('paused');
        }
    }
    
    pauseVideo() {
        if (this.video && !this.video.paused) {
            this.video.pause();
            this.video.classList.add('paused');
        }
    }
    
    checkConnectionSpeed() {
        // Check for slow connection and disable video if needed
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // If slow connection (2G or slow 3G), hide video
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                console.log('Slow connection detected, disabling video background');
                this.video.style.display = 'none';
                return;
            }
            
            // If user has data saver on, hide video
            if (connection.saveData) {
                console.log('Data saver mode detected, disabling video background');
                this.video.style.display = 'none';
                return;
            }
        }
        
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('User prefers reduced motion, disabling video background');
            this.video.style.display = 'none';
            return;
        }
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Create placeholder video files function (for development)
function createPlaceholderVideo() {
    // This function would be used to create a sample video or provide instructions
    console.log('🎬 Video background feature active on all hero sections!');
    console.log('📁 Please add your travel video files to: static/videos/');
    console.log('📹 Required files:');
    console.log('   - travel-hero.mp4 (recommended: 1920x1080, 30fps, compressed)');
    console.log('   - travel-hero.webm (alternative format for better compression)');
    console.log('✨ Video specifications:');
    console.log('   - Duration: 10-30 seconds long');
    console.log('   - Loopable: seamless beginning and end');
    console.log('   - File size: under 5MB for good performance');
    console.log('   - Content: travel/destination themed footage');
    console.log('🌟 The video will appear on: Home, Blog, Gallery, About, Destinations, and Search pages!');
}

// Initialize video background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video background on any page with hero sections
    const heroSections = document.querySelectorAll('.hero, .about-hero, .search-hero, .destinations-hero');
    
    if (heroSections.length > 0) {
        window.videoBackground = new VideoBackground();
        
        // Show helpful console message about video files
        createPlaceholderVideo();
    }
    
    // Initialize destination directory if we're on the destinations page
    if (document.querySelector('.destinations-hero')) {
        window.destinationDirectory = new DestinationDirectory();
    }
});

// Cleanup when leaving page
window.addEventListener('beforeunload', function() {
    if (window.videoBackground) {
        window.videoBackground.destroy();
    }
});

// Quick Preview Modal Functions
function showQuickPreview(destinationSlug) {
    const modal = document.getElementById('quick-preview-modal');
    const content = document.getElementById('preview-content');
    
    if (!modal || !content) return;
    
    // Show loading state
    content.innerHTML = `
        <div style="padding: 3rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🌍</div>
            <p>Loading destination preview...</p>
        </div>
    `;
    
    modal.classList.add('show');
    
    // Simulate loading preview data
    setTimeout(() => {
        content.innerHTML = `
            <div style="padding: 2rem;">
                <h2 style="margin-bottom: 1rem;">Quick Preview</h2>
                <p>This would show a quick preview of the destination with key highlights, photos, and quick facts.</p>
                <div style="margin-top: 2rem;">
                    <button class="btn-primary" onclick="closeQuickPreview()">View Full Destination</button>
                </div>
            </div>
        `;
    }, 1000);
}

function closeQuickPreview() {
    const modal = document.getElementById('quick-preview-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function clearFilters() {
    if (window.destinationDirectory) {
        window.destinationDirectory.filterByContinent('all');
        
        const searchInput = document.getElementById('destination-search');
        if (searchInput) {
            searchInput.value = '';
            window.destinationDirectory.handleSearch('');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize destination directory if we're on the destinations page
    if (document.querySelector('.destinations-hero')) {
        window.destinationDirectory = new DestinationDirectory();
    }
});

// Add CSS for fade-in animation
const fadeInCSS = `
.fade-in {
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.notification {
    font-weight: 600;
    font-size: 0.9rem;
}
`;

// Add the CSS to the document
if (!document.querySelector('#destination-directory-animations')) {
    const style = document.createElement('style');
    style.id = 'destination-directory-animations';
    style.textContent = fadeInCSS;
    document.head.appendChild(style);
}
