// ============================================
// REVIEWS DATA — แหล่งข้อมูลรีวิวกลาง
// 8 หมวดหมู่: Acne, Botox, Filler, Reset Young, Sculping, Collagen Wave, Juvelook, Ulthera
// ============================================

/** Review category config */
const REVIEW_CATEGORIES = [
    { key: 'all',       label: 'ทั้งหมด',        icon: 'fas fa-th' },
    { key: 'filler',    label: 'Filler',          icon: 'fas fa-syringe' },
    { key: 'botox',     label: 'Botox',           icon: 'fas fa-syringe' },
    { key: 'acne',      label: 'Acne',            icon: 'fas fa-hand-sparkles' },
    { key: 'resetyoung',label: 'Reset Young',     icon: 'fas fa-spa' },
    { key: 'sculping',  label: 'Sculping',        icon: 'fas fa-star-of-life' },
    { key: 'collagen',  label: 'Collagen Wave',   icon: 'fas fa-bolt' },
    { key: 'juvelook',  label: 'Juvelook',        icon: 'fas fa-gem' },
    { key: 'ulthera',   label: 'Ulthera',         icon: 'fas fa-signal' }
];

const REVIEWS_DATA = [

    // ═══════════════════════════════════════════
    // 1. FILLER (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 1,
        image: "assets/images/Reviews/Filler/รีวิว-01-768x768.webp",
        category: "filler",
        title: "ฟิลเลอร์ปรับรูปหน้า",
        shortText: "หน้าเรียว V-Shape สวยงาม ธรรมชาติ",
        fullText: "หน้าเรียว V-Shape สวยงาม ธรรมชาติ แพทย์ฉีดละเอียดมาก ปรึกษาดีมากค่ะ ผลลัพธ์ตรงตามที่ต้องการเลย ไม่บวม ไม่เจ็บ แนะนำเลยค่ะ",
        rating: 5,
        userName: "คุณ อ.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Filler Juvederm | 2 cc",
        showOnHome: true
    },
    {
        id: 2,
        image: "assets/images/Reviews/Filler/รีวิว-02-768x768.webp",
        category: "filler",
        title: "ฟิลเลอร์คาง V-line",
        shortText: "คางเรียวขึ้นมาก รูปหน้าสมส่วน",
        fullText: "คางเรียวขึ้นมาก รูปหน้าสมส่วน ธรรมชาติ ไม่ดูเทียม แพทย์ออกแบบคางให้เข้ากับรูปหน้า สวยมากค่ะ ไม่เจ็บ หายเร็ว ชอบมากค่ะ",
        rating: 5,
        userName: "คุณ จ.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Filler Juvederm Volux | 1 cc"
    },
    {
        id: 3,
        image: "assets/images/Reviews/Filler/รีวิว-03-768x768.webp",
        category: "filler",
        title: "ฟิลเลอร์เติมแก้ม",
        shortText: "แก้มอิ่มขึ้น หน้าดูเด็กลง",
        fullText: "แก้มอิ่มขึ้น หน้าดูเด็กลง สดใส ธรรมชาติมาก ไม่มีก้อน ไม่บวม ฉีดเสร็จหน้าสวยเลย แพทย์ฉีดเบามือมากค่ะ",
        rating: 5,
        userName: "คุณ พ.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Filler Juvederm Voluma | 2 cc"
    },
    {
        id: 4,
        image: "assets/images/Reviews/Filler/รีวิว-04-768x768.webp",
        category: "filler",
        title: "ฟิลเลอร์จมูก",
        shortText: "จมูกโด่งเป็นสัน ธรรมชาติ",
        fullText: "จมูกโด่งเป็นสัน ธรรมชาติ ดูดีมากค่ะ ไม่บาน ไม่ไหล แพทย์ฉีดเก่งมาก ออกแบบทรงจมูกให้เข้ากับรูปหน้า สวยเป๊ะเลยค่ะ",
        rating: 5,
        userName: "คุณ ต.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Filler Juvederm Voluma | 1 cc"
    },

    // ═══════════════════════════════════════════
    // 2. BOTOX (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 5,
        image: "assets/images/Reviews/Botox/รีวิว-29-768x769.webp",
        category: "botox",
        title: "โบท็อกลดริ้วรอย",
        shortText: "หน้าเรียบเนียน ริ้วรอยจางลง",
        fullText: "หน้าเรียบเนียน ริ้วรอยจางลง หน้าผ่องใส ไม่แข็ง ธรรมชาติดี แพทย์ฉีดเก่งมาก จุดที่ฉีดถูกต้อง ผลออกมาดีตามที่ต้องการเลยค่ะ",
        rating: 5,
        userName: "คุณ ล.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Botox Allergan | 50 units",
        showOnHome: true
    },
    {
        id: 6,
        image: "assets/images/Reviews/Botox/รีวิว-30-768x769.webp",
        category: "botox",
        title: "โบท็อกหน้าเรียว",
        shortText: "กรามลดลงเห็นชัด หน้าเรียวขึ้น",
        fullText: "กรามลดลงเห็นชัด หน้าเรียวขึ้นภายใน 2 สัปดาห์ ยิ้มแล้วไม่ดูหน้าใหญ่ แพทย์ฉีดจุดเดียวแต่ได้ผลเต็มที่ ชอบมากค่ะ",
        rating: 5,
        userName: "คุณ ฟ.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Botox Allergan | Jawline 40 units"
    },
    {
        id: 7,
        image: "assets/images/Reviews/Botox/รีวิว-31-768x769.webp",
        category: "botox",
        title: "โบท็อกลดเหงื่อ",
        shortText: "ลดเหงื่อได้ผลจริง ไม่ต้องกังวลอีก",
        fullText: "เหงื่อออกน้อยลงมากเลยค่ะ เมื่อก่อนเหงื่อออกเยอะมาก ตอนนี้ใส่เสื้อสีอ่อนได้สบาย ไม่ต้องกังวลเรื่องคราบเหงื่ออีกแล้วค่ะ แพทย์ฉีดเบามือมาก",
        rating: 5,
        userName: "คุณ น.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Botox Allergan | ลดเหงื่อ"
    },
    {
        id: 8,
        image: "assets/images/Reviews/Botox/รีวิว-32-768x769.webp",
        category: "botox",
        title: "โบท็อกยกคิ้ว",
        shortText: "คิ้วยกขึ้น ตาดูโตสดใส",
        fullText: "คิ้วยกขึ้น ตาดูโตขึ้น สดใสขึ้นมาก แพทย์ฉีดน้อยแต่ได้ผลดี ไม่รู้สึกตึงหรือผิดธรรมชาติเลยค่ะ ทำเสร็จปุ๊บเห็นผลเลย ชอบมากค่ะ",
        rating: 5,
        userName: "คุณ ก.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-syringe",
        treatment: "Botox Allergan | Brow Lift"
    },

    // ═══════════════════════════════════════════
    // 3. ACNE (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 9,
        image: "assets/images/Reviews/Acne/รีวิว-25-768x769.webp",
        category: "acne",
        title: "รักษาสิวและรอยสิว",
        shortText: "หน้าใสขึ้น สิวหายเกลี้ยง",
        fullText: "หน้าใสขึ้น สิวหายเกลี้ยง รอยสิวจางลงมาก ทำมา 3 ครั้งแล้ว ผลลัพธ์ดีมากค่ะ คุ้มค่าที่สุด แพทย์อธิบายรายละเอียด ให้คำแนะนำดูแลผิว",
        rating: 5,
        userName: "คุณ ป.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-hand-sparkles",
        treatment: "รักษาสิว + เลเซอร์รอยสิว",
        showOnHome: true
    },
    {
        id: 10,
        image: "assets/images/Reviews/Acne/รีวิว-26-768x769.webp",
        category: "acne",
        title: "รักษาหลุมสิว",
        shortText: "หลุมสิวตื้นขึ้นมาก ผิวเรียบเนียน",
        fullText: "หลุมสิวตื้นขึ้นมาก ผิวเรียบเนียน ทำมา 4 ครั้งแล้ว เห็นผลชัดเจน แพทย์ใช้เทคนิคเลเซอร์ร่วมกับ Microneedling ผลลัพธ์ดีเกินคาดค่ะ",
        rating: 5,
        userName: "คุณ ด.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-hand-sparkles",
        treatment: "Fractional CO2 + Microneedling"
    },
    {
        id: 11,
        image: "assets/images/Reviews/Acne/รีวิว-27-768x769.webp",
        category: "acne",
        title: "รักษาสิวอักเสบ",
        shortText: "สิวอักเสบยุบภายในสัปดาห์เดียว",
        fullText: "สิวอักเสบยุบภายในสัปดาห์เดียว รอยแดงจางลง ผิวเรียบขึ้นมาก แพทย์จ่ายยาตรงจุด ให้คำแนะนำดี ดูแลต่อเนื่อง",
        rating: 5,
        userName: "คุณ ช.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-hand-sparkles",
        treatment: "รักษาสิว + LED Therapy"
    },
    {
        id: 12,
        image: "assets/images/Reviews/Acne/รีวิว-28-768x769.webp",
        category: "acne",
        title: "รักษารอยดำ รอยแดงจากสิว",
        shortText: "รอยดำจากสิวจางลงมาก",
        fullText: "รอยดำจากสิวจางลงมาก ผิวสม่ำเสมอขึ้น ใสขึ้น แพทย์ใช้เลเซอร์ร่วมกับครีม ได้ผลดีมาก ทำ 3 ครั้งก็เห็นผลแล้วค่ะ",
        rating: 5,
        userName: "คุณ ว.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-hand-sparkles",
        treatment: "Laser + Chemical Peel"
    },

    // ═══════════════════════════════════════════
    // 4. RESET YOUNG (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 13,
        image: "assets/images/Reviews/ResetYoung/รีวิว-05-768x768.webp",
        category: "resetyoung",
        title: "Young Reset+ ผิวเด้งใส",
        shortText: "รีเซ็ตผิวครบวงจร ผิวเด้งใสเหมือนย้อนวัย",
        fullText: "รีเซ็ตผิวครบวงจร ผิวเด้งใสเหมือนย้อนวัย ทำแล้วรู้สึกผิวนุ่มขึ้น สว่างขึ้น ริ้วรอยจางลง แนะนำเลยค่ะ ผลลัพธ์เห็นชัดตั้งแต่ครั้งแรก",
        rating: 5,
        userName: "คุณ ม.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-spa",
        treatment: "Young Reset+ | Full Package",
        showOnHome: true
    },
    {
        id: 14,
        image: "assets/images/Reviews/ResetYoung/รีวิว-06-768x768.webp",
        category: "resetyoung",
        title: "Radiesse ปรับรูปหน้า",
        shortText: "หน้าเรียว กระชับ กระตุ้นคอลลาเจน",
        fullText: "ฉีด Radiesse แล้วหน้ากระชับขึ้นมาก ผิวมีคอลลาเจนเพิ่ม หน้าเรียวขึ้น ไม่ต้องทำอะไรเยอะ ครั้งเดียวอยู่ได้นาน คุ้มค่ามากค่ะ",
        rating: 5,
        userName: "คุณ ร.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-spa",
        treatment: "Radiesse | 1.5 cc"
    },
    {
        id: 15,
        image: "assets/images/Reviews/ResetYoung/รีวิว-07-768x768.webp",
        category: "resetyoung",
        title: "Reset Young รีเซ็ตผิว",
        shortText: "ผิวอ่อนเยาว์ ริ้วรอยจางลง",
        fullText: "ผิวอ่อนเยาว์ขึ้น ริ้วรอยจางลงชัดเจน โปรแกรมนี้ครบเครื่องมาก ทั้ง Booster + เลเซอร์ + สารอาหารบำรุงผิว เห็นผลตั้งแต่ครั้งแรกเลยค่ะ",
        rating: 5,
        userName: "คุณ ส.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-spa",
        treatment: "Reset Young | Full Program"
    },
    {
        id: 16,
        image: "assets/images/Reviews/ResetYoung/รีวิว-08-768x768.webp",
        category: "resetyoung",
        title: "Young Reset+ ชะลอวัย",
        shortText: "ผิวเด้ง กระชับ หน้าอ่อนเยาว์",
        fullText: "ทำมา 2 ครั้งแล้ว ผิวเด้งขึ้นชัด ริ้วรอยจางลง หน้ากระชับขึ้น เพื่อนร่วมงานบอกหน้าดูเด็กลง 5 ปีเลยค่ะ คุ้มค่ามากๆ แนะนำเลย",
        rating: 5,
        userName: "คุณ จ.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-spa",
        treatment: "Young Reset+ | 2 Sessions"
    },

    // ═══════════════════════════════════════════
    // 5. SCULPING (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 17,
        image: "assets/images/Reviews/Sculping/รีวิว-13-768x768.webp",
        category: "sculping",
        title: "Sculptra ปลุกคอลลาเจน",
        shortText: "ปลุกโรงงานคอลลาเจน ผิวอ่อนเยาว์",
        fullText: "ปลุกโรงงานคอลลาเจน ผิวอ่อนเยาว์ หน้าอิ่มฟู ผิวกระชับขึ้นเห็นได้ชัด ทำไป 2 เดือนแล้ว ผลดีมาก ธรรมชาติ ไม่ดูเทียม แนะนำค่ะ",
        rating: 5,
        userName: "คุณ ร.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-star-of-life",
        treatment: "Sculptra | 2 vials",
        showOnHome: true
    },
    {
        id: 18,
        image: "assets/images/Reviews/Sculping/รีวิว-14-768x768.webp",
        category: "sculping",
        title: "Sculptra เติมวอลลุ่ม",
        shortText: "หน้าอิ่มฟู ไม่ตอบ ไม่โทรม",
        fullText: "หน้าอิ่มฟูขึ้นมาก ไม่ตอบ ไม่โทรม คอลลาเจนค่อยๆ เพิ่ม ผลออกมาธรรมชาติสุด ทำ 3 เดือนมาแล้ว ยังอยู่ดี คนทักว่าหน้าดูสดใสขึ้นค่ะ",
        rating: 5,
        userName: "คุณ บ.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-star-of-life",
        treatment: "Sculptra | 3 vials"
    },
    {
        id: 19,
        image: "assets/images/Reviews/Sculping/รีวิว-15-768x768.webp",
        category: "sculping",
        title: "สลายไขมันใต้คาง",
        shortText: "เหนียงหาย คางชัดขึ้น",
        fullText: "เหนียงหาย คางชัดขึ้น หน้าเรียวขึ้นมาก ฉีดสลายไขมัน 2 ครั้ง ผลลัพธ์ดีเกินคาด ไม่ต้องดูดไขมัน ไม่ต้องพักฟื้นนาน",
        rating: 5,
        userName: "คุณ น.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-star-of-life",
        treatment: "Belkyra (Kybella) | 2 vials"
    },
    {
        id: 20,
        image: "assets/images/Reviews/Sculping/รีวิว-16-768x768.webp",
        category: "sculping",
        title: "Sculptra กระชับรูปหน้า",
        shortText: "รูปหน้ากระชับ ผิวตึง เด้ง",
        fullText: "รูปหน้ากระชับขึ้นชัดเจน ผิวตึง เด้ง ผลค่อยๆ เห็นชัดขึ้นทุกเดือน ทำ Sculptra 2 ครั้ง ผลอยู่ยาวนาน 2 ปี คุ้มค่ามากค่ะ แนะนำเลย",
        rating: 5,
        userName: "คุณ ค.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-star-of-life",
        treatment: "Sculptra | Full Program"
    },

    // ═══════════════════════════════════════════
    // 6. COLLAGEN WAVE (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 21,
        image: "assets/images/Reviews/CollagenWave/รีวิว-17-768x769.webp",
        category: "collagen",
        title: "Collagen Wave ผิวเด้ง",
        shortText: "ผิวกระชับ เรียบเนียน อิ่มฟู",
        fullText: "ผิวกระชับ เรียบเนียน อิ่มฟู ทำแล้วผิวเด้งขึ้นมาก รูขุมขนกระชับขึ้น หน้าสว่างขึ้นด้วย ไม่เจ็บเลยค่ะ พนักงานบริการดี แพทย์ใจดี",
        rating: 5,
        userName: "คุณ น.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-bolt",
        treatment: "Collagen Wave | 1 ครั้ง",
        showOnHome: true
    },
    {
        id: 22,
        image: "assets/images/Reviews/CollagenWave/รีวิว-18-768x769.webp",
        category: "collagen",
        title: "Collagen Wave กระชับ",
        shortText: "หน้ากระชับมาก ผิวตึงเด้ง",
        fullText: "หน้ากระชับมาก ผิวตึงเด้ง ริ้วรอยจางลง รูขุมขนเล็กลง ทำครั้งเดียวเห็นผลเลย ทำเสร็จหน้าสว่างขึ้นทันทีค่ะ ชอบมาก",
        rating: 5,
        userName: "คุณ ข.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-bolt",
        treatment: "Collagen Wave | Full Face"
    },
    {
        id: 23,
        image: "assets/images/Reviews/CollagenWave/รีวิว-19-768x769.webp",
        category: "collagen",
        title: "Collagen Wave หน้าใส",
        shortText: "ผิวชุ่มชื้น เปล่งปลั่ง เนียนนุ่ม",
        fullText: "ผิวชุ่มชื้น เปล่งปลั่ง เนียนนุ่ม ทำแล้วรู้สึกผิวนุ่มขึ้นมาก หน้าสว่างใส ไม่ต้องแต่งหน้าหนักแล้วค่ะ ทำแล้วติดใจ จองรอบหน้าเลย",
        rating: 5,
        userName: "คุณ ท.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-bolt",
        treatment: "Collagen Wave | 1 ครั้ง"
    },
    {
        id: 24,
        image: "assets/images/Reviews/CollagenWave/รีวิว-20-768x769.webp",
        category: "collagen",
        title: "Collagen Wave ลดริ้วรอย",
        shortText: "ริ้วรอยจางลง หน้าเด้งอ่อนเยาว์",
        fullText: "ริ้วรอยจางลงชัดมาก หน้าเด้งอ่อนเยาว์ ทำมา 3 ครั้ง ผลสะสมดีมาก ผิวตึงกระชับขึ้นเรื่อยๆ แพทย์ดูแลดี อธิบายทุกขั้นตอนค่ะ",
        rating: 5,
        userName: "คุณ ศ.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-bolt",
        treatment: "Collagen Wave | 3 Sessions"
    },

    // ═══════════════════════════════════════════
    // 7. JUVELOOK (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 25,
        image: "assets/images/Reviews/Juvelook/รีวิว-09-768x768.webp",
        category: "juvelook",
        title: "Juvelook ผิวเด้ง",
        shortText: "ผิวเปล่งปลั่ง เด้งน่าสัมผัส",
        fullText: "ผิวเปล่งปลั่ง เด้งน่าสัมผัส ทำแล้วผิวดีขึ้นเห็นได้ชัด รูขุมขนกระชับ หน้าสว่างใส เนียนนุ่ม ไม่ต้องแต่งหน้าหนักแล้วค่ะ",
        rating: 5,
        userName: "คุณ ท.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-gem",
        treatment: "Juvelook | 2 cc",
        showOnHome: true
    },
    {
        id: 26,
        image: "assets/images/Reviews/Juvelook/รีวิว-10-768x768.webp",
        category: "juvelook",
        title: "Juvelook กระชับรูขุมขน",
        shortText: "รูขุมขนกระชับ ผิวเนียนขึ้น",
        fullText: "รูขุมขนกระชับขึ้นชัดเจน ผิวเนียนกว่าเดิมมาก ทำแค่ครั้งเดียวเห็นผลเลย หน้าสว่างใสขึ้น ผิวเด้งสุขภาพดี แนะนำเลยค่ะ",
        rating: 5,
        userName: "คุณ แ.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-gem",
        treatment: "Juvelook | 1 cc"
    },
    {
        id: 27,
        image: "assets/images/Reviews/Juvelook/รีวิว-11-768x768.webp",
        category: "juvelook",
        title: "Juvelook Volume",
        shortText: "หน้าอิ่มเด้ง ผิวมีน้ำมีนวล",
        fullText: "หน้าอิ่มเด้ง ผิวมีน้ำมีนวล ฉีดแล้วหน้ากลาสสกินเลยค่ะ คอลลาเจนสร้างใหม่ ผลอยู่ยาวนาน ไม่ต้องทำบ่อย คุ้มค่ามากค่ะ",
        rating: 5,
        userName: "คุณ ห.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-gem",
        treatment: "Juvelook Volume | 2 cc"
    },
    {
        id: 28,
        image: "assets/images/Reviews/Juvelook/รีวิว-12-768x768.webp",
        category: "juvelook",
        title: "Juvelook ชะลอวัย",
        shortText: "ผิวดูอ่อนเยาว์ สุขภาพผิวดี",
        fullText: "ผิวดูอ่อนเยาว์ขึ้นมาก สุขภาพผิวดีขึ้น ทำมา 2 ครั้ง ผิวกระจ่างใส ริ้วรอยจางลง เพื่อนๆ ทักว่าหน้าดูเด็กลง สดใสขึ้นค่ะ",
        rating: 5,
        userName: "คุณ ภ.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-gem",
        treatment: "Juvelook | Full Course"
    },

    // ═══════════════════════════════════════════
    // 8. ULTHERA (4 reviews)
    // ═══════════════════════════════════════════
    {
        id: 29,
        image: "assets/images/Reviews/Ulthera/รีวิว-21-768x769.webp",
        category: "ulthera",
        title: "Ultherapy ยกกระชับ",
        shortText: "หน้าเต่งตึง ไร้ริ้วรอย",
        fullText: "หน้าเต่งตึง ไร้ริ้วรอย ทำไปเดือนนึงแล้ว ผลชัดมาก คนรอบข้างบอกหน้าเด็กลง อายุ 45 แต่หน้าดู 30+ เลย คุ้มค่ามาก แนะนำเลยค่ะ",
        rating: 5,
        userName: "คุณ ส.",
        date: "15 มกราคม 2026",
        treatmentIcon: "fa-signal",
        treatment: "Ultherapy | 300 lines",
        showOnHome: true
    },
    {
        id: 30,
        image: "assets/images/Reviews/Ulthera/รีวิว-22-768x769.webp",
        category: "ulthera",
        title: "HIFU ยกกระชับ",
        shortText: "แก้มกระชับขึ้น ร่องแก้มตื้นขึ้น",
        fullText: "แก้มกระชับขึ้น ร่องแก้มตื้นขึ้น เหนียงหาย หน้า V-line ขึ้นมาก ทำเสร็จเห็นผลเลย คุ้มค่ามาก ไม่ต้องพักฟื้น",
        rating: 5,
        userName: "คุณ ย.",
        date: "12 มกราคม 2026",
        treatmentIcon: "fa-signal",
        treatment: "HIFU Ultraformer III | Full Face"
    },
    {
        id: 31,
        image: "assets/images/Reviews/Ulthera/รีวิว-23-768x769.webp",
        category: "ulthera",
        title: "Ultherapy ยกกระชับคอ",
        shortText: "เหนียงหาย คอเรียวขึ้น",
        fullText: "เหนียงหาย คอเรียวขึ้น ริ้วรอยที่คอจางลง ผิวคอตึงเด้ง ไม่ต้องเปิดแผล ทำเสร็จกลับบ้านได้เลย ผลอยู่นานเป็นปี",
        rating: 5,
        userName: "คุณ อ.",
        date: "8 มกราคม 2026",
        treatmentIcon: "fa-signal",
        treatment: "Ultherapy | Neck 200 lines"
    },
    {
        id: 32,
        image: "assets/images/Reviews/Ulthera/รีวิว-24-768x769.webp",
        category: "ulthera",
        title: "Ultherapy Full Face",
        shortText: "หน้ากระชับ ยกขึ้น ผิวตึง",
        fullText: "หน้ากระชับขึ้นมาก ยกขึ้นชัดเจน ผิวตึงเด้ง ทำเสร็จ 1 เดือนเห็นผลชัด คนรอบข้างทักเยอะมากว่าหน้าดูดีขึ้น ทำแล้วติดใจค่ะ",
        rating: 5,
        userName: "คุณ ว.",
        date: "5 มกราคม 2026",
        treatmentIcon: "fa-signal",
        treatment: "Ultherapy | Full Face 500 lines"
    }
];

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render review cards for the homepage (showOnHome items)
 * Target: .reviews-grid in index.html
 */
function renderHomepageReviews() {
    const grid = document.querySelector('.reviews .reviews-grid');
    if (!grid) return;

    const homeReviews = REVIEWS_DATA.filter(r => r.showOnHome);
    grid.innerHTML = homeReviews.map(r => {
        const stars = Array(r.rating).fill('<i class="fas fa-star"></i>').join('');
        return `
            <div class="review-card" data-category="${r.category}">
                <div class="review-image">
                    <img src="${r.image}" alt="${r.title}" loading="lazy">
                </div>
                <div class="review-content">
                    <div class="review-rating">${stars}</div>
                    <h4>${r.title}</h4>
                    <p>${r.shortText}</p>
                </div>
            </div>`;
    }).join('');
}

/**
 * Render review cards for the reviews page (all reviews)
 * Target: .reviews-grid-enhanced in reviews.html
 */
function renderReviewsPage() {
    const grid = document.querySelector('.reviews-grid-enhanced');
    if (!grid) return;

    grid.innerHTML = REVIEWS_DATA.map(r => {
        const stars = Array(r.rating).fill('<i class="fas fa-star"></i>').join('');
        return `
            <div class="review-card-enhanced" data-category="${r.category}">
                <div class="review-image-enhanced">
                    <img src="${r.image}" alt="${r.title}" loading="lazy">
                    <div class="review-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>ยืนยันตัวตน</span>
                    </div>
                </div>
                <div class="review-content-enhanced">
                    <div class="review-header">
                        <div class="review-user">
                            <div class="user-avatar"><i class="fas fa-user"></i></div>
                            <div class="user-info">
                                <h4>${r.userName}</h4>
                                <span class="review-date">${r.date}</span>
                            </div>
                        </div>
                        <div class="review-rating">${stars}</div>
                    </div>
                    <h3 class="review-title">${r.title}</h3>
                    <p class="review-text">${r.fullText}</p>
                    <div class="review-treatment">
                        <i class="fas ${r.treatmentIcon}"></i>
                        <span>${r.treatment}</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

/**
 * Render filter tabs dynamically from REVIEW_CATEGORIES
 */
function renderReviewFilters() {
    const container = document.querySelector('.reviews-filter-enhanced');
    if (!container) return;

    container.innerHTML = REVIEW_CATEGORIES.map(cat => `
        <button class="filter-btn-enhanced${cat.key === 'all' ? ' active' : ''}" data-filter="${cat.key}">
            <i class="${cat.icon}"></i>
            <span>${cat.label}</span>
        </button>
    `).join('');
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    renderHomepageReviews();
    renderReviewFilters();
    renderReviewsPage();
});
