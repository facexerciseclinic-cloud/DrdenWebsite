/**
 * Promotions Page - Interactive Features
 * Filter, scroll animations, lightbox keyboard nav
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for data-driven render to complete
    setTimeout(initPromotionsPage, 100);
});

function initPromotionsPage() {
    initFilters();
    initScrollAnimations();
    initLightboxKeyboard();
    updatePromoCount('all');
}

/**
 * Category filter tabs
 */
function initFilters() {
    const filterContainer = document.querySelector('.promo-filter-tabs');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.promo-filter-tab');
        if (!tab) return;

        // Update active state
        filterContainer.querySelectorAll('.promo-filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        filterCards(filter);
        updatePromoCount(filter);
    });
}

function filterCards(category) {
    const cards = document.querySelectorAll('.promo-masonry-card');
    let delay = 0;

    cards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category) {
            card.style.display = '';
            card.style.animation = `promoFadeIn 0.4s ease ${delay}s both`;
            delay += 0.05;
        } else {
            card.style.display = 'none';
            card.style.animation = '';
        }
    });
}

function updatePromoCount(category) {
    const countEl = document.querySelector('.promo-count');
    if (!countEl) return;

    const total = category === 'all'
        ? PROMOTIONS_DATA.length
        : PROMOTIONS_DATA.filter(p => p.category === category).length;

    countEl.textContent = `แสดง ${total} โปรโมชั่น`;
}

/**
 * Scroll animations with IntersectionObserver
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('promo-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.promo-masonry-card').forEach(card => {
        observer.observe(card);
    });

    // Observe the installment banner
    const banner = document.querySelector('.promo-installment-banner');
    if (banner) observer.observe(banner);
}

/**
 * Keyboard navigation for lightbox
 */
function initLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('promoLightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });

    // Touch swipe support for lightbox
    let touchStartX = 0;
    const lightbox = document.getElementById('promoLightbox');
    if (!lightbox) return;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            navigateLightbox(diff > 0 ? -1 : 1);
        }
    }, { passive: true });
}
