// Admin Panel JavaScript
// Using LocalStorage as mock database

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    initializeNavigation();
    initializeModals();
    initializeButtons();
    loadDashboardStats();
    checkAuthentication();
});

// ============================================
// AUTHENTICATION — uses auth.js (must be loaded BEFORE this script)
// auth.js auto-redirects to login.html if not authenticated
// ============================================
function checkAuthentication() {
    if (typeof isAdminAuthenticated === 'function' && !isAdminAuthenticated()) {
        window.location.replace('login.html');
    }
}

document.getElementById('logoutBtn')?.addEventListener('click', function() {
    if (confirm('ต้องการออกจากระบบ?')) {
        if (typeof adminLogout === 'function') {
            adminLogout();
        } else {
            window.location.replace('login.html');
        }
    }
});

// ============================================
// NAVIGATION
// ============================================
function initializeAdmin() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    
    sidebarToggle?.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide sections
            document.querySelectorAll('.admin-section').forEach(s => {
                s.classList.remove('active');
            });
            document.getElementById(`section-${section}`)?.classList.add('active');
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = this.querySelector('span')?.textContent || 'Dashboard';
            }
            
            // Load section data
            loadSectionData(section);
            
            // Close mobile menu
            if (window.innerWidth < 992) {
                document.getElementById('adminSidebar')?.classList.remove('active');
            }
        });
    });
}

// ============================================
// DASHBOARD STATS
// ============================================
function loadDashboardStats() {
    const reviews = getStorageData('reviews') || [];
    const promotions = getStorageData('promotions') || [];
    const articles = getStorageData('articles') || [];
    const services = getStorageData('services') || [];
    
    document.getElementById('totalReviews').textContent = reviews.length;
    document.getElementById('totalPromotions').textContent = promotions.length;
    document.getElementById('totalArticles').textContent = articles.length;
    document.getElementById('totalServices').textContent = services.length;
}

// ============================================
// DATA MANAGEMENT
// ============================================
function getStorageData(key) {
    try {
        return JSON.parse(localStorage.getItem(`drden_${key}`)) || [];
    } catch (e) {
        console.error('Error loading data:', e);
        return [];
    }
}

function setStorageData(key, data) {
    try {
        localStorage.setItem(`drden_${key}`, JSON.stringify(data));
        logActivity(`อัปเดต${getTypeName(key)}`);
        return true;
    } catch (e) {
        console.error('Error saving data:', e);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        return false;
    }
}

function getTypeName(type) {
    const names = {
        'reviews': 'รีวิว',
        'services': 'บริการ',
        'promotions': 'โปรโมชั่น',
        'articles': 'บทความ',
        'doctors': 'แพทย์',
        'branches': 'สาขา'
    };
    return names[type] || type;
}

function logActivity(action) {
    const activities = getStorageData('activities') || [];
    activities.unshift({
        action,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    
    // Keep only last 10 activities
    if (activities.length > 10) {
        activities.length = 10;
    }
    
    localStorage.setItem('drden_activities', JSON.stringify(activities));
}

// ============================================
// LOAD SECTION DATA
// ============================================
function loadSectionData(section) {
    switch(section) {
        case 'reviews':
            loadReviews();
            break;
        case 'services':
            loadServices();
            break;
        case 'promotions':
            loadPromotions();
            break;
        case 'articles':
            loadArticles();
            break;
        case 'doctors':
            loadDoctors();
            break;
        case 'branches':
            loadBranches();
            break;
    }
}

// ============================================
// REVIEWS MANAGEMENT
// ============================================
function loadReviews() {
    const reviews = getStorageData('reviews');
    const tbody = document.getElementById('reviewsTableBody');
    
    if (!tbody) return;
    
    if (reviews.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">ยังไม่มีรีวิว</td></tr>';
        return;
    }
    
    tbody.innerHTML = reviews.map(review => `
        <tr>
            <td>${review.customerName}</td>
            <td>${review.service}</td>
            <td>${'⭐'.repeat(review.rating)}</td>
            <td>${formatDate(review.date)}</td>
            <td><span class="status-badge status-${review.status}">${getStatusText(review.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editReview(${review.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteReview(${review.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addReview(data) {
    const reviews = getStorageData('reviews');
    const newReview = {
        id: Date.now(),
        ...data,
        date: new Date().toISOString(),
        status: 'active'
    };
    reviews.push(newReview);
    setStorageData('reviews', reviews);
    loadReviews();
    loadDashboardStats();
}

function editReview(id) {
    const reviews = getStorageData('reviews');
    const review = reviews.find(r => r.id === id);
    if (review) {
        showReviewForm(review);
    }
}

function deleteReview(id) {
    if (confirm('ต้องการลบรีวิวนี้?')) {
        let reviews = getStorageData('reviews');
        reviews = reviews.filter(r => r.id !== id);
        setStorageData('reviews', reviews);
        loadReviews();
        loadDashboardStats();
    }
}

// ============================================
// SERVICES MANAGEMENT
// ============================================
function loadServices() {
    const services = getStorageData('services');
    const tbody = document.getElementById('servicesTableBody');
    
    if (!tbody) return;
    
    if (services.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">ยังไม่มีบริการ</td></tr>';
        return;
    }
    
    tbody.innerHTML = services.map(service => `
        <tr>
            <td>${service.name}</td>
            <td>${service.category}</td>
            <td>${service.price} บาท</td>
            <td><span class="status-badge status-${service.status}">${getStatusText(service.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteService(id) {
    if (confirm('ต้องการลบบริการนี้?')) {
        let services = getStorageData('services');
        services = services.filter(s => s.id !== id);
        setStorageData('services', services);
        loadServices();
        loadDashboardStats();
    }
}

// ============================================
// PROMOTIONS MANAGEMENT
// ============================================
function loadPromotions() {
    const promotions = getStorageData('promotions');
    const tbody = document.getElementById('promotionsTableBody');
    
    if (!tbody) return;
    
    if (promotions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">ยังไม่มีโปรโมชั่น</td></tr>';
        return;
    }
    
    tbody.innerHTML = promotions.map(promo => `
        <tr>
            <td>${promo.name}</td>
            <td>${promo.discount}%</td>
            <td>${formatDate(promo.startDate)}</td>
            <td>${formatDate(promo.endDate)}</td>
            <td><span class="status-badge status-${promo.status}">${getStatusText(promo.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editPromotion(${promo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deletePromotion(${promo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deletePromotion(id) {
    if (confirm('ต้องการลบโปรโมชั่นนี้?')) {
        let promotions = getStorageData('promotions');
        promotions = promotions.filter(p => p.id !== id);
        setStorageData('promotions', promotions);
        loadPromotions();
        loadDashboardStats();
    }
}

// ============================================
// ARTICLES MANAGEMENT
// ============================================
function loadArticles() {
    const articles = getStorageData('articles');
    const tbody = document.getElementById('articlesTableBody');
    
    if (!tbody) return;
    
    if (articles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">ยังไม่มีบทความ</td></tr>';
        return;
    }
    
    tbody.innerHTML = articles.map(article => `
        <tr>
            <td>${article.title}</td>
            <td>${article.category}</td>
            <td>${article.author}</td>
            <td>${formatDate(article.date)}</td>
            <td><span class="status-badge status-${article.status}">${getStatusText(article.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editArticle(${article.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteArticle(${article.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteArticle(id) {
    if (confirm('ต้องการลบบทความนี้?')) {
        let articles = getStorageData('articles');
        articles = articles.filter(a => a.id !== id);
        setStorageData('articles', articles);
        loadArticles();
        loadDashboardStats();
    }
}

// ============================================
// DOCTORS MANAGEMENT
// ============================================
function loadDoctors() {
    const doctors = getStorageData('doctors');
    const tbody = document.getElementById('doctorsTableBody');
    
    if (!tbody) return;
    
    if (doctors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">ยังไม่มีข้อมูลแพทย์</td></tr>';
        return;
    }
    
    tbody.innerHTML = doctors.map(doctor => `
        <tr>
            <td>${doctor.name}</td>
            <td>${doctor.specialty}</td>
            <td>${doctor.branch}</td>
            <td><span class="status-badge status-${doctor.status}">${getStatusText(doctor.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editDoctor(${doctor.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteDoctor(${doctor.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteDoctor(id) {
    if (confirm('ต้องการลบข้อมูลแพทย์นี้?')) {
        let doctors = getStorageData('doctors');
        doctors = doctors.filter(d => d.id !== id);
        setStorageData('doctors', doctors);
        loadDoctors();
    }
}

// ============================================
// BRANCHES MANAGEMENT
// ============================================
function loadBranches() {
    const branches = getStorageData('branches');
    const tbody = document.getElementById('branchesTableBody');
    
    if (!tbody) return;
    
    if (branches.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">ยังไม่มีข้อมูลสาขา</td></tr>';
        return;
    }
    
    tbody.innerHTML = branches.map(branch => `
        <tr>
            <td>${branch.name}</td>
            <td>${branch.address}</td>
            <td>${branch.phone}</td>
            <td><span class="status-badge status-${branch.status}">${getStatusText(branch.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="editBranch(${branch.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteBranch(${branch.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteBranch(id) {
    if (confirm('ต้องการลบข้อมูลสาขานี้?')) {
        let branches = getStorageData('branches');
        branches = branches.filter(b => b.id !== id);
        setStorageData('branches', branches);
        loadBranches();
    }
}

// ============================================
// MODAL MANAGEMENT
// ============================================
function initializeModals() {
    const modal = document.getElementById('adminModal');
    const modalClose = document.getElementById('modalClose');
    
    modalClose?.addEventListener('click', closeModal);
    
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showModal(title, content) {
    const modal = document.getElementById('adminModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('adminModal');
    modal?.classList.remove('active');
}

// ============================================
// FORM TEMPLATES
// ============================================
function showReviewForm(review = null) {
    const isEdit = review !== null;
    const formContent = `
        <form id="reviewForm" onsubmit="handleReviewSubmit(event, ${isEdit ? review.id : 'null'})">
            <div class="form-group">
                <label class="form-label">ชื่อลูกค้า</label>
                <input type="text" class="form-control" name="customerName" value="${review?.customerName || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">บริการที่ใช้</label>
                <input type="text" class="form-control" name="service" value="${review?.service || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">คะแนน (1-5)</label>
                <select class="form-control" name="rating" required>
                    ${[1,2,3,4,5].map(n => `<option value="${n}" ${review?.rating == n ? 'selected' : ''}>${n} ดาว</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">ความคิดเห็น</label>
                <textarea class="form-control" name="comment" required>${review?.comment || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">สถานะ</label>
                <select class="form-control" name="status" required>
                    <option value="active" ${review?.status == 'active' ? 'selected' : ''}>ใช้งาน</option>
                    <option value="inactive" ${review?.status == 'inactive' ? 'selected' : ''}>ไม่ใช้งาน</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary">${isEdit ? 'บันทึก' : 'เพิ่มรีวิว'}</button>
            </div>
        </form>
    `;
    
    showModal(isEdit ? 'แก้ไขรีวิว' : 'เพิ่มรีวิว', formContent);
}

function handleReviewSubmit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    let reviews = getStorageData('reviews');
    
    if (id) {
        // Edit existing
        const index = reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...data };
        }
    } else {
        // Add new
        reviews.push({
            id: Date.now(),
            ...data,
            date: new Date().toISOString()
        });
    }
    
    setStorageData('reviews', reviews);
    loadReviews();
    loadDashboardStats();
    closeModal();
}

// ============================================
// BUTTON INITIALIZATION
// ============================================
function initializeButtons() {
    // Add buttons
    document.getElementById('addReviewBtn')?.addEventListener('click', () => showReviewForm());
    document.getElementById('addServiceBtn')?.addEventListener('click', () => alert('ฟีเจอร์เพิ่มบริการกำลังพัฒนา'));
    document.getElementById('addPromotionBtn')?.addEventListener('click', () => alert('ฟีเจอร์เพิ่มโปรโมชั่นกำลังพัฒนา'));
    document.getElementById('addArticleBtn')?.addEventListener('click', () => alert('ฟีเจอร์เพิ่มบทความกำลังพัฒนา'));
    document.getElementById('addDoctorBtn')?.addEventListener('click', () => alert('ฟีเจอร์เพิ่มแพทย์กำลังพัฒนา'));
    document.getElementById('addBranchBtn')?.addEventListener('click', () => alert('ฟีเจอร์เพิ่มสาขากำลังพัฒนา'));
    
    // Settings buttons
    document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
    document.getElementById('importDataBtn')?.addEventListener('click', importData);
    document.getElementById('clearDataBtn')?.addEventListener('click', clearAllData);
}

// ============================================
// DATA IMPORT/EXPORT
// ============================================
function exportData() {
    const data = {
        reviews: getStorageData('reviews'),
        services: getStorageData('services'),
        promotions: getStorageData('promotions'),
        articles: getStorageData('articles'),
        doctors: getStorageData('doctors'),
        branches: getStorageData('branches'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `drden-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('ส่งออกข้อมูลเรียบร้อย!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (confirm('ต้องการนำเข้าข้อมูล? ข้อมูลเดิมจะถูกแทนที่')) {
                    Object.keys(data).forEach(key => {
                        if (key !== 'exportDate') {
                            setStorageData(key, data[key]);
                        }
                    });
                    alert('นำเข้าข้อมูลเรียบร้อย!');
                    window.location.reload();
                }
            } catch (e) {
                alert('ไฟล์ไม่ถูกต้อง!');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('ต้องการลบข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้!')) {
        if (confirm('กรุณายืนยันอีกครั้ง - ข้อมูลทั้งหมดจะถูกลบ!')) {
            ['reviews', 'services', 'promotions', 'articles', 'doctors', 'branches', 'activities'].forEach(key => {
                localStorage.removeItem(`drden_${key}`);
            });
            alert('ลบข้อมูลทั้งหมดเรียบร้อย!');
            window.location.reload();
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusText(status) {
    const statusMap = {
        'active': 'ใช้งาน',
        'inactive': 'ไม่ใช้งาน',
        'pending': 'รอดำเนินการ'
    };
    return statusMap[status] || status;
}

// ============================================
// SAMPLE DATA (FOR TESTING)
// ============================================
function initializeSampleData() {
    if (!getStorageData('reviews').length) {
        const sampleReviews = [
            {
                id: 1,
                customerName: 'คุณ ก.',
                service: 'ฟิลเลอร์',
                rating: 5,
                comment: 'บริการดีมาก ผลลัพธ์ตรงตามที่ต้องการ',
                date: new Date().toISOString(),
                status: 'active'
            }
        ];
        setStorageData('reviews', sampleReviews);
    }
}

// Uncomment to initialize sample data
// initializeSampleData();
