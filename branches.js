// Branches Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Brand Tab Filter
    // ============================================
    const brandTabs = document.querySelectorAll('.brand-tab');
    const networkCards = document.querySelectorAll('.branch-network-card');

    brandTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const brand = this.dataset.brand;

            // Update active tab
            brandTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter network cards
            let visibleIndex = 0;
            networkCards.forEach((card) => {
                const shouldShow = brand === 'all' || card.dataset.brand === brand;
                
                if (shouldShow) {
                    card.style.display = '';
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = `branchCardSlideIn 0.4s ease ${visibleIndex * 0.06}s forwards`;
                    visibleIndex++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.97)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // Phone number click tracking (optional analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '');
            console.log('Phone call initiated:', phoneNumber);
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
