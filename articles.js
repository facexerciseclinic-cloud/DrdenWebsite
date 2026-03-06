// ============================================
// ARTICLES PAGE - DATA-DRIVEN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if ARTICLES_DATA exists
    if (typeof ARTICLES_DATA === 'undefined') return;

    const categoryButtons = document.querySelectorAll('.article-category-btn');
    const searchInput = document.getElementById('articleSearch');
    const featuredContainer = document.getElementById('featuredArticleContainer');
    const gridContainer = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');

    // Update article count stat
    const statCount = document.getElementById('statArticleCount');
    if (statCount) statCount.textContent = ARTICLES_DATA.length;

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    function renderFeaturedArticle(article) {
        if (!article) {
            featuredContainer.innerHTML = '';
            return;
        }
        featuredContainer.innerHTML = `
            <div class="featured-article">
                <a href="article.html?slug=${article.slug}" class="featured-article-card" data-category="${article.category}">
                    <div class="featured-article-image">
                        <img src="${article.image}" alt="${article.title}" loading="lazy">
                        <span class="featured-badge">
                            <i class="fas fa-star"></i>
                            <span>บทความแนะนำ</span>
                        </span>
                    </div>
                    <div class="featured-article-content">
                        <div class="article-meta">
                            <span class="article-category-tag">${article.categoryLabel}</span>
                            <span class="article-date"><i class="far fa-calendar"></i> ${article.dateDisplay}</span>
                            <span class="article-read-time"><i class="far fa-clock"></i> ${article.readTime}</span>
                        </div>
                        <h2>${article.title}</h2>
                        <p>${article.excerpt}</p>
                        <div class="article-tags">
                            ${article.tags.map(t => `<span class="tag"><i class="fas fa-tag"></i> ${t}</span>`).join('')}
                        </div>
                        <span class="btn btn-primary">
                            <i class="fas fa-book-open"></i> อ่านเต็ม
                        </span>
                    </div>
                </a>
            </div>
        `;
    }

    function renderArticleCard(article) {
        const isNew = isRecentArticle(article.date, 14);
        const isHot = article.views >= 5000;
        
        let badgeHTML = '';
        if (isNew) badgeHTML = '<span class="article-badge new">ใหม่</span>';
        else if (isHot) badgeHTML = '<span class="article-badge hot">ยอดนิยม</span>';

        return `
            <article class="article-card" data-category="${article.category}">
                <a href="article.html?slug=${article.slug}" class="article-card-link">
                    <div class="article-image">
                        <img src="${article.image}" alt="${article.title}" loading="lazy">
                        ${badgeHTML}
                    </div>
                    <div class="article-content">
                        <div class="article-meta-small">
                            <span class="article-category-tag small">${article.categoryLabel}</span>
                            <span class="article-date-small"><i class="far fa-calendar"></i> ${article.dateDisplay}</span>
                        </div>
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <div class="article-footer">
                            <div class="article-stats">
                                <span><i class="fas fa-eye"></i> ${formatViews(article.views)}</span>
                                <span><i class="far fa-clock"></i> ${article.readTime}</span>
                            </div>
                            <span class="article-link">อ่านต่อ <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }

    function isRecentArticle(dateStr, days) {
        const articleDate = new Date(dateStr);
        const now = new Date();
        const diffDays = (now - articleDate) / (1000 * 60 * 60 * 24);
        return diffDays <= days;
    }

    // ============================================
    // FILTER & RENDER
    // ============================================

    function renderArticles(category = 'all', searchTerm = '') {
        let articles = [...ARTICLES_DATA];

        // Filter by category
        if (category !== 'all') {
            articles = articles.filter(a => a.category === category);
        }

        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            articles = articles.filter(a =>
                a.title.toLowerCase().includes(term) ||
                a.excerpt.toLowerCase().includes(term) ||
                a.tags.some(t => t.toLowerCase().includes(term))
            );
        }

        // Featured article
        const featured = articles.find(a => a.featured);
        if (featured && !searchTerm) {
            renderFeaturedArticle(featured);
            articles = articles.filter(a => a.id !== featured.id);
        } else if (!searchTerm && category === 'all') {
            renderFeaturedArticle(ARTICLES_DATA.find(a => a.featured));
            articles = articles.filter(a => !a.featured);
        } else {
            featuredContainer.innerHTML = '';
        }

        // Grid articles
        if (articles.length === 0 && !featured) {
            gridContainer.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            gridContainer.innerHTML = articles.map(a => renderArticleCard(a)).join('');
            noResults.style.display = 'none';

            // Animate cards in
            const cards = gridContainer.querySelectorAll('.article-card');
            cards.forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 80);
            });
        }
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            renderArticles(category, searchInput.value);
        });
    });

    // Search
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const activeCategory = document.querySelector('.article-category-btn.active').dataset.category;
            renderArticles(activeCategory, this.value);
        }, 300);
    });

    // ============================================
    // INITIAL RENDER
    // ============================================
    renderArticles();
});
