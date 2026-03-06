/**
 * Promotions Data - DR.DEN Clinic
 * Data-driven promotions system for easy management
 */

const PROMOTIONS_DATA = [
    {
        id: 1,
        image: 'assets/images/โปร1.jpg',
        title: 'โปรโมชั่นฟิลเลอร์',
        badge: 'HOT',
        category: 'filler',
        featured: false
    },
    {
        id: 2,
        image: 'assets/images/โปร2.png',
        title: 'โปรโมชั่นโบท็อก',
        badge: 'NEW',
        category: 'botox',
        featured: false
    },
    {
        id: 3,
        image: 'assets/images/โปร3.jpg',
        title: 'แพ็กเกจความงาม',
        badge: null,
        category: 'package',
        featured: false
    },
    {
        id: 4,
        image: 'assets/images/โปร4.png',
        title: 'Collagen Boost',
        badge: 'BEST',
        category: 'skincare',
        featured: false
    },
    {
        id: 5,
        image: 'assets/images/โปร5.png',
        title: 'Sculptra',
        badge: null,
        category: 'filler',
        featured: false
    },
    {
        id: 6,
        image: 'assets/images/โปร6.png',
        title: 'Young Reset',
        badge: null,
        category: 'skincare',
        featured: false
    },
    {
        id: 7,
        image: 'assets/images/โปร7.png',
        title: 'แพ็กเกจพรีเมี่ยม',
        badge: 'PREMIUM',
        category: 'package',
        featured: true
    },
    {
        id: 8,
        image: 'assets/images/โปร8.png',
        title: 'โปรโมชั่นหน้าใส',
        badge: 'LIMITED',
        category: 'skincare',
        featured: false
    },
    {
        id: 9,
        image: 'assets/images/โปร9.png',
        title: 'โปรโมชั่นผิวใส',
        badge: null,
        category: 'skincare',
        featured: false
    },
    {
        id: 10,
        image: 'assets/images/โปร10.png',
        title: 'โปรโมชั่นพิเศษ',
        badge: null,
        category: 'package',
        featured: false
    },
    {
        id: 11,
        image: 'assets/images/โปร11.jpg',
        title: 'โปรโมชั่นเดือนนี้',
        badge: 'HOT',
        category: 'package',
        featured: false
    },
    {
        id: 12,
        image: 'assets/images/โปร12.jpg',
        title: 'แพ็กเกจสุดคุ้ม',
        badge: null,
        category: 'package',
        featured: false
    },
    {
        id: 13,
        image: 'assets/images/โปร13.jpg',
        title: 'โปรโมชั่นพิเศษสุด',
        badge: 'SPECIAL',
        category: 'package',
        featured: true
    }
];

/**
 * Category labels for filter tabs
 */
const PROMO_CATEGORIES = [
    { key: 'all', label: 'ทั้งหมด', icon: 'fas fa-th' },
    { key: 'filler', label: 'ฟิลเลอร์', icon: 'fas fa-syringe' },
    { key: 'botox', label: 'โบท็อกซ์', icon: 'fas fa-magic' },
    { key: 'skincare', label: 'ดูแลผิว', icon: 'fas fa-spa' },
    { key: 'package', label: 'แพ็กเกจ', icon: 'fas fa-gift' }
];

/**
 * Badge color mapping
 */
const BADGE_STYLES = {
    'HOT': { bg: '#e74c3c', icon: 'fas fa-fire' },
    'NEW': { bg: '#3498db', icon: 'fas fa-bolt' },
    'BEST': { bg: '#e67e22', icon: 'fas fa-trophy' },
    'PREMIUM': { bg: '#9b59b6', icon: 'fas fa-crown' },
    'LIMITED': { bg: '#e74c3c', icon: 'fas fa-clock' },
    'SPECIAL': { bg: '#E6B030', icon: 'fas fa-star' }
};

/**
 * Render a single promo card HTML
 */
function renderPromoCard(promo, index) {
    const badgeHTML = promo.badge ? `
        <span class="promo-card-badge" style="background: ${BADGE_STYLES[promo.badge].bg}">
            <i class="${BADGE_STYLES[promo.badge].icon}"></i>
            ${promo.badge}
        </span>` : '';

    const featuredClass = promo.featured ? ' promo-card-featured' : '';
    const sizeClass = index % 5 === 0 ? ' promo-card-tall' : '';

    return `
        <div class="promo-masonry-card${featuredClass}${sizeClass}" 
             data-category="${promo.category}" 
             data-index="${index}"
             style="animation-delay: ${index * 0.06}s">
            <div class="promo-card-inner">
                <img src="${promo.image}" alt="${promo.title}" loading="lazy">
                ${badgeHTML}
                <div class="promo-card-overlay">
                    <h3 class="promo-card-title">${promo.title}</h3>
                    <div class="promo-card-actions">
                        <button class="promo-btn-view" onclick="openPromoLightbox(${index})" title="ดูรูปขยาย">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <a href="index.html#contact" class="promo-btn-book">
                            <i class="fas fa-calendar-check"></i>
                            จองคิว
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Render category filter tabs
 */
function renderPromoFilters() {
    return PROMO_CATEGORIES.map(cat => `
        <button class="promo-filter-tab${cat.key === 'all' ? ' active' : ''}" data-filter="${cat.key}">
            <i class="${cat.icon}"></i>
            <span>${cat.label}</span>
        </button>
    `).join('');
}

/**
 * Render the promotions page grid
 */
function renderPromotionsPage() {
    const grid = document.querySelector('.promo-masonry-grid');
    const filterContainer = document.querySelector('.promo-filter-tabs');

    if (filterContainer) {
        filterContainer.innerHTML = renderPromoFilters();
    }

    if (grid) {
        grid.innerHTML = PROMOTIONS_DATA.map((promo, i) => renderPromoCard(promo, i)).join('');
    }
}

/**
 * Render homepage promotions (carousel remains separate)
 */
function renderHomepagePromotions() {
    // Homepage uses its own carousel system, no changes needed
}

/**
 * Lightbox functionality
 */
let currentLightboxIndex = 0;

function openPromoLightbox(index) {
    currentLightboxIndex = index;
    const promo = PROMOTIONS_DATA[index];
    const lightbox = document.getElementById('promoLightbox');
    if (!lightbox) return;

    const img = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const counter = lightbox.querySelector('.lightbox-counter');
    const badge = lightbox.querySelector('.lightbox-badge');

    img.src = promo.image;
    img.alt = promo.title;
    title.textContent = promo.title;
    counter.textContent = `${index + 1} / ${PROMOTIONS_DATA.length}`;

    if (promo.badge && BADGE_STYLES[promo.badge]) {
        badge.innerHTML = `<i class="${BADGE_STYLES[promo.badge].icon}"></i> ${promo.badge}`;
        badge.style.background = BADGE_STYLES[promo.badge].bg;
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('promoLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) newIndex = PROMOTIONS_DATA.length - 1;
    if (newIndex >= PROMOTIONS_DATA.length) newIndex = 0;
    openPromoLightbox(newIndex);
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderPromotionsPage();
    renderHomepagePromotions();
});
