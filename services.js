// ============================================
// SERVICES PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card-enhanced');
    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('serviceSearchInput');
    const sortSelect = document.getElementById('serviceSortSelect');
    const resultCount = document.getElementById('servicesResultCount');
    const emptyState = document.getElementById('servicesEmptyState');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activeCategory = 'all';
    let activeQuery = '';
    let activeSort = 'recommended';
    let defaultOrderMap = new Map();

    serviceCards.forEach((card, index) => {
        defaultOrderMap.set(card, index);
        card.dataset.name = (card.querySelector('h3')?.textContent || '').trim().toLowerCase();
        card.dataset.searchText = card.textContent.toLowerCase();
    });

    function updateResultMeta(visibleCount) {
        if (!resultCount) return;
        const label = activeCategory === 'all'
            ? 'ทุกหมวด'
            : (document.querySelector('.category-btn.active span')?.textContent || 'หมวดที่เลือก');
        resultCount.textContent = `พบ ${visibleCount} บริการ • ${label}`;
    }

    function applySort() {
        if (!servicesGrid) return;
        const cardsArray = Array.from(serviceCards);

        cardsArray.sort((a, b) => {
            if (activeSort === 'az') {
                return (a.dataset.name || '').localeCompare(b.dataset.name || '', 'th');
            }
            return (defaultOrderMap.get(a) || 0) - (defaultOrderMap.get(b) || 0);
        });

        cardsArray.forEach((card) => servicesGrid.appendChild(card));
    }

    function applyFilters() {
        let visibleCount = 0;

        serviceCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            const queryMatch = !activeQuery || (card.dataset.searchText || '').includes(activeQuery);
            const shouldShow = categoryMatch && queryMatch;

            if (shouldShow) {
                card.classList.remove('is-hidden');
                visibleCount += 1;
            } else {
                card.classList.add('is-hidden');
            }
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }

        updateResultMeta(visibleCount);
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            activeCategory = button.getAttribute('data-category') || 'all';
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            activeQuery = event.target.value.trim().toLowerCase();
            applyFilters();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (event) => {
            activeSort = event.target.value;
            applySort();
            applyFilters();
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        serviceCards.forEach((card) => observer.observe(card));
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card) => observer.observe(card));
    } else {
        serviceCards.forEach((card) => card.classList.add('in-view'));
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card) => card.classList.add('in-view'));
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#contact') return; // Allow other # links
            
            e.preventDefault();
            
            // If it's #contact, redirect to index.html#contact
            if (href === '#contact') {
                window.location.href = 'index.html#contact';
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    applySort();
    applyFilters();
});
