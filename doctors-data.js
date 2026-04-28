/**
 * Doctors Data - DR.DEN Clinic
 * Data-driven doctor profiles for easy management
 */

/** Brand color & label config */
const BRAND_COLORS = {
    paragon: { primary: '#E6B030', light: '#FFD54F', name: 'Paragon' },
    nirvana: { primary: '#0288D1', light: '#039BE5', name: 'Nirvana' },
    fxc:     { primary: '#8B0000', light: '#C62828', name: 'FXC Clinic' }
};

const DOCTORS_DATA = [
    {
        id: 1,
        nickname: 'หมอเด่น',
        fullName: 'นพ.อภิวัฒน์ มงคลสินธุ์',
        license: 'ว.26872',
        image: 'assets/images/doctor-new/Paragon/หมอเด่น-PC.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอเด่น-PC.webp',
            nirvana: 'assets/images/doctor-new/Nirvana/หมอเด่น-NC04.webp',
            fxc: 'assets/images/doctor-new/FXC/หมอเด่น-FXC-1.webp'
        },
        specialties: ['dermatology', 'aesthetic', 'antiaging'],
        branches: [
            { name: 'Paragon', class: 'paragon' },
            { name: 'Nirvana', class: 'nirvana' },
            { name: 'FXC Clinic', class: 'fxc' }
        ],
        role: 'ผู้อำนวยการคลินิก',
        featured: true,
        bio: 'ผู้อำนวยการคลินิกหมอเด่นที่มีประสบการณ์ด้านความงามและผิวหนังมากกว่า 15 ปี มุ่งมั่นในการดูแลผิวพรรณของทุกท่านด้วยเทคโนโลยีที่ทันสมัยและปลอดภัย',
        education: [
            'แพทยศาสตรบัณฑิต มหาวิทยาลัยชั้นนำ',
            'วุฒิบัตรผิวหนังและเลเซอร์',
            'Certificate in Aesthetic Medicine'
        ],
        experience: '15+ ปี',
        expertise: ['ฉีดฟิลเลอร์ปรับรูปหน้า', 'โบท็อกซ์', 'ร้อยไหม', 'เลเซอร์รักษาผิว', 'การดูแลผิวแบบองค์รวม'],
        certifications: ['แพทยสภา', 'สมาคมแพทย์ผิวหนังแห่งประเทศไทย']
    },
    {
        id: 2,
        nickname: 'หมอเฟิร์น',
        fullName: 'พญ.กันยารัตน์ ตฤงณวสุนธรา',
        license: 'ว.71875',
        image: 'assets/images/doctor-new/Nirvana/หมอเฟิร์น-NC05.webp',
        brandImages: {
            nirvana: 'assets/images/doctor-new/Nirvana/หมอเฟิร์น-NC05.webp',
            fxc: 'assets/images/doctor-new/FXC/หมอเฟิร์น-FXC-2.webp'
        },
        specialties: ['aesthetic', 'laser'],
        branches: [
            { name: 'Paragon', class: 'paragon' },
            { name: 'Nirvana', class: 'nirvana' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านความงามและเลเซอร์ ใส่ใจในทุกรายละเอียด เพื่อผลลัพธ์ที่เป็นธรรมชาติและสวยงาม',
        education: [
            'แพทยศาสตรบัณฑิต',
            'ประกาศนียบัตรเวชศาสตร์ความงาม',
            'Certificate in Laser Dermatology'
        ],
        experience: '5+ ปี',
        expertise: ['เลเซอร์รักษาสิว', 'เลเซอร์กำจัดขน', 'ฟิลเลอร์', 'โบท็อกซ์', 'หัตถการเสริมความงาม'],
        certifications: ['แพทยสภา']
    },
    {
        id: 3,
        nickname: 'หมอบับเบิ้ล',
        fullName: 'นพ.ณัฐพัชร์ ธรรมสิริรัตน์',
        license: 'ว.69131',
        image: 'assets/images/doctor-new/Paragon/หมอบับเบิ้ล-PC-scaled.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอบับเบิ้ล-PC-scaled.webp'
        },
        specialties: ['dermatology', 'aesthetic'],
        branches: [
            { name: 'Paragon', class: 'paragon' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญเฉพาะทางด้านผิวหนังและความงาม มุ่งเน้นการรักษาที่ได้ผลลัพธ์จริงและปลอดภัย',
        education: [
            'แพทยศาสตรบัณฑิต',
            'วุฒิบัตรตจวิทยา',
            'อบรมเฉพาะทางด้านผิวหนัง'
        ],
        experience: '7+ ปี',
        expertise: ['รักษาสิว', 'รักษาผิวหนัง', 'ฟิลเลอร์', 'เลเซอร์หน้าใส', 'Skin Booster'],
        certifications: ['แพทยสภา', 'สมาคมแพทย์ผิวหนังแห่งประเทศไทย']
    },
    {
        id: 4,
        nickname: 'หมอมุ้งมิ้ง',
        fullName: 'พญ.กวิสรา เทียนทอง',
        license: 'ว.75283',
        image: 'assets/images/doctor-new/Paragon/หมอมุ้งมิ้ง-PC-scaled.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอมุ้งมิ้ง-PC-scaled.webp',
            fxc: 'assets/images/doctor-new/FXC/หมอมุ้งมิ้ง-FXC-6.webp'
        },
        specialties: ['aesthetic', 'antiaging'],
        branches: [
            { name: 'Paragon', class: 'paragon' },
            { name: 'FXC Clinic', class: 'fxc' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านความงามและชะลอวัย ดูแลคนไข้ด้วยความเอาใจใส่ เน้นผลลัพธ์ที่เป็นธรรมชาติ',
        education: [
            'แพทยศาสตรบัณฑิต',
            'ประกาศนียบัตรเวชศาสตร์ชะลอวัย',
            'Certificate in Aesthetic Medicine'
        ],
        experience: '4+ ปี',
        expertise: ['ฟิลเลอร์ปรับรูปหน้า', 'โบท็อกซ์', 'ร้อยไหม', 'Skincare Program', 'Anti-Aging Treatment'],
        certifications: ['แพทยสภา']
    },
    {
        id: 5,
        nickname: 'หมอจีจี้',
        fullName: 'พญ.จิตาภา อุดมพันท์',
        license: 'ว.61919',
        image: 'assets/images/doctor-new/Paragon/หมอจีจี้-PC.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอจีจี้-PC.webp'
        },
        specialties: ['dermatology', 'aesthetic'],
        branches: [
            { name: 'Paragon', class: 'paragon' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านผิวหนังและความงาม มีประสบการณ์ในการรักษาปัญหาผิวอย่างครบวงจร',
        education: [
            'แพทยศาสตรบัณฑิต',
            'วุฒิบัตรตจวิทยา',
            'อบรมเฉพาะทางด้านเวชศาสตร์ความงาม'
        ],
        experience: '8+ ปี',
        expertise: ['รักษาสิว-ฝ้า-กระ', 'เลเซอร์', 'ฟิลเลอร์', 'โบท็อกซ์', 'Mesotherapy'],
        certifications: ['แพทยสภา', 'สมาคมแพทย์ผิวหนังแห่งประเทศไทย']
    },
    {
        id: 6,
        nickname: 'หมอเชฟ',
        fullName: 'พญ.ธนรักษ์ หย่ำวิไล',
        license: 'ว.61954',
        image: 'assets/images/doctor-new/Paragon/หมอเซฟ-PC-scaled.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอเซฟ-PC-scaled.webp'
        },
        specialties: ['aesthetic', 'laser'],
        branches: [
            { name: 'Paragon', class: 'paragon' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านความงามและเลเซอร์ ดูแลคนไข้อย่างใกล้ชิด เน้นความปลอดภัยเป็นอันดับหนึ่ง',
        education: [
            'แพทยศาสตรบัณฑิต',
            'Certificate in Laser Medicine',
            'ประกาศนียบัตรเวชศาสตร์ความงาม'
        ],
        experience: '8+ ปี',
        expertise: ['เลเซอร์รักษาผิว', 'ฟิลเลอร์', 'เลเซอร์กำจัดขน', 'โบท็อกซ์', 'Skin Rejuvenation'],
        certifications: ['แพทยสภา']
    },
    {
        id: 7,
        nickname: 'หมอบัว',
        fullName: 'พญ.ปรียสุดา นาคาคง',
        license: 'ว.34659',
        image: 'assets/images/doctor-new/Paragon/หมอบัว-PC.webp',
        brandImages: {
            paragon: 'assets/images/doctor-new/Paragon/หมอบัว-PC.webp'
        },
        specialties: ['dermatology', 'aesthetic'],
        branches: [
            { name: 'Paragon', class: 'paragon' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านผิวหนังและเวชศาสตร์ความงาม ดูแลปัญหาผิวอย่างครบวงจรด้วยประสบการณ์ยาวนาน',
        education: [
            'แพทยศาสตรบัณฑิต',
            'วุฒิบัตรสาขาตจวิทยา',
            'อบรมหัตถการเสริมความงาม'
        ],
        experience: '12+ ปี',
        expertise: ['รักษาผิวหนัง', 'ฟิลเลอร์', 'โบท็อกซ์', 'เลเซอร์', 'Skin Analysis'],
        certifications: ['แพทยสภา', 'สมาคมแพทย์ผิวหนังแห่งประเทศไทย']
    },
    {
        id: 8,
        nickname: 'หมอกร',
        fullName: 'นพ.กรชัย พิมพนิช',
        license: 'ว.69225',
        image: 'assets/images/doctor-new/FXC/หมอกร-FXC-3.webp',
        brandImages: {
            fxc: 'assets/images/doctor-new/FXC/หมอกร-FXC-3.webp',
            nirvana: 'assets/images/doctor-new/Nirvana/หมอกร-NC01.webp'
        },
        specialties: ['aesthetic', 'antiaging', 'laser'],
        branches: [
            { name: 'Paragon', class: 'paragon' },
            { name: 'Nirvana', class: 'nirvana' },
            { name: 'FXC Clinic', class: 'fxc' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านความงาม ชะลอวัย และเลเซอร์ พร้อมดูแลคุณด้วยเทคนิคที่ทันสมัยและปลอดภัย',
        education: [
            'แพทยศาสตรบัณฑิต',
            'Certificate in Anti-Aging Medicine',
            'Certificate in Laser & Aesthetic'
        ],
        experience: '7+ ปี',
        expertise: ['ฟิลเลอร์', 'โบท็อกซ์', 'เลเซอร์', 'ร้อยไหม', 'Anti-Aging Program'],
        certifications: ['แพทยสภา']
    },
    {
        id: 9,
        nickname: 'หมอพิ้ง',
        fullName: 'พญ.พรรณราย เลิศวณิชโรจน์',
        license: 'ว.75182',
        image: 'assets/images/doctor-new/FXC/หมอผึ้ง-FXC-5.webp',
        brandImages: {
            fxc: 'assets/images/doctor-new/FXC/หมอผึ้ง-FXC-5.webp',
            nirvana: 'assets/images/doctor-new/Nirvana/หมอผึ้ง-NC03.webp'
        },
        specialties: ['dermatology', 'aesthetic'],
        branches: [
            { name: 'สาขาพิษณุโลก', class: 'branch-custom' },
            { name: 'สาขานครสวรรค์', class: 'branch-custom' }
        ],
        role: null,
        featured: false,
        bio: 'แพทย์ผู้เชี่ยวชาญด้านผิวหนังและความงาม ประจำสาขาต่างจังหวัด ให้บริการดูแลผิวพรรณอย่างมืออาชีพ',
        education: [
            'แพทยศาสตรบัณฑิต',
            'ประกาศนียบัตรเวชศาสตร์ความงาม',
            'อบรมเฉพาะทางด้านผิวหนัง'
        ],
        experience: '4+ ปี',
        expertise: ['รักษาสิว', 'ดูแลผิวหนัง', 'เลเซอร์', 'ฟิลเลอร์', 'Skin Booster'],
        certifications: ['แพทยสภา']
    }
];

/**
 * Specialty filter categories
 */
const DOCTOR_SPECIALTIES = [
    { key: 'all', label: 'ทั้งหมด', icon: 'fas fa-user-md' },
    { key: 'dermatology', label: 'ผิวหนัง', icon: 'fas fa-hand-sparkles' },
    { key: 'aesthetic', label: 'ความงาม', icon: 'fas fa-spa' },
    { key: 'laser', label: 'เลเซอร์', icon: 'fas fa-bolt' },
    { key: 'antiaging', label: 'ต้านริ้วรอย', icon: 'fas fa-leaf' }
];

/**
 * Specialty Thai labels for display
 */
const SPECIALTY_LABELS = {
    dermatology: 'ผิวหนัง',
    aesthetic: 'ความงาม',
    laser: 'เลเซอร์',
    antiaging: 'ต้านริ้วรอย'
};

/**
 * Render brand image switcher dots (only if doctor has 2+ brand images)
 */
function renderBrandSwitcher(doctor, context) {
    const brands = doctor.brandImages ? Object.keys(doctor.brandImages) : [];
    if (brands.length < 2) return '';

    // Find which brand key matches the current default image
    let activeBrand = brands[0];
    for (const key of brands) {
        if (doctor.brandImages[key] === doctor.image) {
            activeBrand = key;
            break;
        }
    }

    const dots = brands.map(key => {
        const bc = BRAND_COLORS[key];
        if (!bc) return '';
        const isActive = key === activeBrand ? ' active' : '';
        return `<button class="brand-dot${isActive}" 
                    data-brand="${key}" 
                    data-img="${doctor.brandImages[key]}"
                    data-context="${context}"
                    title="${bc.name}"
                    style="--dot-color: ${bc.primary}; --dot-light: ${bc.light}"
                    onclick="event.stopPropagation(); switchBrandImage(this)">
                    <span class="brand-dot-label">${bc.name}</span>
                </button>`;
    }).join('');

    return `<div class="doc-brand-switcher">${dots}</div>`;
}

/**
 * Switch doctor image when brand dot is clicked
 */
function switchBrandImage(btn) {
    const switcher = btn.closest('.doc-brand-switcher');
    const imgSrc = btn.dataset.img;
    const context = btn.dataset.context;

    // Update active dot
    switcher.querySelectorAll('.brand-dot').forEach(d => d.classList.remove('active'));
    btn.classList.add('active');

    // Find the image element based on context
    let imgEl;
    if (context === 'card') {
        const card = btn.closest('.doc-profile-card');
        imgEl = card.querySelector('.doc-photo img');
    } else if (context === 'modal') {
        imgEl = document.querySelector('.modal-hero-img');
    }

    if (imgEl) {
        imgEl.style.opacity = '0';
        imgEl.style.transform = 'scale(0.96)';
        setTimeout(() => {
            imgEl.src = imgSrc;
            imgEl.onload = () => {
                imgEl.style.opacity = '1';
                imgEl.style.transform = 'scale(1)';
            };
        }, 200);
    }
}

/**
 * Render a single doctor card
 */
function renderDoctorCard(doctor, index) {
    const branchTags = doctor.branches.map(b =>
        `<span class="branch-tag ${b.class}">${b.name}</span>`
    ).join('');

    const specialtyData = doctor.specialties.join(' ');
    const roleHTML = doctor.role ? `<span class="doc-role-badge"><i class="fas fa-crown"></i> ${doctor.role}</span>` : '';
    const featuredClass = doctor.featured ? ' doc-card-featured' : '';
    const specialtyTags = doctor.specialties.map(s =>
        `<span class="doc-specialty-chip">${SPECIALTY_LABELS[s]}</span>`
    ).join('');

    const brandSwitcherHTML = renderBrandSwitcher(doctor, 'card');

    return `
        <div class="doc-profile-card${featuredClass}" 
             data-specialty="${specialtyData}" 
             data-index="${index}"
             data-doctor-id="${doctor.id}"
             style="animation-delay: ${index * 0.07}s">
            <div class="doc-photo-area">
                ${roleHTML}
                <div class="doc-photo">
                    <img src="${doctor.image}" alt="${doctor.nickname} - ${doctor.fullName}" loading="lazy"
                         style="transition: opacity 0.3s ease, transform 0.3s ease;">
                </div>
                ${brandSwitcherHTML}
                <div class="doc-photo-gradient"></div>
            </div>
            <div class="doc-info-area">
                <h3 class="doc-nickname">${doctor.nickname}</h3>
                <p class="doc-fullname">${doctor.fullName}</p>
                <p class="doc-license">ใบอนุญาต <strong>${doctor.license}</strong></p>
                <div class="doc-specialties-row">
                    ${specialtyTags}
                </div>
                <div class="doc-divider"></div>
                <div class="doc-branches-row">
                    ${branchTags}
                </div>
                <a href="index.html#contact" class="doc-book-btn" onclick="event.stopPropagation()">
                    <i class="fas fa-calendar-check"></i>
                    นัดหมายแพทย์
                </a>
            </div>
        </div>`;
}

/**
 * Render filter tabs for doctors page
 */
function renderDoctorFilters() {
    return DOCTOR_SPECIALTIES.map(spec => `
        <button class="doc-filter-tab${spec.key === 'all' ? ' active' : ''}" data-filter="${spec.key}">
            <i class="${spec.icon}"></i>
            <span>${spec.label}</span>
        </button>
    `).join('');
}

/**
 * Render the doctors page grid
 */
function renderDoctorsPage() {
    const grid = document.querySelector('.doc-profiles-grid');
    const filterContainer = document.querySelector('.doc-filter-tabs');
    const countEl = document.querySelector('.doc-count');

    if (filterContainer) {
        filterContainer.innerHTML = renderDoctorFilters();
    }

    if (grid) {
        grid.innerHTML = DOCTORS_DATA.map((doc, i) => renderDoctorCard(doc, i)).join('');
    }

    if (countEl) {
        countEl.textContent = `แพทย์ ${DOCTORS_DATA.length} ท่าน`;
    }
}

/**
 * Render homepage doctor preview (first 3 doctors)
 */
function renderHomepageDoctors() {
    const grid = document.querySelector('.doctors-preview .doctors-grid');
    if (!grid) return;

    const previewDoctors = DOCTORS_DATA.slice(0, 3);
    grid.innerHTML = previewDoctors.map((doctor, index) => {
        const branchTags = doctor.branches.map(b =>
            `<span class="branch-tag ${b.class}">${b.name}</span>`
        ).join('');

        return `
            <div class="doctor-card">
                <div class="doctor-image-wrapper">
                    <div class="doctor-image">
                        <img src="${doctor.image}" alt="${doctor.nickname} - ${doctor.fullName}">
                    </div>
                </div>
                <div class="doctor-content">
                    <h3>${doctor.nickname}</h3>
                    <p class="doctor-title">${doctor.fullName}</p>
                    <p class="doctor-license">เลขที่ใบอนุญาต <strong>${doctor.license}</strong></p>
                    <div class="doctor-divider"></div>
                    <div class="doctor-branches">
                        ${branchTags}
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderDoctorsPage();
    renderHomepageDoctors();
});
