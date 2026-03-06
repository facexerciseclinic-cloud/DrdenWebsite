/**
 * Doctors Page - Interactive Features
 * Filter, scroll animations, card interactions, profile modal
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for data-driven render to complete
    setTimeout(initDoctorsPage, 100);
});

function initDoctorsPage() {
    initDoctorFilters();
    initScrollAnimations();
    initWhyCardsAnimation();
    initModalKeyboard();
}

/**
 * ===== DOCTOR PROFILE MODAL =====
 */

/** Specialty icon map */
const SPECIALTY_ICONS = {
    dermatology: 'fas fa-hand-sparkles',
    aesthetic: 'fas fa-spa',
    laser: 'fas fa-bolt',
    antiaging: 'fas fa-leaf'
};

/**
 * Open doctor profile modal
 */
function openDoctorModal(doctorId) {
    const doctor = DOCTORS_DATA.find(d => d.id === doctorId);
    if (!doctor) return;

    const modal = document.getElementById('doctorModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    // Build specialty tags
    const specialtyTags = doctor.specialties.map(s => {
        const icon = SPECIALTY_ICONS[s] || 'fas fa-check';
        const label = SPECIALTY_LABELS[s] || s;
        return `<span class="modal-specialty-tag"><i class="${icon}"></i> ${label}</span>`;
    }).join('');

    // Build education list
    const educationItems = (doctor.education || []).map(edu =>
        `<li><i class="fas fa-graduation-cap"></i> ${edu}</li>`
    ).join('');

    // Build expertise tags
    const expertiseTags = (doctor.expertise || []).map(exp =>
        `<span class="modal-expertise-tag">${exp}</span>`
    ).join('');

    // Build certification list
    const certItems = (doctor.certifications || []).map(cert =>
        `<li><i class="fas fa-certificate"></i> ${cert}</li>`
    ).join('');

    // Build branch cards with brand colors
    const branchCards = doctor.branches.map(b =>
        `<div class="modal-branch-card ${b.class}"><i class="fas fa-map-marker-alt"></i> ${b.name}</div>`
    ).join('');

    // Role badge
    const roleBadge = doctor.role
        ? `<span class="modal-hero-badge"><i class="fas fa-crown"></i> ${doctor.role}</span>`
        : '';

    // Brand image switcher for modal
    const modalBrandSwitcher = (typeof renderBrandSwitcher === 'function')
        ? renderBrandSwitcher(doctor, 'modal')
        : '';

    modalBody.innerHTML = `
        <div class="modal-hero">
            ${roleBadge}
            <img src="${doctor.image}" alt="${doctor.nickname}" class="modal-hero-img" loading="lazy"
                 style="transition: opacity 0.3s ease, transform 0.3s ease;">
            ${modalBrandSwitcher}
            <div class="modal-hero-gradient"></div>
        </div>

        <div class="modal-body-inner">
            <div class="modal-doctor-header">
                <h2>${doctor.nickname}</h2>
                <p class="modal-doctor-fullname">${doctor.fullName}</p>
                <p class="modal-doctor-license">ใบอนุญาตประกอบวิชาชีพ <strong>${doctor.license}</strong></p>
                <div class="modal-meta-row">
                    ${doctor.experience ? `<span class="modal-meta-badge experience"><i class="fas fa-clock"></i> ประสบการณ์ ${doctor.experience}</span>` : ''}
                    <span class="modal-meta-badge license-badge"><i class="fas fa-check-circle"></i> ใบอนุญาตรับรอง</span>
                </div>
            </div>

            ${doctor.bio ? `
            <div class="modal-bio">
                <p>${doctor.bio}</p>
            </div>` : ''}

            <div class="modal-section">
                <h3 class="modal-section-title"><i class="fas fa-spa"></i> ความเชี่ยวชาญ</h3>
                <div class="modal-specialties">
                    ${specialtyTags}
                </div>
            </div>

            ${expertiseTags ? `
            <div class="modal-section">
                <h3 class="modal-section-title"><i class="fas fa-star"></i> ความชำนาญเฉพาะทาง</h3>
                <div class="modal-expertise-grid">
                    ${expertiseTags}
                </div>
            </div>` : ''}

            ${educationItems ? `
            <div class="modal-section">
                <h3 class="modal-section-title"><i class="fas fa-user-graduate"></i> การศึกษา & อบรม</h3>
                <ul class="modal-list">
                    ${educationItems}
                </ul>
            </div>` : ''}

            ${certItems ? `
            <div class="modal-section">
                <h3 class="modal-section-title"><i class="fas fa-award"></i> ใบรับรอง</h3>
                <ul class="modal-list">
                    ${certItems}
                </ul>
            </div>` : ''}

            <div class="modal-section">
                <h3 class="modal-section-title"><i class="fas fa-hospital"></i> ประจำสาขา</h3>
                <div class="modal-branches">
                    ${branchCards}
                </div>
            </div>

            <div class="modal-cta">
                <a href="#" onclick="event.preventDefault(); closeDoctorModal(); setTimeout(()=>openBranchCTA(), 300);" class="btn btn-primary">
                    <i class="fas fa-calendar-check"></i>
                    นัดหมาย${doctor.nickname}
                </a>
                <a href="#" onclick="event.preventDefault(); closeDoctorModal(); setTimeout(()=>openBranchCTA(), 300);" class="btn btn-outline">
                    <i class="fas fa-phone"></i>
                    ติดต่อสาขา
                </a>
            </div>
        </div>
    `;

    // Show modal
    modal.classList.remove('closing');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Scroll modal content to top
    const content = modal.querySelector('.modal-content');
    if (content) content.scrollTop = 0;
}

/**
 * Close doctor profile modal
 */
function closeDoctorModal() {
    const modal = document.getElementById('doctorModal');
    if (!modal) return;

    modal.classList.add('closing');

    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        document.body.style.overflow = '';
    }, 250);
}

/**
 * Keyboard support (Escape to close)
 */
function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('doctorModal');
            if (modal && modal.classList.contains('active')) {
                closeDoctorModal();
            }
        }
    });
}

/**
 * Specialty filter tabs
 */
function initDoctorFilters() {
    const filterContainer = document.querySelector('.doc-filter-tabs');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.doc-filter-tab');
        if (!tab) return;

        // Update active state
        filterContainer.querySelectorAll('.doc-filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        filterDoctors(filter);
        updateDoctorCount(filter);
    });
}

function filterDoctors(specialty) {
    const cards = document.querySelectorAll('.doc-profile-card');
    let delay = 0;

    cards.forEach(card => {
        const cardSpecialties = card.dataset.specialty.split(' ');

        if (specialty === 'all' || cardSpecialties.includes(specialty)) {
            card.style.display = '';
            card.style.animation = `docFadeIn 0.4s ease ${delay}s both`;
            delay += 0.06;
        } else {
            card.style.display = 'none';
            card.style.animation = '';
        }
    });
}

function updateDoctorCount(specialty) {
    const countEl = document.querySelector('.doc-count');
    if (!countEl || typeof DOCTORS_DATA === 'undefined') return;

    const total = specialty === 'all'
        ? DOCTORS_DATA.length
        : DOCTORS_DATA.filter(d => d.specialties.includes(specialty)).length;

    countEl.textContent = `แพทย์ ${total} ท่าน`;
}

/**
 * Scroll animations with IntersectionObserver
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('doc-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.doc-profile-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Why cards scroll animation
 */
function initWhyCardsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.why-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}
