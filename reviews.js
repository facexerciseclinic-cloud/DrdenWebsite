// ============================================
// REVIEWS PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Wait a tick for reviews-data.js to render cards
    setTimeout(initReviewsPage, 50);

    function initReviewsPage() {
        // ============================================
        // FILTER FUNCTIONALITY
        // ============================================
        const filterButtons = document.querySelectorAll('.filter-btn-enhanced');
        let reviewCards = document.querySelectorAll('.review-card-enhanced');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                let visibleIndex = 0;

                reviewCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        setTimeout(() => {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, visibleIndex * 50);
                        visibleIndex++;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                updateReviewsCount();
            });
        });

        // ============================================
        // SEARCH FUNCTIONALITY
        // ============================================
        const searchInput = document.getElementById('reviewSearch');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();

                reviewCards.forEach(card => {
                    const title = card.querySelector('.review-title')?.textContent.toLowerCase() || '';
                    const text = card.querySelector('.review-text')?.textContent.toLowerCase() || '';
                    const treatment = card.querySelector('.review-treatment span')?.textContent.toLowerCase() || '';

                    if (title.includes(searchTerm) || text.includes(searchTerm) || treatment.includes(searchTerm)) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                    }
                });

                updateReviewsCount();
            });
        }

        // ============================================
        // SORT FUNCTIONALITY
        // ============================================
        const sortSelect = document.getElementById('reviewSort');

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const sortValue = e.target.value;
                const grid = document.querySelector('.reviews-grid-enhanced');
                if (!grid) return;
                const cardsArray = Array.from(reviewCards);

                if (sortValue === 'latest') {
                    cardsArray.sort((a, b) => {
                        const dateA = a.querySelector('.review-date')?.textContent || '';
                        const dateB = b.querySelector('.review-date')?.textContent || '';
                        return dateB.localeCompare(dateA);
                    });
                } else if (sortValue === 'popular') {
                    cardsArray.sort(() => Math.random() - 0.5);
                }

                cardsArray.forEach(card => grid.appendChild(card));

                cardsArray.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            });
        }

        // ============================================
        // LOAD MORE FUNCTIONALITY
        // ============================================
        const loadMoreBtn = document.getElementById('loadMoreReviews');

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> แสดงทั้งหมดแล้ว';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.6';
            });
        }

        // ============================================
        // UPDATE REVIEWS COUNT
        // ============================================
        function updateReviewsCount() {
            const visible = Array.from(reviewCards).filter(card => {
                return card.style.display !== 'none' && window.getComputedStyle(card).display !== 'none';
            });

            const countEl = document.querySelector('.reviews-count');
            if (countEl) {
                countEl.textContent = `แสดง ${visible.length} จาก 10,000+ รีวิว`;
            }
        }

        // ============================================
        // INITIAL ANIMATION
        // ============================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        reviewCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Initialize count
        updateReviewsCount();
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
