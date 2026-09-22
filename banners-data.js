/* ============================================================
   HERO BANNERS — homepage slider data
   จัดการผ่านหน้า Admin → "แบนเนอร์หน้าเว็บ"
   แก้ไขในแอดมิน แล้ว Export ทับไฟล์นี้เพื่อเผยแพร่จริง
   Schema: { id, image, alt, link, status, order }
============================================================ */
const HERO_BANNERS = [
    {
        id: 1,
        image: "assets/images/blog/Craft-vector/Craft vector-01.jpg",
        alt: "Craft Vector Technique ศาสตร์แห่งการยกหน้าโดยหมอเด่น",
        link: "article.html?slug=craft-vector-technique",
        status: "active",
        order: 1
    }
];

/* ----- Slider state ----- */
let currentSlide = 0;
let heroSlides = [];
let heroDots = [];
let heroTimer = null;

function getActiveBanners() {
    return HERO_BANNERS
        .filter(b => b.status !== "inactive" && b.image)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function escAttr(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function renderHeroBanner() {
    const slider = document.querySelector(".hero-banner .hero-banner-slider");
    const dotsWrap = document.querySelector(".hero-banner .slider-dots");
    const prevBtn = document.querySelector(".hero-banner .prev-btn");
    const nextBtn = document.querySelector(".hero-banner .next-btn");
    if (!slider) return;

    const banners = getActiveBanners();
    slider.innerHTML = banners.map((b, i) => {
        const img = `<img src="${escAttr(b.image)}" alt="${escAttr(b.alt || "Banner " + (i + 1))}" class="slide-image">`;
        const inner = b.link ? `<a href="${escAttr(b.link)}" class="slide-link">${img}</a>` : img;
        return `<div class="hero-banner-slide${i === 0 ? " active" : ""}">${inner}</div>`;
    }).join("");

    if (dotsWrap) {
        dotsWrap.innerHTML = banners.map((_, i) =>
            `<span class="dot${i === 0 ? " active" : ""}" onclick="goToSlide(${i})"></span>`
        ).join("");
    }

    // Hide controls when only one (or no) banner
    const multi = banners.length > 1;
    [prevBtn, nextBtn, dotsWrap].forEach(el => {
        if (el) el.style.display = multi ? "" : "none";
    });

    initHeroSlider();
}

function initHeroSlider() {
    heroSlides = document.querySelectorAll(".hero-banner .hero-banner-slide");
    heroDots = document.querySelectorAll(".hero-banner .slider-dots .dot");
    currentSlide = 0;
    if (heroTimer) clearInterval(heroTimer);
    if (heroSlides.length > 1) {
        heroTimer = setInterval(() => changeSlide(1), 5000);
    }
}

function showSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (heroDots[i]) heroDots[i].classList.remove("active");
    });
    if (index >= heroSlides.length) currentSlide = 0;
    if (index < 0) currentSlide = heroSlides.length - 1;
    heroSlides[currentSlide].classList.add("active");
    if (heroDots[currentSlide]) heroDots[currentSlide].classList.add("active");
}

function changeSlide(direction) {
    if (!heroSlides.length) return;
    currentSlide += direction;
    if (currentSlide >= heroSlides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = heroSlides.length - 1;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

/* ----- Touch / swipe support ----- */
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const slider = document.querySelector(".hero-banner .hero-banner-slider");
        if (!slider) return;
        let startX = 0, startY = 0, isDragging = false;

        slider.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });

        slider.addEventListener("touchend", function (e) {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
                if (diffX > 0) changeSlide(1);
                else changeSlide(-1);
            }
        }, { passive: true });
    });
})();

document.addEventListener("DOMContentLoaded", renderHeroBanner);
