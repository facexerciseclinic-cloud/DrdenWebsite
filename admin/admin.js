/* ============================================================
   DR.DEN CLINIC — ADMIN PANEL (LocalStorage CMS)
   ============================================================
   Storage keys: drden_<resource>
   Resources: reviews | services | promotions | articles | doctors | branches
   ============================================================ */

/* -----------------------------------------------------------
   STORAGE LAYER
----------------------------------------------------------- */
const KEY = (k) => `drden_${k}`;

function load(key) {
    try { return JSON.parse(localStorage.getItem(KEY(key))) || []; }
    catch { return []; }
}
function save(key, data) {
    try {
        localStorage.setItem(KEY(key), JSON.stringify(data));
        logActivity(`อัปเดต${TYPE_LABEL[key] || key}`);
        return true;
    } catch (e) {
        toast('บันทึกไม่ได้: ' + (e.message || ''), 'error');
        return false;
    }
}
const TYPE_LABEL = {
    reviews: 'รีวิว', services: 'บริการ', promotions: 'โปรโมชั่น',
    articles: 'บทความ', doctors: 'แพทย์', branches: 'สาขา'
};

/* -----------------------------------------------------------
   ACTIVITY LOG
----------------------------------------------------------- */
function logActivity(action) {
    const list = load('activities');
    list.unshift({ id: Date.now(), action, ts: new Date().toISOString() });
    if (list.length > 30) list.length = 30;
    localStorage.setItem(KEY('activities'), JSON.stringify(list));
}

function renderActivity() {
    const box = document.getElementById('activityList');
    if (!box) return;
    const list = load('activities');
    if (!list.length) {
        box.innerHTML = '<p class="text-muted">ยังไม่มีกิจกรรม</p>';
        return;
    }
    box.innerHTML = list.slice(0, 8).map(a => `
        <div class="activity-item">
            <i class="fas fa-circle-check" style="color:#43e97b"></i>
            <div>
                <div>${escapeHtml(a.action)}</div>
                <small class="text-muted">${formatRelative(a.ts)}</small>
            </div>
        </div>`).join('');
}

/* -----------------------------------------------------------
   UTILITY
----------------------------------------------------------- */
function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}
function formatDate(s) {
    if (!s) return '-';
    const d = new Date(s);
    if (isNaN(d)) return s;
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatRelative(ts) {
    const diff = (Date.now() - new Date(ts).getTime()) / 1000;
    if (diff < 60) return 'เมื่อสักครู่';
    if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} วันที่แล้ว`;
    return formatDate(ts);
}
function slugify(text) {
    return String(text).toLowerCase()
        .replace(/[^\w\u0E00-\u0E7F\s-]/g, '')
        .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}
function getStatusText(s) {
    return ({ active: 'ใช้งาน', inactive: 'ปิด', pending: 'รอตรวจ', draft: 'ฉบับร่าง', published: 'เผยแพร่' })[s] || s || '-';
}
function debounce(fn, wait = 250) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
}

/* -----------------------------------------------------------
   TOAST
----------------------------------------------------------- */
function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'circle-exclamation' : 'info-circle'}"></i> ${escapeHtml(msg)}`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3000);
}

/* -----------------------------------------------------------
   IMAGE HELPERS — compress to base64 (max 1280px, ~85% jpeg)
----------------------------------------------------------- */
function fileToCompressedDataURL(file, maxSize = 1280, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                if (width > maxSize || height > maxSize) {
                    if (width > height) { height = Math.round(height * maxSize / width); width = maxSize; }
                    else { width = Math.round(width * maxSize / height); height = maxSize; }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width; canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

/* -----------------------------------------------------------
   MODAL
----------------------------------------------------------- */
function openModal(title, body, size = '') {
    const m = document.getElementById('adminModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    m.querySelector('.modal-content-admin').dataset.size = size;
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('adminModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

/* -----------------------------------------------------------
   CONFIRM (custom)
----------------------------------------------------------- */
function confirmAction(message) {
    return new Promise(resolve => {
        const id = 'confirm_' + Date.now();
        openModal('ยืนยัน', `
            <p style="margin-bottom:2rem;font-size:1.05rem;">${escapeHtml(message)}</p>
            <div class="form-actions">
                <button class="btn btn-outline" id="${id}_no">ยกเลิก</button>
                <button class="btn btn-danger" id="${id}_yes">ยืนยัน</button>
            </div>`, 'sm');
        document.getElementById(`${id}_no`).onclick = () => { closeModal(); resolve(false); };
        document.getElementById(`${id}_yes`).onclick = () => { closeModal(); resolve(true); };
    });
}

/* -----------------------------------------------------------
   NAVIGATION
----------------------------------------------------------- */
const SECTION_RENDERERS = {};

function initNavigation() {
    document.querySelectorAll('.admin-nav-link[data-section]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            switchSection(link.dataset.section, link);
        });
    });

    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        document.getElementById('adminSidebar').classList.toggle('active');
    });
}

function switchSection(name, linkEl) {
    document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
    if (linkEl) linkEl.classList.add('active');
    else document.querySelector(`.admin-nav-link[data-section="${name}"]`)?.classList.add('active');

    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${name}`)?.classList.add('active');

    const title = document.querySelector(`.admin-nav-link[data-section="${name}"] span`)?.textContent || 'Dashboard';
    document.getElementById('pageTitle').textContent = title;

    SECTION_RENDERERS[name]?.();

    if (window.innerWidth < 992) document.getElementById('adminSidebar')?.classList.remove('active');
}

/* -----------------------------------------------------------
   DASHBOARD
----------------------------------------------------------- */
SECTION_RENDERERS.dashboard = function () {
    document.getElementById('totalReviews').textContent = load('reviews').length;
    document.getElementById('totalPromotions').textContent = load('promotions').length;
    document.getElementById('totalArticles').textContent = load('articles').length;
    document.getElementById('totalServices').textContent = load('services').length;
    const td = document.getElementById('totalDoctors'); if (td) td.textContent = load('doctors').length;
    const tb = document.getElementById('totalBranches'); if (tb) tb.textContent = load('branches').length;
    renderActivity();
    renderStorageInfo();
};

function renderStorageInfo() {
    const el = document.getElementById('storageInfo'); if (!el) return;
    let used = 0;
    for (const k in localStorage) if (k.startsWith('drden_')) used += (localStorage[k] || '').length;
    const kb = (used / 1024).toFixed(1);
    const pct = Math.min(100, (used / (5 * 1024 * 1024)) * 100).toFixed(1);
    el.innerHTML = `<div style="margin-bottom:.5rem;font-size:.9rem;">ใช้ไปแล้ว <strong>${kb} KB</strong> (${pct}% ของ ~5MB)</div>
        <div style="background:#eee;border-radius:10px;height:8px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#43e97b,#ffb300);"></div></div>`;
}

/* -----------------------------------------------------------
   GENERIC TABLE FILTERING
----------------------------------------------------------- */
function applyFilter(items, search, fields) {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(it => fields.some(f => String(it[f] || '').toLowerCase().includes(q)));
}

/* ============================================================
   REVIEWS
============================================================ */
SECTION_RENDERERS.reviews = function () {
    const items = load('reviews');
    const tbody = document.getElementById('reviewsTableBody');
    if (!tbody) return;
    const search = document.getElementById('reviewSearch')?.value.trim() || '';
    const cat = document.getElementById('reviewCatFilter')?.value || '';
    let filtered = applyFilter(items, search, ['userName', 'title', 'shortText', 'treatment']);
    if (cat) filtered = filtered.filter(r => r.category === cat);

    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">${items.length ? 'ไม่พบผลลัพธ์ที่ค้นหา' : 'ยังไม่มีรีวิว — กดปุ่ม "เพิ่มรีวิว"'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(r => `
        <tr>
            <td>${r.image ? `<img src="${escapeHtml(r.image)}" class="cell-thumb" alt="">` : '—'}</td>
            <td><strong>${escapeHtml(r.userName || '-')}</strong><br><small class="text-muted">${escapeHtml(r.title || '')}</small></td>
            <td>${escapeHtml(r.category || '-')}</td>
            <td>${'⭐'.repeat(r.rating || 0)}</td>
            <td>${escapeHtml(r.date || '')}</td>
            <td>${r.showOnHome ? '<span class="status-badge status-active">หน้าแรก</span>' : '<span class="status-badge status-inactive">ในหน้ารีวิว</span>'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="formReview(${r.id})" title="แก้ไข"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('reviews',${r.id})" title="ลบ"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formReview(id = null) {
    const item = id ? load('reviews').find(r => r.id === id) : null;
    const cats = ['filler', 'botox', 'acne', 'resetyoung', 'sculping', 'collagen', 'juvelook', 'ulthera'];
    const body = `
        <form id="resourceForm" onsubmit="return saveReview(event, ${id || 'null'})">
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">ชื่อลูกค้า *</label>
                    <input class="form-control" name="userName" required value="${escapeHtml(item?.userName || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">วันที่ (เช่น 30 เมษายน 2026)</label>
                    <input class="form-control" name="date" value="${escapeHtml(item?.date || '')}">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">หัวข้อ *</label>
                <input class="form-control" name="title" required value="${escapeHtml(item?.title || '')}">
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">หมวดหมู่ *</label>
                    <select class="form-control" name="category" required>
                        ${cats.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">คะแนน *</label>
                    <select class="form-control" name="rating" required>
                        ${[5,4,3,2,1].map(n => `<option value="${n}" ${item?.rating == n ? 'selected' : ''}>${n} ดาว</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">บริการ / Treatment</label>
                <input class="form-control" name="treatment" value="${escapeHtml(item?.treatment || '')}">
            </div>
            <div class="form-group">
                <label class="form-label">ข้อความสั้น</label>
                <input class="form-control" name="shortText" value="${escapeHtml(item?.shortText || '')}">
            </div>
            <div class="form-group">
                <label class="form-label">ข้อความเต็ม</label>
                <textarea class="form-control" name="fullText">${escapeHtml(item?.fullText || '')}</textarea>
            </div>
            ${imageUploadField('image', item?.image)}
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="showOnHome" ${item?.showOnHome ? 'checked' : ''}>
                    <span>แสดงในหน้าแรก (Featured)</span>
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขรีวิว' : 'เพิ่มรีวิว', body, 'lg');
    bindImageUpload('image');
}

function saveReview(e, id) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    data.rating = parseInt(data.rating) || 5;
    data.showOnHome = !!fd.get('showOnHome');
    data.image = document.querySelector('[data-img-field="image"]')?.dataset.value || data.image || '';
    upsert('reviews', data, id);
    return false;
}

/* ============================================================
   SERVICES
============================================================ */
SECTION_RENDERERS.services = function () {
    const items = load('services');
    const tbody = document.getElementById('servicesTableBody');
    if (!tbody) return;
    const search = document.getElementById('serviceSearch')?.value.trim() || '';
    const filtered = applyFilter(items, search, ['name', 'category', 'description']);
    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">${items.length ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีบริการ'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(s => `
        <tr>
            <td>${s.image ? `<img src="${escapeHtml(s.image)}" class="cell-thumb" alt="">` : '—'}</td>
            <td><strong>${escapeHtml(s.name)}</strong></td>
            <td>${escapeHtml(s.category || '-')}</td>
            <td>${s.price ? Number(s.price).toLocaleString() + ' บาท' : '-'}</td>
            <td><span class="status-badge status-${s.status || 'active'}">${getStatusText(s.status || 'active')}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="formService(${s.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('services',${s.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formService(id = null) {
    const item = id ? load('services').find(s => s.id === id) : null;
    const cats = ['Filler', 'Botox', 'Acne', 'Laser', 'Skin Booster', 'HIFU', 'Sculptra', 'Other'];
    const body = `
        <form id="resourceForm" onsubmit="return saveService(event, ${id || 'null'})">
            <div class="form-group">
                <label class="form-label">ชื่อบริการ *</label>
                <input class="form-control" name="name" required value="${escapeHtml(item?.name || '')}">
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">หมวดหมู่ *</label>
                    <select class="form-control" name="category" required>
                        ${cats.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">ราคา (บาท)</label>
                    <input class="form-control" type="number" name="price" min="0" value="${escapeHtml(item?.price || '')}">
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">ระยะเวลา (นาที)</label>
                    <input class="form-control" type="number" name="duration" min="0" value="${escapeHtml(item?.duration || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">สถานะ</label>
                    <select class="form-control" name="status">
                        <option value="active" ${item?.status !== 'inactive' ? 'selected' : ''}>ใช้งาน</option>
                        <option value="inactive" ${item?.status === 'inactive' ? 'selected' : ''}>ปิด</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">รายละเอียด</label>
                <textarea class="form-control" name="description">${escapeHtml(item?.description || '')}</textarea>
            </div>
            ${imageUploadField('image', item?.image)}
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขบริการ' : 'เพิ่มบริการ', body, 'lg');
    bindImageUpload('image');
}

function saveService(e, id) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.price = parseInt(data.price) || 0;
    data.duration = parseInt(data.duration) || 0;
    data.image = document.querySelector('[data-img-field="image"]')?.dataset.value || '';
    upsert('services', data, id);
    return false;
}

/* ============================================================
   PROMOTIONS
============================================================ */
SECTION_RENDERERS.promotions = function () {
    const items = load('promotions');
    const tbody = document.getElementById('promotionsTableBody');
    if (!tbody) return;
    const search = document.getElementById('promoSearch')?.value.trim() || '';
    const filtered = applyFilter(items, search, ['title', 'category', 'badge']);
    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">${items.length ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีโปรโมชั่น'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td>${p.image ? `<img src="${escapeHtml(p.image)}" class="cell-thumb" alt="">` : '—'}</td>
            <td><strong>${escapeHtml(p.title || '-')}</strong></td>
            <td>${p.badge ? `<span class="status-badge status-pending">${escapeHtml(p.badge)}</span>` : '-'}</td>
            <td>${escapeHtml(p.category || '-')}</td>
            <td>${p.featured ? '<i class="fas fa-star" style="color:#ffd700"></i>' : '—'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="formPromo(${p.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('promotions',${p.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formPromo(id = null) {
    const item = id ? load('promotions').find(p => p.id === id) : null;
    const cats = ['filler', 'botox', 'package', 'skincare', 'laser', 'other'];
    const badges = ['', 'HOT', 'NEW', 'BEST', 'PREMIUM', 'SALE'];
    const body = `
        <form id="resourceForm" onsubmit="return savePromo(event, ${id || 'null'})">
            <div class="form-group">
                <label class="form-label">ชื่อโปรโมชั่น *</label>
                <input class="form-control" name="title" required value="${escapeHtml(item?.title || '')}">
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">หมวดหมู่</label>
                    <select class="form-control" name="category">
                        ${cats.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Badge</label>
                    <select class="form-control" name="badge">
                        ${badges.map(b => `<option value="${b}" ${item?.badge === b ? 'selected' : ''}>${b || '— ไม่มี —'}</option>`).join('')}
                    </select>
                </div>
            </div>
            ${imageUploadField('image', item?.image)}
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="featured" ${item?.featured ? 'checked' : ''}>
                    <span>เด่น (Featured)</span>
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขโปรโมชั่น' : 'เพิ่มโปรโมชั่น', body, 'lg');
    bindImageUpload('image');
}

function savePromo(e, id) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    data.featured = !!fd.get('featured');
    data.image = document.querySelector('[data-img-field="image"]')?.dataset.value || '';
    upsert('promotions', data, id);
    return false;
}

/* ============================================================
   ARTICLES
============================================================ */
SECTION_RENDERERS.articles = function () {
    const items = load('articles');
    const tbody = document.getElementById('articlesTableBody');
    if (!tbody) return;
    const search = document.getElementById('articleSearch')?.value.trim() || '';
    const filtered = applyFilter(items, search, ['title', 'category', 'author', 'tags']);
    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">${items.length ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีบทความ'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(a => `
        <tr>
            <td><strong>${escapeHtml(a.title)}</strong>${a.featured ? ' <i class="fas fa-star" style="color:#ffd700"></i>' : ''}<br><small class="text-muted">${escapeHtml(a.slug || '')}</small></td>
            <td>${escapeHtml(a.categoryLabel || a.category || '-')}</td>
            <td>${escapeHtml(a.author || '-')}</td>
            <td>${escapeHtml(a.dateDisplay || formatDate(a.date))}</td>
            <td><span class="status-badge status-${a.status === 'draft' ? 'pending' : 'active'}">${getStatusText(a.status || 'published')}</span></td>
            <td>
                <div class="table-actions">
                    <a class="btn-action btn-view" href="/article?slug=${encodeURIComponent(a.slug || '')}" target="_blank" title="ดู"><i class="fas fa-eye"></i></a>
                    <button class="btn-action btn-edit" onclick="formArticle(${a.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('articles',${a.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formArticle(id = null) {
    const item = id ? load('articles').find(a => a.id === id) : null;
    const cats = [
        { v: 'treatment', l: 'บทความการรักษา' },
        { v: 'innovation', l: 'นวัตกรรม' },
        { v: 'skincare', l: 'การดูแลผิว' },
        { v: 'beauty-tips', l: 'เคล็ดลับความงาม' }
    ];
    const body = `
        <form id="resourceForm" onsubmit="return saveArticle(event, ${id || 'null'})">
            <div class="form-group">
                <label class="form-label">ชื่อบทความ *</label>
                <input class="form-control" name="title" required value="${escapeHtml(item?.title || '')}" id="articleTitle">
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">Slug (URL) *</label>
                    <input class="form-control" name="slug" required value="${escapeHtml(item?.slug || '')}" id="articleSlug">
                </div>
                <div class="form-group">
                    <label class="form-label">ผู้เขียน</label>
                    <input class="form-control" name="author" value="${escapeHtml(item?.author || 'ทีมแพทย์ DR.DEN Clinic')}">
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">หมวดหมู่ *</label>
                    <select class="form-control" name="category" required onchange="this.form.categoryLabel.value=this.options[this.selectedIndex].dataset.label">
                        ${cats.map(c => `<option value="${c.v}" data-label="${c.l}" ${item?.category === c.v ? 'selected' : ''}>${c.l}</option>`).join('')}
                    </select>
                    <input type="hidden" name="categoryLabel" value="${item?.categoryLabel || cats[0].l}">
                </div>
                <div class="form-group">
                    <label class="form-label">วันที่แสดง</label>
                    <input class="form-control" name="dateDisplay" value="${escapeHtml(item?.dateDisplay || '')}" placeholder="30 เมษายน 2026">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Excerpt (เกริ่นนำ)</label>
                <textarea class="form-control" name="excerpt" rows="2">${escapeHtml(item?.excerpt || '')}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Meta Description (SEO)</label>
                <textarea class="form-control" name="metaDescription" rows="2" maxlength="170">${escapeHtml(item?.metaDescription || '')}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Tags (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
                <input class="form-control" name="tags" value="${escapeHtml(Array.isArray(item?.tags) ? item.tags.join(', ') : (item?.tags || ''))}">
            </div>
            ${imageUploadField('image', item?.image)}
            <div class="form-group">
                <label class="form-label">เนื้อหา (HTML)</label>
                <textarea class="form-control" name="content" rows="12" style="font-family:monospace;font-size:.9rem;">${escapeHtml(item?.content || '')}</textarea>
                <small class="text-muted">รองรับ HTML — สามารถใส่ &lt;h2&gt;, &lt;p&gt;, &lt;img&gt;, &lt;ul&gt; ฯลฯ</small>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">เวลาอ่าน</label>
                    <input class="form-control" name="readTime" value="${escapeHtml(item?.readTime || '5 นาที')}">
                </div>
                <div class="form-group">
                    <label class="form-label">สถานะ</label>
                    <select class="form-control" name="status">
                        <option value="published" ${item?.status !== 'draft' ? 'selected' : ''}>เผยแพร่</option>
                        <option value="draft" ${item?.status === 'draft' ? 'selected' : ''}>ฉบับร่าง</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="featured" ${item?.featured ? 'checked' : ''}>
                    <span>เด่น (Featured) — แสดงด้านบนในหน้าบทความ</span>
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขบทความ' : 'เพิ่มบทความ', body, 'xl');
    bindImageUpload('image');

    // auto-slug from title
    const titleInput = document.getElementById('articleTitle');
    const slugInput = document.getElementById('articleSlug');
    if (titleInput && slugInput && !id) {
        titleInput.addEventListener('input', () => { slugInput.value = slugify(titleInput.value); });
    }
}

function saveArticle(e, id) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    data.featured = !!fd.get('featured');
    data.tags = data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : [];
    data.image = document.querySelector('[data-img-field="image"]')?.dataset.value || '';
    data.date = data.date || new Date().toISOString().split('T')[0];
    upsert('articles', data, id);
    return false;
}

/* ============================================================
   DOCTORS
============================================================ */
SECTION_RENDERERS.doctors = function () {
    const items = load('doctors');
    const tbody = document.getElementById('doctorsTableBody');
    if (!tbody) return;
    const search = document.getElementById('doctorSearch')?.value.trim() || '';
    const filtered = applyFilter(items, search, ['nickname', 'fullName', 'role', 'license']);
    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">${items.length ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีข้อมูลแพทย์'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(d => `
        <tr>
            <td>${d.image ? `<img src="${escapeHtml(d.image)}" class="cell-thumb" alt="">` : '—'}</td>
            <td><strong>${escapeHtml(d.nickname || d.name || '-')}</strong><br><small class="text-muted">${escapeHtml(d.fullName || '')}</small></td>
            <td>${escapeHtml(d.license || '-')}</td>
            <td>${(d.branches || []).map(b => typeof b === 'string' ? b : b.name).join(', ') || '-'}</td>
            <td>${d.featured ? '<i class="fas fa-star" style="color:#ffd700"></i>' : '—'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="formDoctor(${d.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('doctors',${d.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formDoctor(id = null) {
    const item = id ? load('doctors').find(d => d.id === id) : null;
    const allBranches = ['Paragon', 'Nirvana', 'FXC Clinic'];
    const allSpecs = ['dermatology', 'aesthetic', 'antiaging', 'laser', 'surgery'];
    const branches = (item?.branches || []).map(b => typeof b === 'string' ? b : b.name);
    const body = `
        <form id="resourceForm" onsubmit="return saveDoctor(event, ${id || 'null'})">
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">ชื่อเล่น *</label>
                    <input class="form-control" name="nickname" required value="${escapeHtml(item?.nickname || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">ใบประกอบวิชาชีพ</label>
                    <input class="form-control" name="license" value="${escapeHtml(item?.license || '')}" placeholder="ว.xxxxx">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">ชื่อ-นามสกุล *</label>
                <input class="form-control" name="fullName" required value="${escapeHtml(item?.fullName || '')}">
            </div>
            <div class="form-group">
                <label class="form-label">ตำแหน่ง</label>
                <input class="form-control" name="role" value="${escapeHtml(item?.role || '')}" placeholder="เช่น ผู้อำนวยการคลินิก">
            </div>
            <div class="form-group">
                <label class="form-label">ประสบการณ์</label>
                <input class="form-control" name="experience" value="${escapeHtml(item?.experience || '')}" placeholder="เช่น 5+ ปี">
            </div>
            <div class="form-group">
                <label class="form-label">สาขาที่ประจำ</label>
                <div class="checkbox-grid">
                    ${allBranches.map(b => `<label class="checkbox-label"><input type="checkbox" name="branch_${b}" ${branches.includes(b) ? 'checked' : ''}><span>${b}</span></label>`).join('')}
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">ความเชี่ยวชาญ</label>
                <div class="checkbox-grid">
                    ${allSpecs.map(s => `<label class="checkbox-label"><input type="checkbox" name="spec_${s}" ${(item?.specialties || []).includes(s) ? 'checked' : ''}><span>${s}</span></label>`).join('')}
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">ประวัติย่อ (Bio)</label>
                <textarea class="form-control" name="bio">${escapeHtml(item?.bio || '')}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">การศึกษา (บรรทัดละ 1 รายการ)</label>
                <textarea class="form-control" name="education" rows="3">${escapeHtml((item?.education || []).join('\n'))}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">หัตถการที่เชี่ยวชาญ (คั่นด้วย ,)</label>
                <input class="form-control" name="expertise" value="${escapeHtml((item?.expertise || []).join(', '))}">
            </div>
            ${imageUploadField('image', item?.image)}
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="featured" ${item?.featured ? 'checked' : ''}>
                    <span>แสดงเป็นแพทย์เด่น</span>
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขแพทย์' : 'เพิ่มแพทย์', body, 'lg');
    bindImageUpload('image');
}

function saveDoctor(e, id) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    const allBranches = ['Paragon', 'Nirvana', 'FXC Clinic'];
    const allSpecs = ['dermatology', 'aesthetic', 'antiaging', 'laser', 'surgery'];
    const classMap = { Paragon: 'paragon', Nirvana: 'nirvana', 'FXC Clinic': 'fxc' };
    data.branches = allBranches.filter(b => fd.get(`branch_${b}`)).map(name => ({ name, class: classMap[name] }));
    data.specialties = allSpecs.filter(s => fd.get(`spec_${s}`));
    allBranches.forEach(b => delete data[`branch_${b}`]);
    allSpecs.forEach(s => delete data[`spec_${s}`]);
    data.education = (data.education || '').split('\n').map(s => s.trim()).filter(Boolean);
    data.expertise = (data.expertise || '').split(',').map(s => s.trim()).filter(Boolean);
    data.featured = !!fd.get('featured');
    data.image = document.querySelector('[data-img-field="image"]')?.dataset.value || '';
    upsert('doctors', data, id);
    return false;
}

/* ============================================================
   BRANCHES
============================================================ */
SECTION_RENDERERS.branches = function () {
    const items = load('branches');
    const tbody = document.getElementById('branchesTableBody');
    if (!tbody) return;
    const search = document.getElementById('branchSearch')?.value.trim() || '';
    const filtered = applyFilter(items, search, ['name', 'brand', 'location', 'region', 'phoneDisplay']);
    if (!filtered.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">${items.length ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีข้อมูลสาขา'}</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(b => `
        <tr>
            <td><strong>${escapeHtml(b.name)}</strong><br><small class="text-muted">${escapeHtml(b.brand || '')}</small></td>
            <td>${escapeHtml(b.region || '-')}</td>
            <td>${escapeHtml(b.location || '-')}</td>
            <td>${escapeHtml(b.phoneDisplay || b.phone || '-')}</td>
            <td>${escapeHtml(b.lineId || '-')}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action btn-edit" onclick="formBranch(${b.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('branches',${b.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('');
};

function formBranch(id = null) {
    const item = id ? load('branches').find(b => b.id === id) : null;
    const brands = ['Paragon Clinic', 'Nirvana Clinic', 'FXC Clinic'];
    const regions = ['ภาคเหนือ', 'ภาคกลาง', 'ภาคอีสาน', 'ภาคใต้', 'กรุงเทพฯ'];
    const body = `
        <form id="resourceForm" onsubmit="return saveBranch(event, ${id || 'null'})">
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">ชื่อสาขา *</label>
                    <input class="form-control" name="name" required value="${escapeHtml(item?.name || '')}" placeholder="สาขาพิษณุโลก">
                </div>
                <div class="form-group">
                    <label class="form-label">รหัส (id)</label>
                    <input class="form-control" name="code" value="${escapeHtml(item?.code || '')}" placeholder="pl">
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">แบรนด์</label>
                    <select class="form-control" name="brand">
                        ${brands.map(b => `<option value="${b}" ${item?.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">ภูมิภาค</label>
                    <select class="form-control" name="region">
                        ${regions.map(r => `<option value="${r}" ${item?.region === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">ที่อยู่ / Location</label>
                <input class="form-control" name="location" value="${escapeHtml(item?.location || '')}" placeholder="อำเภอเมือง, พิษณุโลก">
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">เบอร์โทร *</label>
                    <input class="form-control" name="phoneDisplay" required value="${escapeHtml(item?.phoneDisplay || '')}" placeholder="065-223-9942">
                </div>
                <div class="form-group">
                    <label class="form-label">เวลาทำการ</label>
                    <input class="form-control" name="hours" value="${escapeHtml(item?.hours || 'จันทร์-อาทิตย์ 10:00-20:00 น.')}">
                </div>
            </div>
            <div class="form-grid-2">
                <div class="form-group">
                    <label class="form-label">LINE URL</label>
                    <input class="form-control" name="line" value="${escapeHtml(item?.line || '')}" placeholder="https://lin.ee/...">
                </div>
                <div class="form-group">
                    <label class="form-label">LINE ID</label>
                    <input class="form-control" name="lineId" value="${escapeHtml(item?.lineId || '')}" placeholder="@xxx">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Facebook URL</label>
                <input class="form-control" name="facebook" value="${escapeHtml(item?.facebook || '')}">
            </div>
            <div class="form-group">
                <label class="form-label">Badge (เช่น สาขาหลัก)</label>
                <input class="form-control" name="badge" value="${escapeHtml(item?.badge || '')}">
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> บันทึก</button>
            </div>
        </form>`;
    openModal(id ? 'แก้ไขสาขา' : 'เพิ่มสาขา', body, 'lg');
}

function saveBranch(e, id) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.phone = (data.phoneDisplay || '').replace(/\D/g, '');
    const classMap = { 'Paragon Clinic': 'paragon', 'Nirvana Clinic': 'nirvana', 'FXC Clinic': 'fxc' };
    data.brandClass = classMap[data.brand] || '';
    upsert('branches', data, id);
    return false;
}

/* ============================================================
   GENERIC UPSERT / DELETE
============================================================ */
function upsert(key, data, id) {
    const list = load(key);
    if (id) {
        const i = list.findIndex(x => x.id === id);
        if (i >= 0) list[i] = { ...list[i], ...data, id };
    } else {
        list.push({ id: Date.now(), ...data });
    }
    save(key, list);
    closeModal();
    SECTION_RENDERERS[key]?.();
    SECTION_RENDERERS.dashboard();
    toast(id ? 'บันทึกการแก้ไขแล้ว' : 'เพิ่มข้อมูลแล้ว');
}

async function deleteItem(key, id) {
    if (!await confirmAction(`ต้องการลบรายการนี้?`)) return;
    const list = load(key).filter(x => x.id !== id);
    save(key, list);
    SECTION_RENDERERS[key]?.();
    SECTION_RENDERERS.dashboard();
    toast('ลบรายการแล้ว');
}

/* ============================================================
   IMAGE UPLOAD WIDGET
============================================================ */
function imageUploadField(name, current) {
    return `
        <div class="form-group">
            <label class="form-label">รูปภาพ</label>
            <div class="image-upload-box" data-img-field="${name}" data-value="${escapeHtml(current || '')}">
                <div class="image-preview">
                    ${current ? `<img src="${escapeHtml(current)}" alt="">` : '<i class="fas fa-image"></i><span>ยังไม่มีรูปภาพ</span>'}
                </div>
                <div class="image-actions">
                    <input type="file" id="imgFile_${name}" accept="image/*" hidden>
                    <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('imgFile_${name}').click()"><i class="fas fa-upload"></i> อัปโหลด</button>
                    <input class="form-control" type="text" id="imgUrl_${name}" placeholder="หรือใส่ URL รูปภาพ" value="${escapeHtml(current || '')}">
                    <button type="button" class="btn btn-outline btn-sm" onclick="setImageFromUrl('${name}')">ใช้ URL</button>
                    ${current ? `<button type="button" class="btn btn-danger btn-sm" onclick="clearImage('${name}')"><i class="fas fa-times"></i></button>` : ''}
                </div>
            </div>
        </div>`;
}

function bindImageUpload(name) {
    const input = document.getElementById(`imgFile_${name}`);
    if (!input) return;
    input.addEventListener('change', async () => {
        if (!input.files[0]) return;
        try {
            const url = await fileToCompressedDataURL(input.files[0]);
            setImage(name, url);
        } catch { toast('อ่านไฟล์รูปไม่ได้', 'error'); }
    });
}

function setImage(name, url) {
    const box = document.querySelector(`[data-img-field="${name}"]`);
    if (!box) return;
    box.dataset.value = url;
    box.querySelector('.image-preview').innerHTML = `<img src="${url}" alt="">`;
    document.getElementById(`imgUrl_${name}`).value = url.startsWith('data:') ? '' : url;
}

function setImageFromUrl(name) {
    const url = document.getElementById(`imgUrl_${name}`)?.value.trim();
    if (!url) return toast('กรุณาใส่ URL', 'error');
    setImage(name, url);
}

function clearImage(name) {
    const box = document.querySelector(`[data-img-field="${name}"]`);
    if (!box) return;
    box.dataset.value = '';
    box.querySelector('.image-preview').innerHTML = '<i class="fas fa-image"></i><span>ยังไม่มีรูปภาพ</span>';
    document.getElementById(`imgUrl_${name}`).value = '';
}

/* ============================================================
   SETTINGS — IMPORT / EXPORT / SEED / PASSWORD
============================================================ */
function exportData() {
    const data = { exportDate: new Date().toISOString() };
    ['reviews', 'services', 'promotions', 'articles', 'doctors', 'branches'].forEach(k => data[k] = load(k));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drden-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('ส่งออกข้อมูลสำเร็จ');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json';
    input.onchange = async e => {
        const file = e.target.files[0]; if (!file) return;
        try {
            const data = JSON.parse(await file.text());
            if (!await confirmAction('ต้องการนำเข้าข้อมูล? ข้อมูลปัจจุบันจะถูกแทนที่')) return;
            ['reviews', 'services', 'promotions', 'articles', 'doctors', 'branches'].forEach(k => {
                if (Array.isArray(data[k])) save(k, data[k]);
            });
            toast('นำเข้าข้อมูลสำเร็จ');
            setTimeout(() => location.reload(), 600);
        } catch { toast('ไฟล์ไม่ถูกต้อง', 'error'); }
    };
    input.click();
}

async function clearAllData() {
    if (!await confirmAction('ต้องการลบข้อมูลทั้งหมด? การกระทำนี้ย้อนกลับไม่ได้!')) return;
    if (!await confirmAction('ยืนยันอีกครั้ง — ข้อมูลทั้งหมดจะถูกลบจริง!')) return;
    ['reviews', 'services', 'promotions', 'articles', 'doctors', 'branches', 'activities'].forEach(k => localStorage.removeItem(KEY(k)));
    toast('ลบข้อมูลทั้งหมดแล้ว');
    setTimeout(() => location.reload(), 600);
}

async function seedFromWebsite() {
    if (!await confirmAction('ดึงข้อมูลจากเว็บไซต์ปัจจุบันมาแสดงใน admin? ข้อมูลเดิมจะถูกแทนที่')) return;
    let count = 0;
    const fetchAndEval = async (url, varName) => {
        try {
            const res = await fetch(url);
            const text = await res.text();
            const fn = new Function(`${text}\nreturn typeof ${varName}!=='undefined'?${varName}:null;`);
            return fn();
        } catch { return null; }
    };
    const reviews = await fetchAndEval('/reviews-data.js', 'REVIEWS_DATA');
    if (reviews) { save('reviews', reviews); count++; }
    const articles = await fetchAndEval('/articles-data.js', 'ARTICLES_DATA');
    if (articles) { save('articles', articles); count++; }
    const promos = await fetchAndEval('/promotions-data.js', 'PROMOTIONS_DATA');
    if (promos) { save('promotions', promos); count++; }
    const doctors = await fetchAndEval('/doctors-data.js', 'DOCTORS_DATA');
    if (doctors) { save('doctors', doctors); count++; }
    const branches = await fetchAndEval('/branch-contact.js', 'BRANCHES_CONTACT');
    if (branches) { save('branches', branches); count++; }
    toast(`ดึงข้อมูลสำเร็จ ${count} แหล่ง`);
    setTimeout(() => location.reload(), 800);
}

function downloadJSFile(key, varName, filename) {
    const data = load(key);
    if (!data.length) return toast('ยังไม่มีข้อมูลให้ดาวน์โหลด', 'error');
    const content = `// Generated by DR.DEN Admin — ${new Date().toLocaleString('th-TH')}\nconst ${varName} = ${JSON.stringify(data, null, 2)};\n`;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    toast(`ดาวน์โหลด ${filename} สำเร็จ`);
}

/* ----- Password change ----- */
async function changePassword(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const cur = fd.get('current');
    const next = fd.get('next');
    const confirm = fd.get('confirm');
    if (!cur || !next) return toast('กรุณากรอกข้อมูลให้ครบ', 'error');
    if (next.length < 6) return toast('รหัสผ่านใหม่ต้อง ≥ 6 ตัวอักษร', 'error');
    if (next !== confirm) return toast('รหัสผ่านใหม่ไม่ตรงกัน', 'error');
    const ok = await adminLogin(ADMIN_USERNAME, cur);
    if (!ok) return toast('รหัสผ่านปัจจุบันไม่ถูกต้อง', 'error');
    const newHash = await sha256Hex(next);
    localStorage.setItem('drden_admin_pwd_override', newHash);
    e.target.reset();
    toast('เปลี่ยนรหัสผ่านสำเร็จ! (เก็บไว้ในเบราว์เซอร์นี้)');
    return false;
}

/* ============================================================
   INITIALIZATION
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();

    // Modal close
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('adminModal')?.addEventListener('click', e => {
        if (e.target.id === 'adminModal') closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Add buttons
    document.getElementById('addReviewBtn')?.addEventListener('click', () => formReview());
    document.getElementById('addServiceBtn')?.addEventListener('click', () => formService());
    document.getElementById('addPromotionBtn')?.addEventListener('click', () => formPromo());
    document.getElementById('addArticleBtn')?.addEventListener('click', () => formArticle());
    document.getElementById('addDoctorBtn')?.addEventListener('click', () => formDoctor());
    document.getElementById('addBranchBtn')?.addEventListener('click', () => formBranch());

    // Search inputs (debounced)
    [
        ['reviewSearch', 'reviews'],
        ['serviceSearch', 'services'],
        ['promoSearch', 'promotions'],
        ['articleSearch', 'articles'],
        ['doctorSearch', 'doctors'],
        ['branchSearch', 'branches']
    ].forEach(([inputId, key]) => {
        document.getElementById(inputId)?.addEventListener('input', debounce(() => SECTION_RENDERERS[key]?.()));
    });
    document.getElementById('reviewCatFilter')?.addEventListener('change', () => SECTION_RENDERERS.reviews());

    // Settings
    document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
    document.getElementById('importDataBtn')?.addEventListener('click', importData);
    document.getElementById('clearDataBtn')?.addEventListener('click', clearAllData);
    document.getElementById('seedDataBtn')?.addEventListener('click', seedFromWebsite);
    document.getElementById('passwordForm')?.addEventListener('submit', changePassword);

    // Download JS
    document.querySelectorAll('[data-export-js]').forEach(btn => {
        btn.addEventListener('click', () => {
            const k = btn.dataset.exportJs;
            const map = {
                reviews: ['REVIEWS_DATA', 'reviews-data.js'],
                articles: ['ARTICLES_DATA', 'articles-data.js'],
                promotions: ['PROMOTIONS_DATA', 'promotions-data.js'],
                doctors: ['DOCTORS_DATA', 'doctors-data.js'],
                branches: ['BRANCHES_CONTACT', 'branch-contact.js']
            }[k];
            if (map) downloadJSFile(k, map[0], map[1]);
        });
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        if (await confirmAction('ออกจากระบบ?')) {
            if (typeof adminLogout === 'function') adminLogout();
            else location.replace('/admin/login');
        }
    });

    // Refresh
    document.querySelector('[title="Refresh"]')?.addEventListener('click', () => {
        const active = document.querySelector('.admin-nav-link.active')?.dataset.section || 'dashboard';
        SECTION_RENDERERS[active]?.();
        toast('รีเฟรชแล้ว');
    });

    // Initial render
    SECTION_RENDERERS.dashboard();
});
