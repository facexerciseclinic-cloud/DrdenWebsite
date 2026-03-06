/**
 * Branch Contact CTA System - DR.DEN Clinic
 * เมื่อลูกค้ากด CTA ให้เลือกสาขาก่อน แล้วค่อยแสดงช่องทางติดต่อ
 */

const BRANCHES_CONTACT = [
    {
        id: 'kp',
        name: 'สาขากำแพงเพชร',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0909695203',
        phoneDisplay: '090-969-5203',
        line: 'https://lin.ee/U4lN2sO',
        lineId: '@prgkp',
        facebook: 'https://www.facebook.com/ParagonClinic.k',
        location: 'อำเภอในเมือง, กำแพงเพชร',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคเหนือ'
    },
    {
        id: 'pl',
        name: 'สาขาพิษณุโลก',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0652239942',
        phoneDisplay: '065-223-9942',
        line: 'https://lin.ee/3B9r4ha',
        lineId: '@prgpl',
        facebook: 'https://www.facebook.com/paragonclinicpcp',
        location: 'อำเภอเมือง, พิษณุโลก',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคเหนือ',
        badge: 'สาขาหลัก'
    },
    {
        id: 'pj',
        name: 'สาขาพิจิตร',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0832678967',
        phoneDisplay: '083-267-8967',
        line: 'https://lin.ee/gBggUBx',
        lineId: '@prgpj',
        facebook: 'https://www.facebook.com/ParagonClinicPhichit',
        location: 'อำเภอในเมือง, พิจิตร',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคเหนือ'
    },
    {
        id: 'au',
        name: 'สาขาอยุธยา',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0659596987',
        phoneDisplay: '065-959-6987',
        line: 'https://lin.ee/sWiIbwGx',
        lineId: '@prgau',
        facebook: 'https://www.facebook.com/profile.php?id=100068278993629',
        location: 'อำเภอเมือง, อยุธยา',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคกลาง'
    },
    {
        id: 'ud',
        name: 'สาขาอุตรดิตถ์',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0996325144',
        phoneDisplay: '099-632-5144',
        line: 'https://lin.ee/3woJQjp',
        lineId: '@prgud',
        facebook: 'https://www.facebook.com/ParagonClinic54',
        location: 'อำเภอเมือง, อุตรดิตถ์',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคเหนือ'
    },
    {
        id: 'ns',
        name: 'สาขานครสวรรค์',
        brand: 'Paragon Clinic',
        brandClass: 'paragon',
        phone: '0648261000',
        phoneDisplay: '064-826-1000',
        line: 'https://lin.ee/AiqVnjz',
        lineId: '@prgns',
        facebook: 'https://www.facebook.com/profile.php?id=61554191213230',
        location: 'อำเภอเมือง, นครสวรรค์',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคกลาง'
    },
    {
        id: 'ry',
        name: 'สาขาระยอง',
        brand: 'Nirvana Clinic',
        brandClass: 'nirvana',
        phone: '0640686429',
        phoneDisplay: '064-068-6429',
        line: 'https://lin.ee/m1lQ4Uv',
        lineId: '@nvnc',
        facebook: 'https://www.facebook.com/NirvanaclinicRY1',
        location: 'อำเภอเมือง, ระยอง',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคตะวันออก'
    },
    {
        id: 'sr',
        name: 'สาขาศรีราชา ชลบุรี',
        brand: 'Nirvana Clinic',
        brandClass: 'nirvana',
        phone: '0638602000',
        phoneDisplay: '063-860-2000',
        line: 'https://lin.ee/e2HKB4P',
        lineId: '@nvns',
        facebook: 'https://www.facebook.com/profile.php?id=61556986812353',
        location: 'ศรีราชา, ชลบุรี',
        hours: 'จันทร์-อาทิตย์ 10:00-20:00 น.',
        region: 'ภาคตะวันออก'
    },
    {
        id: 'bk',
        name: 'สาขาถนนวิทยุ กรุงเทพ',
        brand: 'FXC Clinic',
        brandClass: 'fxc',
        phone: '0982712744',
        phoneDisplay: '098-271-2744',
        line: 'https://lin.ee/AqLYwNQ',
        lineId: '@fxcc',
        facebook: 'https://www.facebook.com/FXCClinic24',
        location: 'ถนนวิทยุ, กรุงเทพมหานคร',
        hours: 'จันทร์-อาทิตย์ 09:00-21:00 น.',
        region: 'กรุงเทพ',
        badge: 'Premium'
    }
];

/**
 * STATE: ขั้นตอนของ popup
 * 'select' = เลือกสาขา, 'contact' = แสดงช่องทางติดต่อ
 */
let ctaState = 'select';
let selectedBranch = null;

/**
 * เปิด Branch CTA Popup
 */
function openBranchCTA(e) {
    if (e) e.preventDefault();
    ctaState = 'select';
    selectedBranch = null;
    renderBranchCTA();

    const modal = document.getElementById('branchCTAModal');
    if (modal) {
        modal.classList.remove('closing');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * ปิด popup
 */
function closeBranchCTA() {
    const modal = document.getElementById('branchCTAModal');
    if (!modal) return;

    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        document.body.style.overflow = '';
    }, 250);
}

/**
 * เลือกสาขา → แสดงช่องทางติดต่อ
 */
function selectBranch(branchId) {
    selectedBranch = BRANCHES_CONTACT.find(b => b.id === branchId);
    if (!selectedBranch) return;
    ctaState = 'contact';
    renderBranchCTA();
}

/**
 * กลับไปหน้าเลือกสาขา
 */
function backToBranchSelect() {
    ctaState = 'select';
    selectedBranch = null;
    renderBranchCTA();
}

/**
 * Render เนื้อหาภายใน popup ตาม state
 */
function renderBranchCTA() {
    const body = document.getElementById('branchCTABody');
    if (!body) return;

    if (ctaState === 'select') {
        body.innerHTML = renderBranchSelectView();
    } else {
        body.innerHTML = renderBranchContactView();
    }
}

/**
 * View: เลือกสาขา
 */
function renderBranchSelectView() {
    const grouped = {};
    BRANCHES_CONTACT.forEach(b => {
        if (!grouped[b.brand]) grouped[b.brand] = [];
        grouped[b.brand].push(b);
    });

    let html = `
        <div class="bcta-header">
            <div class="bcta-icon-circle">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <h2 class="bcta-title">เลือกสาขาที่สะดวก</h2>
            <p class="bcta-subtitle">กรุณาเลือกสาขาที่ใกล้คุณเพื่อติดต่อสอบถาม</p>
        </div>
        <div class="bcta-branch-list">
    `;

    for (const [brand, branches] of Object.entries(grouped)) {
        const brandClass = branches[0].brandClass;
        html += `<div class="bcta-brand-group">
            <div class="bcta-brand-label">
                <span class="bcta-brand-dot ${brandClass}"></span>
                ${brand}
                <span class="bcta-brand-count">${branches.length} สาขา</span>
            </div>`;

        branches.forEach(b => {
            const badgeHTML = b.badge
                ? `<span class="bcta-branch-badge ${b.badge === 'Premium' ? 'premium' : ''}">${b.badge}</span>`
                : '';
            html += `
            <button class="bcta-branch-item" onclick="selectBranch('${b.id}')">
                <div class="bcta-branch-info">
                    <span class="bcta-branch-name">${b.name}</span>
                    <span class="bcta-branch-region"><i class="fas fa-map-pin"></i> ${b.region}</span>
                </div>
                ${badgeHTML}
                <i class="fas fa-chevron-right bcta-arrow"></i>
            </button>`;
        });

        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

/**
 * View: ช่องทางติดต่อของสาขาที่เลือก
 */
function renderBranchContactView() {
    if (!selectedBranch) return '';
    const b = selectedBranch;
    const badgeHTML = b.badge
        ? `<span class="bcta-selected-badge ${b.badge === 'Premium' ? 'premium' : ''}">${b.badge}</span>`
        : '';

    return `
        <div class="bcta-header">
            <button class="bcta-back-btn" onclick="backToBranchSelect()">
                <i class="fas fa-arrow-left"></i> เปลี่ยนสาขา
            </button>
            <div class="bcta-selected-branch">
                <span class="bcta-brand-dot ${b.brandClass}"></span>
                <div>
                    <h2 class="bcta-title">${b.name}</h2>
                    <p class="bcta-subtitle">${b.brand} ${badgeHTML}</p>
                </div>
            </div>
            <div class="bcta-branch-detail">
                <span><i class="fas fa-map-marker-alt"></i> ${b.location}</span>
                <span><i class="fas fa-clock"></i> ${b.hours}</span>
            </div>
        </div>

        <div class="bcta-contact-grid">
            <a href="tel:${b.phone}" class="bcta-contact-card phone">
                <div class="bcta-contact-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="bcta-contact-info">
                    <span class="bcta-contact-label">โทรศัพท์</span>
                    <span class="bcta-contact-value">${b.phoneDisplay}</span>
                </div>
                <i class="fas fa-arrow-right bcta-contact-arrow"></i>
            </a>

            <a href="${b.line}" target="_blank" class="bcta-contact-card line">
                <div class="bcta-contact-icon">
                    <i class="fab fa-line"></i>
                </div>
                <div class="bcta-contact-info">
                    <span class="bcta-contact-label">LINE</span>
                    <span class="bcta-contact-value">${b.lineId}</span>
                </div>
                <i class="fas fa-arrow-right bcta-contact-arrow"></i>
            </a>

            <a href="${b.facebook}" target="_blank" class="bcta-contact-card facebook">
                <div class="bcta-contact-icon">
                    <i class="fab fa-facebook-f"></i>
                </div>
                <div class="bcta-contact-info">
                    <span class="bcta-contact-label">Facebook</span>
                    <span class="bcta-contact-value">ส่งข้อความ</span>
                </div>
                <i class="fas fa-arrow-right bcta-contact-arrow"></i>
            </a>
        </div>

        <div class="bcta-divider"></div>

        <div class="bcta-quick-msg">
            <p class="bcta-quick-label"><i class="fas fa-comment-dots"></i> ข้อความด่วน</p>
            <div class="bcta-quick-btns">
                <a href="${b.line}" target="_blank" class="bcta-quick-btn">สนใจปรึกษา</a>
                <a href="${b.line}" target="_blank" class="bcta-quick-btn">สอบถามโปรโมชั่น</a>
                <a href="${b.line}" target="_blank" class="bcta-quick-btn">นัดหมายแพทย์</a>
            </div>
        </div>
    `;
}

/**
 * สร้าง Modal Container ใน DOM
 */
function initBranchCTAModal() {
    if (document.getElementById('branchCTAModal')) return;

    const modal = document.createElement('div');
    modal.className = 'branch-cta-modal';
    modal.id = 'branchCTAModal';
    modal.innerHTML = `
        <div class="bcta-overlay" onclick="closeBranchCTA()"></div>
        <div class="bcta-panel">
            <button class="bcta-close" onclick="closeBranchCTA()">
                <i class="fas fa-times"></i>
            </button>
            <div class="bcta-body" id="branchCTABody"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * จับ CTA buttons ทั้งหมดในเว็บ
 * - ปุ่มที่มี href ชี้ไป #contact → เปิด popup เลือกสาขา
 * - ปุ่มใน header "จองคิวเลย"
 * - ปุ่ม floating contact
 * - ปุ่มที่มี data-cta="branch" หรือ class .cta-branch-trigger
 */
function interceptCTAButtons() {
    // 1. Header "จองคิวเลย" button
    document.querySelectorAll('.btn-primary-nav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBranchCTA(e);
        });
    });

    // 2. All elements with data-cta="branch" or class .cta-branch-trigger
    document.querySelectorAll('[data-cta="branch"], .cta-branch-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBranchCTA(e);
        });
    });

    // 3. ALL links pointing to #contact or index.html#contact
    document.querySelectorAll('a[href="#contact"], a[href="index.html#contact"]').forEach(link => {
        // Don't intercept the footer "ติดต่อเรา" text link
        if (link.closest('.footer-links')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            openBranchCTA(e);
        });
    });

    // 4. Floating Contact LINE & Facebook buttons → open popup
    const floatingLine = document.querySelector('.floating-menu .contact-item.line');
    const floatingFB = document.querySelector('.floating-menu .contact-item.facebook');
    if (floatingLine) {
        floatingLine.addEventListener('click', (e) => {
            e.preventDefault();
            // Close floating menu first
            const fm = document.getElementById('floatingMenu');
            const ct = document.getElementById('contactToggle');
            if (fm) fm.classList.remove('active');
            if (ct) ct.classList.remove('active');
            openBranchCTA(e);
        });
    }
    if (floatingFB) {
        floatingFB.addEventListener('click', (e) => {
            e.preventDefault();
            const fm = document.getElementById('floatingMenu');
            const ct = document.getElementById('contactToggle');
            if (fm) fm.classList.remove('active');
            if (ct) ct.classList.remove('active');
            openBranchCTA(e);
        });
    }

    // 5. Doctor card book buttons & promo book buttons (dynamically rendered)
    document.addEventListener('click', (e) => {
        const bookBtn = e.target.closest('.doc-book-btn, .promo-btn-book');
        if (bookBtn) {
            e.preventDefault();
            e.stopPropagation();
            openBranchCTA(e);
        }
    });

    // 6. ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('branchCTAModal');
            if (modal && modal.classList.contains('active')) {
                closeBranchCTA();
            }
        }
    });
}

/**
 * Init ทั้งระบบ - เรียกหลัง DOM + components loaded
 */
function initBranchCTA() {
    initBranchCTAModal();
    // เพิ่ม delay เล็กน้อยเพื่อรอ components.js โหลด header/footer
    setTimeout(interceptCTAButtons, 300);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    initBranchCTA();
});
