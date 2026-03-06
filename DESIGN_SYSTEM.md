# DR.DEN Clinic - Design System & Style Guide

> **เอกสารนี้สำหรับ AI และทีมพัฒนา** เพื่อใช้เป็นแนวทางในการสร้างหน้าใหม่หรือปรับปรุงหน้าเดิมให้สอดคล้องกับ CI และ Style ของเว็บไซต์

**Last Updated:** February 11, 2026  
**Version:** 2.0 (CSS Optimization Update)

---

## 📋 CSS Architecture Updates

### ✅ Consolidated Classes (ใช้แทนกัน)

#### Stats Display
- **ใช้:** `.page-stats` สำหรับทุกหน้า
- **ลบแล้ว:** `.header-stats` (merged into `.page-stats`)
- **Structure:**
  ```html
  <div class="page-stats">
      <div class="stat">
          <h3 class="stat-number">10+</h3>
          <p class="stat-label">ปีประสบการณ์</p>
      </div>
  </div>
  ```

#### Card Components
- **Base Class:** `.card-base` (สำหรับ extend)
- **Specific Classes:** `.service-card`, `.doctor-card`, `.article-card`, etc.
- **All cards include:** `transition: transform 0.1s ease-out !important;`

### 🎯 Global Utility Classes

#### Stats (ตัวเลขสำคัญ)
```css
.stat-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800 !important;
    color: #ffd700 !important;  /* Gold color */
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.stat-label {
    font-size: 1.1rem;
    color: #1a1a1a !important;  /* Near black for contrast */
    font-weight: 700 !important;
    letter-spacing: 0.5px;
}
```

**⚠️ Important:** ไม่ใช้ `text-shadow` บน stats อีกต่อไป

---

## 🎨 Brand Identity (CI)

### Logo & Brand Name
- **Brand Name:** `DR.DEN`
- **Subtitle:** `AESTHETIC CLINIC` (English) / `คลินิกหมอเด่น` (Thai)
- **Logo Icon:** ดาวสีขาวในกล่องสี่เหลี่ยมมุมมนพื้นทอง
- **Logo Structure:**
  ```html
  <div class="logo-icon">
      <i class="fas fa-star"></i>
  </div>
  <div class="logo-text">
      <h1>DR.<span>DEN</span></h1>
      <p class="logo-subtitle">Aesthetic Clinic</p>
  </div>
  ```

---

## 🎨 Color Palette

### Primary Colors (สีหลัก - ทอง)
```css
--primary-color: #ffd700;      /* Gold - ทองสด */
--primary-dark: #ffb300;       /* Dark Gold - ทองเข้ม */
--primary-light: #ffeb3b;      /* Light Gold - ทองอ่อน */
--secondary-color: #ffc107;    /* Amber Gold */
--accent-color: #ff9800;       /* Orange Accent */
```

### Neutrals (สีกลาง)
```css
--dark-bg: #1a1a2e;           /* Background เข้ม */
--dark-text: #2c3e50;         /* Text หลักเข้ม */
--text-color: #2c3e50;        /* Text สีเทาเข้ม */
--text-secondary: #555555;    /* Text รอง */
--light-bg: #ffffff;          /* พื้นขาว */
--light-gray: #f8f9fa;        /* พื้นอ่อน */
--medium-gray: #e0e0e0;       /* Border, Divider */
--text-gray: #6c757d;         /* Text อ่อน */
```

### Gradients (ไล่สี)
```css
--gradient-primary: linear-gradient(135deg, #ffd700 0%, #ffb300 100%);
--gradient-secondary: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
--gradient-gold: linear-gradient(135deg, #fff176 0%, #ffd54f 100%);
```

### Usage Guidelines
- **ตัวเลขสำคัญ (Stats):** ใช้ `#ffd700` (gold) + text-shadow
- **Headings:** ใช้ `--text-color` (#2c3e50)
- **Body Text:** ใช้ `--text-secondary` (#555555)
- **Buttons Primary:** ใช้ `--gradient-primary`
- **Hover States:** ใช้ `--accent-color` หรือ lighter shade

---

## 📝 Typography

### Font Family
```css
font-family: 'Prompt', sans-serif;
```
**Font Weights Used:**
- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-bold)
- 700 (Bold)
- 800 (Extra-bold)

### Heading Sizes
```css
h1: 2.5rem - 3.5rem (clamp responsive)
h2: 2rem - 2.5rem
h3: 1.5rem - 1.75rem
h4: 1.25rem
```

### Body Text
```css
Body: 1rem (16px)
Small: 0.875rem - 0.9375rem
Tiny: 0.75rem - 0.8rem
```

### Text Styles

#### Page Title
```css
.page-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--text-color);
    line-height: 1.2;
}
```

#### Section Title
```css
.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--dark-text);
    margin-bottom: 1rem;
}
```

#### Stat Numbers (ตัวเลขสถิติ)
```css
.stat-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: #ffd700;
    text-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        0 0 10px rgba(255, 215, 0, 0.4);
}
```

#### Stat Labels
```css
.stat-label {
    font-size: 1.1rem;
    color: #1a1a1a;
    font-weight: 700;
    text-shadow: 
        1px 1px 3px rgba(255, 255, 255, 0.8),
        0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## 🎯 Components

### Section Badge
```html
<span class="section-badge">รีวิวจากลูกค้า</span>
```
```css
.section-badge {
    display: inline-block;
    padding: 0.625rem 1.75rem;
    background: var(--gradient-primary);
    color: white;
    border-radius: 30px;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}
```

### Buttons

#### Primary Button
```html
<a href="#" class="btn btn-primary">
    <i class="fas fa-calendar-check"></i>
    จองคิวเลย
</a>
```
```css
.btn-primary {
    background: var(--gradient-primary);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}
```

#### Outline Button
```css
.btn-outline {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
}
```

### Cards

#### Service Card
```css
.service-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
    border-color: var(--primary-color);
}
```

### Filter Buttons
```css
.filter-btn-enhanced {
    padding: 0.875rem 1.75rem;
    background: white;
    border: 2px solid var(--medium-gray);
    border-radius: 30px;
    font-weight: 600;
    color: var(--dark-text);
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn-enhanced.active {
    background: var(--gradient-primary);
    color: white;
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}
```

---

## 📐 Spacing & Layout

### Container
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
```

### Section Padding
```css
section {
    padding: 4rem 0; /* Standard */
    padding: 6rem 0; /* Large */
}
```

### Spacing Variables
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 2rem;
--spacing-lg: 4rem;
--spacing-xl: 6rem;
```

### Grid Patterns
```css
/* 3 Columns */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

/* 2 Columns */
.two-col-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
}
```

---

## 🎭 Effects & Animations

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 30px;
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.2);

/* Gold Shadow for hover */
box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
```

### Transitions
```css
--transition-fast: 0.2s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Hover Effects

#### Card Hover
```css
.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
    border-color: var(--primary-color);
}
```

#### Button Hover
```css
.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}
```

### 3D Tilt Effect
```javascript
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones, less than 480px) */
@media (max-width: 480px) { }

/* Medium devices (tablets, 768px and down) */
@media (max-width: 768px) { }

/* Large devices (desktops, 992px and down) */
@media (max-width: 992px) { }

/* Extra large devices (large desktops, 1200px and down) */
@media (max-width: 1200px) { }
```

### Mobile Adjustments
- Font sizes: ใช้ `clamp()` สำหรับ responsive
- Padding: ลดเหลือ 50-70% ของ desktop
- Grid columns: เปลี่ยนเป็น 1 column
- Button sizes: ขยายเป็น full-width

---

## 🎪 Page Headers

### Standard Page Header
```html
<section class="page-header">
    <div class="container">
        <div class="page-header-content">
            <span class="section-badge">รีวิวจากลูกค้า</span>
            <h1 class="page-title">
                เคสปรับรูปหน้าจริง<br>
                กว่า <span class="gradient-text">10,000+</span> เคส
            </h1>
            <p class="page-description">
                ความพึงพอใจของลูกค้าคือความสำเร็จของเรา
            </p>
            <div class="page-stats">
                <div class="stat">
                    <h3 class="stat-number">10,000+</h3>
                    <p class="stat-label">เคสความสำเร็จ</p>
                </div>
                <!-- More stats -->
            </div>
        </div>
    </div>
</section>
```

```css
.page-header {
    padding: 120px 0 80px;
    background: linear-gradient(135deg, #fff9e6 0%, #fffef0 50%, #ffffff 100%);
    position: relative;
    overflow: hidden;
}
```

---

## 🌈 Background Patterns

### Light Cream Background
```css
background: linear-gradient(135deg, #fff9e6 0%, #fffef0 50%, #ffffff 100%);
```

### White with Gradient
```css
background: linear-gradient(180deg, #f8f9fa 0%, white 50%, #f8f9fa 100%);
```

### Gold Gradient (Doctors Page - แก้ไขเป็นทองแล้ว)
```css
background: linear-gradient(135deg, 
    var(--primary-color) 0%,
    var(--accent-color) 50%,
    #ff9800 100%);
```

---

## ✅ Quality Checklist สำหรับหน้าใหม่

เมื่อสร้างหน้าใหม่ ตรวจสอบว่า:

- [ ] ใช้สีทอง (#ffd700) เป็นสีหลัก
- [ ] Logo ใช้ DR.DEN พร้อมไอคอนดาว
- [ ] ตัวเลข stats ใช้สีทอง (#ffd700) + text-shadow
- [ ] Label ใช้สีดำเข้ม (#1a1a1a)
- [ ] Buttons ใช้ gradient-primary
- [ ] Cards มี hover effect (translateY + shadow)
- [ ] Font เป็น 'Prompt'
- [ ] Border radius เป็นมุมมน (20px - 30px)
- [ ] Responsive ทุกหน้าจอ
- [ ] มี component header/footer ที่ load จาก components/
- [ ] Section badge เป็นสีทองพื้นขาว text
- [ ] Filter buttons active state เป็นสีทอง

---

## 📂 File Structure

```
c:\DrdenWebsite\
├── index.html              # หน้าหลัก
├── reviews.html            # หน้ารีวิว
├── services.html           # หน้าบริการ
├── promotions.html         # หน้าโปรโมชั่น
├── doctors.html            # หน้าแพทย์
├── styles.css              # CSS หลัก (4600+ lines)
├── script.js               # JavaScript หลัก
├── components.js           # Component loader
├── reviews.js              # Reviews functionality
├── services.js             # Services functionality
├── promotions.js           # Promotions functionality
├── doctors.js              # Doctors functionality
├── components/
│   ├── header.html         # Header component
│   └── footer.html         # Footer component
└── DESIGN_SYSTEM.md        # เอกสารนี้
```

---

## 🚀 Quick Reference

### สร้างหน้าใหม่
1. Copy structure จาก reviews.html หรือ services.html
2. เปลี่ยน page-header background ตามธีม
3. ใช้สีทอง (#ffd700) สำหรับ stats และ highlights
4. ใช้ gradient-primary สำหรับ buttons
5. เพิ่ม component placeholders สำหรับ header/footer
6. สร้าง .js file สำหรับ functionality
7. Test responsive ทุกขนาดหน้าจอ

### ปรับปรุงหน้าเดิม
1. ตรวจสอบสีให้ตรงกับ CI (ทอง)
2. ตรวจสอบ hover effects
3. ตรวจสอบ text contrast (ต้องไม่กลืนพื้น)
4. ตรวจสอบ responsive
5. ตรวจสอบ component consistency

---

**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Maintained by:** Development Team
