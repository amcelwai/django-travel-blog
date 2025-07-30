// Simple JavaScript for Margo & Drew's Adventures Travel Blog

document.addEventListener('DOMContentLoaded', function() {
    // Initialize basic functionality
    initializeNavigation();
    initializeSearch();
    initializeGallery();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                alert('Please enter a search term');
            }
        });
    }
}

// Simple gallery functionality
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Simple alert for now - can be enhanced with a proper lightbox later
            alert('Lightbox functionality would open here for: ' + (this.alt || 'Image'));
        });
    });
}

// Newsletter form
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! (This is a demo)');
                this.reset();
            }
        });
    });
}

// Initialize newsletter on page load
document.addEventListener('DOMContentLoaded', initializeNewsletter);
