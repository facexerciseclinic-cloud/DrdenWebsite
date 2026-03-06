// ============================================
// SITE SEARCH - DR.DEN CLINIC
// ============================================
// Full-text search across articles, services, doctors, branches, and pages
// ============================================

(function () {
    'use strict';

    // ── Built-in search index (always available) ──
    const SERVICES_INDEX = [
        {
            title: 'Filler ฟิลเลอร์',
            desc: 'ปรับรูปหน้าให้สวยสมส่วน เติมเต็มร่องลึก ด้วยฟิลเลอร์แท้ FDA',
            keywords: 'filler ฟิลเลอร์ ปรับรูปหน้า เติมเต็ม ร่องลึก ฉีดฟิลเลอร์ ปาก จมูก คาง',
            image: 'assets/images/services/ฟิลเลอร์-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-syringe'
        },
        {
            title: 'Botox โบท็อกซ์',
            desc: 'ลดริ้วรอย ปรับรูปหน้าเรียว ลดกราม ไม่มีดาวน์ไทม์',
            keywords: 'botox โบท็อกซ์ โบท็อก ริ้วรอย ลดกราม หน้าเรียว ลิฟท์คิ้ว',
            image: 'assets/images/services/โบท็อกซ์-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-syringe'
        },
        {
            title: 'งานเครื่อง',
            desc: 'ยกกระชับ กระตุ้นคอลลาเจน ด้วย Xerf, Oligio, Ultraformer',
            keywords: 'เครื่อง Xerf Oligio Ultraformer ยกกระชับ คอลลาเจน RF Collagen Wave',
            image: 'assets/images/services/Collagen-Wave-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-bolt'
        },
        {
            title: 'กำจัดสิว',
            desc: 'รักษาสิวทุกประเภท สิวอุดตัน สิวอักเสบ หลุมสิว อย่างตรงจุด',
            keywords: 'สิว acne สิวอุดตัน สิวอักเสบ หลุมสิว สิวหัวดำ สิวหัวขาว รักษาสิว',
            image: 'assets/images/services/สิว-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-star-of-life'
        },
        {
            title: 'Ulthera',
            desc: 'ยกกระชับใบหน้าด้วยคลื่นเสียง ไม่ต้องผ่าตัด ไม่มีแผล',
            keywords: 'Ulthera Ultherapy อัลเธอร่า ยกกระชับ คลื่นเสียง HIFU',
            image: 'assets/images/services/Ulthera-Ultra-3-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-bolt'
        },
        {
            title: 'Reset Young',
            desc: 'รีเซ็ตผิวย้อนวัย กระตุ้นเซลล์ผิวใหม่ ผิวกระจ่างใส',
            keywords: 'Reset Young รีเซ็ต ผิวย้อนวัย เซลล์ผิว กระจ่างใส หน้าใส',
            image: 'assets/images/services/Reset-ผิว-Young-Reset-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-sync-alt'
        },
        {
            title: 'Juvelook',
            desc: 'นวัตกรรมกระตุ้นคอลลาเจนจากเกาหลี ผิวเด้ง อิ่มฟู',
            keywords: 'Juvelook จูเวลุค PDLLA คอลลาเจน เกาหลี ผิวเด้ง อิ่มฟู skin booster',
            image: 'assets/images/services/Juve-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-gem'
        },
        {
            title: 'Sculptra',
            desc: 'กระตุ้นคอลลาเจนธรรมชาติ ผลลัพธ์ยาวนานถึง 2 ปี',
            keywords: 'Sculptra สคัลป์ตร้า PLLA คอลลาเจน biostimulator ยกกระชับ ต้านริ้วรอย',
            image: 'assets/images/services/Sculpting-768x1024.webp',
            url: 'services.html',
            icon: 'fas fa-magic'
        }
    ];

    const BRANCHES_INDEX = [
        { title: 'สาขากำแพงเพชร', desc: 'Paragon Clinic กำแพงเพชร', keywords: 'กำแพงเพชร paragon', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขาพิษณุโลก', desc: 'Paragon Clinic พิษณุโลก (สาขาหลัก)', keywords: 'พิษณุโลก paragon สาขาหลัก', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขาพิจิตร', desc: 'Paragon Clinic พิจิตร', keywords: 'พิจิตร paragon', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขาอยุธยา', desc: 'Paragon Clinic อยุธยา', keywords: 'อยุธยา paragon', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขาอุตรดิตถ์', desc: 'Paragon Clinic อุตรดิตถ์', keywords: 'อุตรดิตถ์ paragon', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขานครสวรรค์', desc: 'Paragon Clinic นครสวรรค์', keywords: 'นครสวรรค์ paragon', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Paragon' },
        { title: 'สาขาระยอง', desc: 'Nirvana Clinic ระยอง', keywords: 'ระยอง nirvana', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Nirvana' },
        { title: 'สาขาศรีราชา ชลบุรี', desc: 'Nirvana Clinic ศรีราชา', keywords: 'ศรีราชา ชลบุรี nirvana', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'Nirvana' },
        { title: 'สาขาถนนวิทยุ กรุงเทพ', desc: 'FXC Clinic ถนนวิทยุ (Premium)', keywords: 'กรุงเทพ วิทยุ FXC bangkok premium', url: 'branches.html', icon: 'fas fa-map-marker-alt', brand: 'FXC' }
    ];

    const PAGES_INDEX = [
        { title: 'หน้าแรก', desc: 'DR.DEN Clinic - คลินิกความงามชั้นนำ', keywords: 'หน้าแรก home', url: 'index.html', icon: 'fas fa-home' },
        { title: 'บริการทั้งหมด', desc: 'ดูบริการความงามทั้ง 8 โปรแกรม', keywords: 'บริการ service โปรแกรม', url: 'services.html', icon: 'fas fa-spa' },
        { title: 'รีวิวจากลูกค้า', desc: 'เคสจริงกว่า 10,000+ เคส', keywords: 'รีวิว review เคส ก่อนหลัง before after', url: 'reviews.html', icon: 'fas fa-star' },
        { title: 'โปรโมชั่น', desc: 'โปรโมชั่นและข้อเสนอพิเศษ', keywords: 'โปรโมชั่น promotion โปร ลด ส่วนลด ราคา', url: 'promotions.html', icon: 'fas fa-tags' },
        { title: 'ทีมแพทย์', desc: 'แพทย์ผู้เชี่ยวชาญด้านความงาม', keywords: 'แพทย์ doctor หมอ ทีมแพทย์', url: 'doctors.html', icon: 'fas fa-user-md' },
        { title: 'สาขา', desc: '9 สาขาทั่วประเทศ', keywords: 'สาขา branch ที่อยู่ แผนที่', url: 'branches.html', icon: 'fas fa-map-marker-alt' },
        { title: 'บทความ', desc: 'ความรู้และเคล็ดลับความงามจากผู้เชี่ยวชาญ', keywords: 'บทความ article blog ความรู้', url: 'articles.html', icon: 'fas fa-newspaper' },
        { title: 'จองคิว / ติดต่อ', desc: 'นัดพบแพทย์ ปรึกษาฟรี', keywords: 'จองคิว ติดต่อ นัด ปรึกษา contact', url: 'index.html#contact', icon: 'fas fa-calendar-check' }
    ];

    // ── State ──
    let activeIndex = -1; // keyboard navigation
    let resultItems = [];

    // ── Wait for header to load, then init ──
    let dataLoaded = false;

    function loadExternalData() {
        if (dataLoaded) return Promise.resolve();
        dataLoaded = true;

        const scripts = [];

        // Load articles-data.js if not already loaded
        if (typeof ARTICLES_DATA === 'undefined') {
            scripts.push(loadScript('articles-data.js'));
        }
        // Load doctors-data.js if not already loaded
        if (typeof DOCTORS_DATA === 'undefined') {
            scripts.push(loadScript('doctors-data.js'));
        }

        return Promise.all(scripts);
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            // Check if script already exists
            const existing = document.querySelector('script[src="' + src + '"]');
            if (existing) { resolve(); return; }

            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = resolve; // don't block on error
            document.head.appendChild(s);
        });
    }

    function waitForSearchElements() {
        const toggle = document.getElementById('searchToggle');
        if (toggle) {
            initSearch();
        } else {
            // Header not loaded yet, retry
            setTimeout(waitForSearchElements, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(waitForSearchElements, 200));
    } else {
        setTimeout(waitForSearchElements, 200);
    }

    function initSearch() {
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');
        const searchDefault = document.getElementById('searchDefault');
        const searchLiveResults = document.getElementById('searchLiveResults');
        const searchNoResults = document.getElementById('searchNoResults');
        const backdrop = searchOverlay.querySelector('.search-overlay-backdrop');

        if (!searchToggle || !searchOverlay || !searchInput) return;

        // ── Open / Close ──
        function openSearch() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 150);
            resetView();
            // Lazy-load data for search
            loadExternalData();
        }

        function closeSearch() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
            activeIndex = -1;
            resultItems = [];
        }

        function resetView() {
            searchDefault.style.display = '';
            searchLiveResults.style.display = 'none';
            searchNoResults.style.display = 'none';
            searchLiveResults.innerHTML = '';
            activeIndex = -1;
            resultItems = [];
        }

        // Bind events
        searchToggle.addEventListener('click', openSearch);
        searchClose.addEventListener('click', closeSearch);
        backdrop.addEventListener('click', closeSearch);

        // ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (searchOverlay.classList.contains('active')) {
                    closeSearch();
                } else {
                    openSearch();
                }
            }
        });

        // Popular tags
        searchOverlay.querySelectorAll('.search-tag').forEach(tag => {
            tag.addEventListener('click', function () {
                const q = this.dataset.query;
                searchInput.value = q;
                searchInput.focus();
                performSearch(q);
            });
        });

        // ── Live Search ──
        let debounceTimer;
        searchInput.addEventListener('input', function () {
            const q = this.value.trim();
            clearTimeout(debounceTimer);
            if (!q) {
                resetView();
                return;
            }
            debounceTimer = setTimeout(() => performSearch(q), 180);
        });

        // ── Keyboard Navigation ──
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateResults(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateResults(-1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0 && resultItems[activeIndex]) {
                    const href = resultItems[activeIndex].getAttribute('href');
                    if (href) window.location.href = href;
                }
            }
        });

        function navigateResults(dir) {
            resultItems = Array.from(searchLiveResults.querySelectorAll('.search-result-item'));
            if (!resultItems.length) return;

            // Remove old highlight
            if (activeIndex >= 0 && resultItems[activeIndex]) {
                resultItems[activeIndex].classList.remove('keyboard-active');
            }

            activeIndex += dir;
            if (activeIndex < 0) activeIndex = resultItems.length - 1;
            if (activeIndex >= resultItems.length) activeIndex = 0;

            resultItems[activeIndex].classList.add('keyboard-active');
            resultItems[activeIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        // ── Core Search Logic ──
        function performSearch(query) {
            const q = query.toLowerCase();
            const results = { articles: [], services: [], doctors: [], branches: [], pages: [] };
            let totalCount = 0;

            // 1. Search Articles (if ARTICLES_DATA is available globally)
            if (typeof ARTICLES_DATA !== 'undefined' && Array.isArray(ARTICLES_DATA)) {
                ARTICLES_DATA.forEach(article => {
                    const haystack = [
                        article.title, article.excerpt, article.categoryLabel,
                        (article.tags || []).join(' '), article.author || ''
                    ].join(' ').toLowerCase();
                    if (haystack.includes(q)) {
                        results.articles.push({
                            title: article.title,
                            desc: article.excerpt,
                            image: article.image,
                            url: 'article.html?slug=' + article.slug,
                            badge: article.categoryLabel,
                            stats: [
                                { icon: 'fas fa-eye', text: formatNum(article.views) },
                                { icon: 'far fa-clock', text: article.readTime }
                            ]
                        });
                    }
                });
            }

            // 2. Search Services
            SERVICES_INDEX.forEach(svc => {
                const haystack = [svc.title, svc.desc, svc.keywords].join(' ').toLowerCase();
                if (haystack.includes(q)) {
                    results.services.push(svc);
                }
            });

            // 3. Search Doctors (if DOCTORS_DATA is available globally)
            if (typeof DOCTORS_DATA !== 'undefined' && Array.isArray(DOCTORS_DATA)) {
                DOCTORS_DATA.forEach(doc => {
                    const haystack = [
                        doc.nickname, doc.fullName, doc.role || '',
                        (doc.expertise || []).join(' '), doc.bio || ''
                    ].join(' ').toLowerCase();
                    if (haystack.includes(q)) {
                        results.doctors.push({
                            title: doc.fullName + (doc.nickname ? ' (' + doc.nickname + ')' : ''),
                            desc: doc.role || (doc.expertise || []).slice(0, 3).join(', '),
                            image: doc.image,
                            url: 'doctors.html',
                            badge: doc.branches ? doc.branches.map(b => b.name).join(', ') : ''
                        });
                    }
                });
            }

            // 4. Search Branches
            BRANCHES_INDEX.forEach(br => {
                const haystack = [br.title, br.desc, br.keywords].join(' ').toLowerCase();
                if (haystack.includes(q)) {
                    results.branches.push(br);
                }
            });

            // 5. Search Pages
            PAGES_INDEX.forEach(pg => {
                const haystack = [pg.title, pg.desc, pg.keywords].join(' ').toLowerCase();
                if (haystack.includes(q)) {
                    results.pages.push(pg);
                }
            });

            // Count
            totalCount = results.articles.length + results.services.length +
                results.doctors.length + results.branches.length + results.pages.length;

            // Render
            renderResults(results, totalCount, query);
        }

        function renderResults(results, totalCount, query) {
            activeIndex = -1;

            if (totalCount === 0) {
                searchDefault.style.display = 'none';
                searchLiveResults.style.display = 'none';
                searchNoResults.style.display = '';
                return;
            }

            searchDefault.style.display = 'none';
            searchNoResults.style.display = 'none';
            searchLiveResults.style.display = '';

            let html = '';

            // Summary bar
            html += `<div class="search-results-summary">
                <span class="search-results-summary-text">พบ <strong>${totalCount}</strong> ผลลัพธ์สำหรับ "${escapeHtml(query)}"</span>
                <button class="search-results-clear" onclick="document.getElementById('searchInput').value='';document.getElementById('searchInput').dispatchEvent(new Event('input'));">ล้าง</button>
            </div>`;

            // Render each group
            const groups = [
                { key: 'articles', label: 'บทความ', icon: 'fas fa-newspaper', items: results.articles },
                { key: 'services', label: 'บริการ', icon: 'fas fa-spa', items: results.services },
                { key: 'doctors', label: 'แพทย์', icon: 'fas fa-user-md', items: results.doctors },
                { key: 'branches', label: 'สาขา', icon: 'fas fa-map-marker-alt', items: results.branches },
                { key: 'pages', label: 'หน้า', icon: 'fas fa-link', items: results.pages }
            ];

            groups.forEach(group => {
                if (!group.items.length) return;
                html += renderGroup(group, query);
            });

            searchLiveResults.innerHTML = html;
            resultItems = Array.from(searchLiveResults.querySelectorAll('.search-result-item'));
        }

        function renderGroup(group, query) {
            let html = `<div class="search-result-group">
                <div class="search-result-group-header">
                    <span class="search-result-group-title"><i class="${group.icon}"></i> ${group.label}</span>
                    <span class="search-result-count">${group.items.length} รายการ</span>
                </div>`;

            group.items.slice(0, 5).forEach(item => {
                html += renderResultItem(item, query, group.key);
            });

            if (group.items.length > 5) {
                html += `<div style="text-align:center;padding:0.5rem;">
                    <span style="color:rgba(255,255,255,0.4);font-size:0.8rem;">+${group.items.length - 5} ผลลัพธ์เพิ่มเติม</span>
                </div>`;
            }

            html += '</div>';
            return html;
        }

        function renderResultItem(item, query, type) {
            const highlightedTitle = highlightMatch(escapeHtml(item.title), query);
            const desc = item.desc ? escapeHtml(item.desc) : '';
            const truncDesc = desc.length > 80 ? desc.substring(0, 80) + '…' : desc;

            // Thumbnail or Icon
            let thumbHtml = '';
            if (item.image) {
                thumbHtml = `<div class="search-result-thumb"><img src="${item.image}" alt="" loading="lazy"></div>`;
            } else if (item.icon) {
                thumbHtml = `<div class="search-result-icon"><i class="${item.icon}"></i></div>`;
            }

            // Badge
            let badgeHtml = '';
            if (item.badge) {
                badgeHtml = `<span class="search-result-badge">${escapeHtml(item.badge)}</span>`;
            } else if (item.brand) {
                badgeHtml = `<span class="search-result-badge">${escapeHtml(item.brand)}</span>`;
            }

            // Stats
            let statsHtml = '';
            if (item.stats && item.stats.length) {
                statsHtml = item.stats.map(s =>
                    `<span class="search-result-stat"><i class="${s.icon}"></i> ${s.text}</span>`
                ).join('');
            }

            let metaHtml = '';
            if (badgeHtml || statsHtml) {
                metaHtml = `<div class="search-result-meta">${badgeHtml}${statsHtml}</div>`;
            }

            return `<a href="${item.url}" class="search-result-item" data-type="${type}">
                ${thumbHtml}
                <div class="search-result-info">
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-desc">${truncDesc}</div>
                    ${metaHtml}
                </div>
                <span class="search-result-arrow"><i class="fas fa-chevron-right"></i></span>
            </a>`;
        }
    }

    // ── Utilities ──
    function highlightMatch(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('(' + escaped + ')', 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatNum(n) {
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }

})();
