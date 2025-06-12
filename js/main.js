// Enhanced functionality for Active Education Management Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form validation and submission
    const subscribeForm = document.querySelector('.home-subscription');
    const emailInput = document.querySelector('.home-textinput');
    const subscribeButton = document.querySelector('.home-subscribe');

    if (subscribeForm && emailInput && subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }

    // Enhanced mobile menu functionality
    const mobileMenu = document.querySelector('#mobile-menu');
    const closeButton = document.querySelector('#close-mobile-menu');
    const openButton = document.querySelector('#open-mobile-menu');

    if (openButton && mobileMenu) {
        openButton.addEventListener('click', function() {
            mobileMenu.style.transform = 'translateX(0%)';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if (closeButton && mobileMenu) {
        closeButton.addEventListener('click', function() {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && 
            !mobileMenu.contains(e.target) && 
            !openButton.contains(e.target) &&
            mobileMenu.style.transform === 'translateX(0%)') {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = 'auto';
        }
    });

    // Add loading states to CTA buttons
    const ctaButtons = document.querySelectorAll('.template-button, .home-get-started1, .home-get-started2, .home-get-started3, .home-get-started4, .home-get-started5, .home-get-started6, .home-get-started7');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Simulate processing time
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Show appropriate message based on button type
                if (originalText.includes('Free') || originalText.includes('Trial')) {
                    showNotification('Redirecting to sign up...', 'success');
                } else if (originalText.includes('Contact')) {
                    showNotification('Opening contact form...', 'info');
                } else {
                    showNotification('Processing request...', 'info');
                }
            }, 1500);
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    // Observe cards and feature sections
    const animateElements = document.querySelectorAll('.card, .home-banner-manage, .home-banner-advanced-analytics, .home-pricing');
    animateElements.forEach(el => observer.observe(el));

    // Add scroll progress indicator
    createScrollProgressIndicator();

    // Add testimonials or reviews section functionality
    initializeTestimonials();
});

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    // Set color based on type
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3',
        warning: '#FF9800'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #5228F5, #85DCFF);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

function initializeTestimonials() {
    // Add rotating testimonials functionality if testimonial elements exist
    const testimonials = document.querySelectorAll('.testimonal');
    if (testimonials.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            testimonials[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.opacity = '1';
        }, 5000);
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('#mobile-menu');
        if (mobileMenu && mobileMenu.style.transform === 'translateX(0%)') {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = 'auto';
        }
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
} 