// ============================================
// PARAGON CLINIC - JAVASCRIPT INTERACTIONS
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down (only after scrolling past 500px, skip if mobile menu open)
        if (currentScroll > lastScroll && currentScroll > 500 && !document.body.classList.contains('mobile-menu-open')) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(currentScroll * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mobile menu is handled by components.js (initializeMobileMenu)

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // FLOATING CONTACT MENU
    // ============================================
    const contactToggle = document.getElementById('contactToggle');
    const floatingMenu = document.getElementById('floatingMenu');

    if (contactToggle && floatingMenu) {
        contactToggle.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!contactToggle.contains(e.target) && !floatingMenu.contains(e.target)) {
                floatingMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // REVIEWS FILTER (Homepage - event delegation)
    // ============================================
    const reviewsFilter = document.querySelector('.reviews-filter');
    if (reviewsFilter) {
        reviewsFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            reviewsFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.review-card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                branch: document.getElementById('branch').value,
                message: document.getElementById('message').value
            };

            // Show success message (you can customize this)
            alert(`ขอบคุณคุณ ${formData.name}!\n\nเราได้รับข้อมูลการจองของคุณแล้ว\nทีมงานจะติดต่อกลับเร็วๆ นี้ผ่านเบอร์ ${formData.phone}\n\nบริการที่เลือก: ${formData.service}\nสาขา: ${formData.branch}`);

            // Reset form
            bookingForm.reset();

            // In production, you would send this data to a server
            console.log('Form submitted:', formData);
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all service cards, review cards, blog cards
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .blog-card, .branch-card, .promo-card, .feature-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header, .section-title');
    sectionHeaders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const statItems = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = element.textContent;
        const number = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[0-9,]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statItems.forEach(stat => animateCounter(stat));
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ============================================
    // LAZY LOADING IMAGES (for when real images are added)
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // FORM VALIDATION
    // ============================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                input.style.borderColor = '#4caf50';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ============================================
    // PREVENT EMPTY FORM SUBMISSION
    // ============================================
    if (bookingForm) {
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                const isValid = bookingForm.checkValidity();
                if (isValid) {
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                } else {
                    submitBtn.style.opacity = '0.7';
                }
            });
        });
    }

    // ============================================
    // TOOLTIP FOR SERVICE CARDS (optional enhancement)
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ============================================
    // LOADING STATE
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading spinner if present
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    });

    // ============================================
    // ACCESSIBILITY: Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            floatingMenu.classList.remove('active');
        }

        // Tab key management for floating menu
        if (e.key === 'Tab' && floatingMenu.classList.contains('active')) {
            const focusableElements = floatingMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });

    // ============================================
    // PERFORMANCE: Debounce Scroll Events
    // ============================================
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

    // Apply debounce to scroll-heavy functions
    const debouncedUpdateNav = debounce(updateActiveNavLink, 100);
    window.addEventListener('scroll', debouncedUpdateNav);

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c✨ Paragon Clinic Website ✨', 'color: #e91e63; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped with 💖 for Dr.Den', 'color: #ff6f91; font-size: 14px;');
    console.log('%cWebsite is ready! 🚀', 'color: #4caf50; font-size: 14px;');

});

// ============================================
// CURSOR TRAIL EFFECT (Optional Modern Effect)
// ============================================
document.addEventListener('mousemove', (e) => {
    // Create ripple effect on mouse move (subtle)
    if (Math.random() > 0.95) { // Only create effect occasionally
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================
const tiltCards = document.querySelectorAll('.service-card, .promo-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// MAGNETIC BUTTONS EFFECT
// ============================================
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format phone number for display
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// PROMOTION CAROUSEL (Slide by 1, Position-based tilt)
// ============================================
function initPromoCarousel() {
    const track = document.querySelector('.promo-carousel-track');
    const slides = document.querySelectorAll('.promo-image-slide');
    const prevBtn = document.querySelector('.promo-carousel-nav.prev');
    const nextBtn = document.querySelector('.promo-carousel-nav.next');
    const dotsContainer = document.querySelector('.promo-carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0; // Current starting slide index
    const totalSlides = slides.length;
    
    // Get visible slides count based on screen width
    function getVisibleCount() {
        if (window.innerWidth > 768) return 5; // Desktop/iPad
        return 3; // Mobile
    }
    
    // Get max index we can scroll to
    function getMaxIndex() {
        return Math.max(0, totalSlides - getVisibleCount());
    }
    
    // Update position classes for visible slides
    // This controls the tilt based on VISIBLE position, not HTML index
    function updatePositionClasses() {
        const visibleCount = getVisibleCount();
        
        // Remove all position classes first
        slides.forEach(slide => {
            slide.classList.remove('pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5', 'is-center');
        });
        
        // Add position classes to currently visible slides
        for (let i = 0; i < visibleCount; i++) {
            const slideIndex = currentIndex + i;
            if (slideIndex < totalSlides) {
                slides[slideIndex].classList.add(`pos-${i + 1}`);
                
                // Mark center slide
                if (i === Math.floor(visibleCount / 2)) {
                    slides[slideIndex].classList.add('is-center');
                }
            }
        }
    }
    
    // Calculate slide width including margin
    function getSlideWidth() {
        const slide = slides[0];
        const style = getComputedStyle(slide);
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        return slide.offsetWidth + marginLeft + marginRight;
    }
    
    // Create dots (one per slide position, but limit to reasonable number)
    function createDots() {
        if (!dotsContainer) return;
        
        const maxIndex = getMaxIndex();
        const totalDots = Math.min(maxIndex + 1, 10); // Limit dots
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots() {
        const dots = dotsContainer?.querySelectorAll('.dot');
        const maxIndex = getMaxIndex();
        dots?.forEach((dot, index) => {
            // Map current index to dot index if we have limited dots
            const dotIndex = dots.length < maxIndex + 1 
                ? Math.floor(currentIndex / (maxIndex / (dots.length - 1))) 
                : currentIndex;
            dot.classList.toggle('active', index === Math.min(dotIndex, dots.length - 1));
        });
    }
    
    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const slideWidth = getSlideWidth();
        const offset = currentIndex * slideWidth;
        
        track.style.transform = `translateX(-${offset}px)`;
        updatePositionClasses();
        updateDots();
    }
    
    function nextSlide() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back
        }
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        const maxIndex = getMaxIndex();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        goToSlide(currentIndex);
    }
    
    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Auto-play with pause on hover
    let autoPlayInterval = setInterval(nextSlide, 4000);
    
    const carousel = document.querySelector('.promo-image-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        carousel.addEventListener('touchstart', () => clearInterval(autoPlayInterval), { passive: true });
        carousel.addEventListener('touchend', () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }, { passive: true });
    }
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            createDots();
            goToSlide(currentIndex);
        }, 250);
    });
    
    // Initial setup
    createDots();
    goToSlide(0);
}

// Initialize promo carousel when DOM is ready
document.addEventListener('DOMContentLoaded', initPromoCarousel);
// Also initialize when components are loaded
window.addEventListener('load', initPromoCarousel);

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        isInViewport,
        scrollToTop
    };
}