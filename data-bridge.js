// ============================================
// DATA BRIDGE - เชื่อมต่อระหว่างหน้าบ้านกับหลังบ้าน
// ============================================
// ไฟล์นี้ทำหน้าที่ดึงข้อมูลจาก LocalStorage ที่ Admin Panel เก็บไว้
// และจัดรูปแบบให้พร้อมแสดงผลที่หน้าบ้าน

const DataBridge = {
    // ============================================
    // GET DATA FROM LOCALSTORAGE
    // ============================================
    getData(type) {
        try {
            const data = JSON.parse(localStorage.getItem(`drden_${type}`)) || [];
            // Filter เฉพาะรายการที่ active
            return data.filter(item => item.status === 'active');
        } catch (e) {
            console.error(`Error loading ${type}:`, e);
            return [];
        }
    },

    // ============================================
    // REVIEWS
    // ============================================
    getReviews() {
        const reviews = this.getData('reviews');
        
        // ถ้ายังไม่มีข้อมูล ใส่ข้อมูลตัวอย่าง
        if (reviews.length === 0) {
            return this.getSampleReviews();
        }
        
        return reviews.map(review => ({
            ...review,
            stars: '⭐'.repeat(review.rating || 5),
            displayDate: this.formatDate(review.date),
            initial: (review.customerName || 'ไม่ระบุ').charAt(0).toUpperCase()
        }));
    },

    getSampleReviews() {
        return [
            {
                id: 1,
                customerName: 'คุณสมใจ ใจดี',
                service: 'จัดฟัน Clear Aligner',
                rating: 5,
                stars: '⭐⭐⭐⭐⭐',
                comment: 'ประทับใจมากครับ หมอใจดี ให้คำแนะนำดีมาก ผลลัพธ์เกินคาด',
                date: new Date().toISOString(),
                displayDate: 'ก.พ. 2026',
                initial: 'ส',
                status: 'active'
            },
            {
                id: 2,
                customerName: 'คุณมานี มีสุข',
                service: 'ฟอกสีฟัน',
                rating: 5,
                stars: '⭐⭐⭐⭐⭐',
                comment: 'ฟันขาวมากค่ะ บริการดีเยี่ยม แนะนำเลยค่ะ',
                date: new Date().toISOString(),
                displayDate: 'ก.พ. 2026',
                initial: 'ม',
                status: 'active'
            },
            {
                id: 3,
                customerName: 'คุณชาย รักสะอาด',
                service: 'ทำฟันเทียม',
                rating: 5,
                stars: '⭐⭐⭐⭐⭐',
                comment: 'ฟันเทียมสวยงาม เหมือนฟันจริง ใส่สบาย',
                date: new Date().toISOString(),
                displayDate: 'ก.พ. 2026',
                initial: 'ช',
                status: 'active'
            }
        ];
    },

    // ============================================
    // SERVICES
    // ============================================
    getServices() {
        const services = this.getData('services');
        
        if (services.length === 0) {
            return this.getSampleServices();
        }
        
        return services;
    },

    getSampleServices() {
        return [
            {
                id: 1,
                name: 'จัดฟัน Clear Aligner',
                category: 'orthodontics',
                price: '45000',
                description: 'จัดฟันแบบใส ถอดได้ สวมใส่สะดวก ไม่เจ็บ',
                icon: 'fa-teeth',
                status: 'active'
            },
            {
                id: 2,
                name: 'ฟอกสีฟัน',
                category: 'cosmetic',
                price: '3500',
                description: 'ฟันขาวสดใส ภายใน 1 ชั่วโมง ปลอดภัย',
                icon: 'fa-tooth',
                status: 'active'
            },
            {
                id: 3,
                name: 'อุดฟัน',
                category: 'general',
                price: '800',
                description: 'อุดฟันผุ วัสดุคุณภาพสูง ทนทาน',
                icon: 'fa-tooth',
                status: 'active'
            },
            {
                id: 4,
                name: 'ถอนฟัน',
                category: 'general',
                price: '500',
                description: 'ถอนฟันอย่างปลอดภัย ไม่เจ็บ',
                icon: 'fa-tooth',
                status: 'active'
            },
            {
                id: 5,
                name: 'ทำฟันเทียม',
                category: 'prosthetics',
                price: '15000',
                description: 'ฟันเทียมคุณภาพ เหมือนฟันจริง',
                icon: 'fa-tooth',
                status: 'active'
            },
            {
                id: 6,
                name: 'รักษารากฟัน',
                category: 'general',
                price: '3500',
                description: 'รักษารากฟันติดเชื้อ บรรเทาอาการปวด',
                icon: 'fa-tooth',
                status: 'active'
            }
        ];
    },

    // ============================================
    // PROMOTIONS
    // ============================================
    getPromotions() {
        const promotions = this.getData('promotions');
        
        if (promotions.length === 0) {
            return this.getSamplePromotions();
        }
        
        return promotions.map(promo => ({
            ...promo,
            displayStartDate: this.formatDate(promo.startDate),
            displayEndDate: this.formatDate(promo.endDate),
            isActive: this.isPromotionActive(promo.startDate, promo.endDate)
        })).filter(promo => promo.isActive);
    },

    getSamplePromotions() {
        return [
            {
                id: 1,
                name: 'โปรฟอกสีฟัน ลด 50%',
                discount: 50,
                description: 'ฟอกสีฟันสวยใส ลดพิเศษ 50% เหลือเพียง 1,750 บาท',
                startDate: '2026-02-01',
                endDate: '2026-02-28',
                displayStartDate: '1 ก.พ. 2026',
                displayEndDate: '28 ก.พ. 2026',
                category: 'cosmetic',
                image: 'promo-whitening.jpg',
                status: 'active',
                isActive: true
            },
            {
                id: 2,
                name: 'จัดฟันใส ผ่อน 0%',
                discount: 0,
                description: 'จัดฟัน Clear Aligner ผ่อน 0% นาน 10 เดือน',
                startDate: '2026-02-01',
                endDate: '2026-03-31',
                displayStartDate: '1 ก.พ. 2026',
                displayEndDate: '31 มี.ค. 2026',
                category: 'orthodontics',
                image: 'promo-braces.jpg',
                status: 'active',
                isActive: true
            }
        ];
    },

    isPromotionActive(startDate, endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return now >= start && now <= end;
    },

    // ============================================
    // ARTICLES
    // ============================================
    getArticles() {
        const articles = this.getData('articles');
        
        if (articles.length === 0) {
            return this.getSampleArticles();
        }
        
        return articles.map(article => ({
            ...article,
            displayDate: this.formatDate(article.date)
        }));
    },

    getSampleArticles() {
        return [
            {
                id: 1,
                title: '5 วิธีดูแลฟันให้ขาวสะอาด',
                category: 'ทั่วไป',
                excerpt: 'เคล็ดลับง่ายๆ ที่จะทำให้ฟันของคุณขาวสะอาดและแข็งแรง...',
                content: 'เนื้อหาบทความ...',
                author: 'ทพ. สมชาย ใจดี',
                date: new Date().toISOString(),
                displayDate: 'ก.พ. 2026',
                image: 'article-1.jpg',
                status: 'active'
            },
            {
                id: 2,
                title: 'จัดฟันแบบใส VS จัดฟันแบบเดิม',
                category: 'จัดฟัน',
                excerpt: 'เปรียบเทียบข้อดีข้อเสียของการจัดฟันทั้ง 2 แบบ...',
                content: 'เนื้อหาบทความ...',
                author: 'ทพญ. มาลี สวยงาม',
                date: new Date().toISOString(),
                displayDate: 'ก.พ. 2026',
                image: 'article-2.jpg',
                status: 'active'
            }
        ];
    },

    // ============================================
    // DOCTORS
    // ============================================
    getDoctors() {
        const doctors = this.getData('doctors');
        
        if (doctors.length === 0) {
            return this.getSampleDoctors();
        }
        
        return doctors;
    },

    getSampleDoctors() {
        return [
            {
                id: 1,
                name: 'นพ.อภิวัฒน์ มงคลสินธุ์',
                nickname: 'หมอเด่น',
                license: 'ว.26872',
                branches: ['Paragon', 'Nirvana', 'FXC Clinic'],
                image: 'หมอเด่น.webp',
                status: 'active'
            },
            {
                id: 2,
                name: 'พญ.กันยารัตน์ ตฤงณวสุนธรา',
                nickname: 'หมอเฟิร์น',
                license: 'ว.71875',
                branches: ['Paragon', 'Nirvana'],
                image: 'หมอเฟิร์น.webp',
                status: 'active'
            },
            {
                id: 3,
                name: 'นพ.ณัฐพัชร์ ธรรมสิริรัตน์',
                nickname: 'หมอบับเบิ้ล',
                license: 'ว.69131',
                branches: ['Paragon'],
                image: 'หมอบับเบิ้ล.webp',
                status: 'active'
            },
            {
                id: 4,
                name: 'พญ.กวิสรา เทียนทอง',
                nickname: 'หมอมุ้งมิ้ง',
                license: 'ว.75283',
                branches: ['Paragon', 'FXC Clinic'],
                image: 'หมอมุ้งมิ้ง.webp',
                status: 'active'
            },
            {
                id: 5,
                name: 'พญ.จิตาภา อุดมพันท์',
                nickname: 'หมอจีจี้',
                license: 'ว.61919',
                branches: ['Paragon'],
                image: 'หมอจีจี้.webp',
                status: 'active'
            },
            {
                id: 6,
                name: 'พญ.ธนรักษ์ หย่ำวิไล',
                nickname: 'หมอเชฟ',
                license: 'ว.61954',
                branches: ['Paragon'],
                image: 'หมอเซฟ.webp',
                status: 'active'
            },
            {
                id: 7,
                name: 'พญ.ปรียสุดา นาคาคง',
                nickname: 'หมอบัว',
                license: 'ว.34659',
                branches: ['Paragon'],
                image: 'หมอบัว.webp',
                status: 'active'
            },
            {
                id: 8,
                name: 'นพ.กรชัย พิมพนิช',
                nickname: 'หมอกร',
                license: 'ว.69225',
                branches: ['Paragon', 'Nirvana', 'FXC Clinic'],
                image: 'หมอกร.webp',
                status: 'active'
            },
            {
                id: 9,
                name: 'พญ.พรรณราย เลิศวณิชโรจน์',
                nickname: 'หมอพิ้ง',
                license: 'ว.75182',
                branches: ['สาขาพิษณุโลก', 'สาขานครสวรรค์'],
                image: 'หมอผึ้ง.webp',
                status: 'active'
            }
        ];
    },

    // ============================================
    // BRANCHES
    // ============================================
    getBranches() {
        const branches = this.getData('branches');
        
        if (branches.length === 0) {
            return this.getSampleBranches();
        }
        
        return branches;
    },

    getSampleBranches() {
        return [
            {
                id: 1,
                name: 'DR.DEN สาขาสยาม',
                region: 'กรุงเทพและปริมณฑล',
                address: '123 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330',
                phone: '02-123-4567',
                hours: 'จันทร์-ศุกร์ 9:00-20:00, เสาร์-อาทิตย์ 10:00-18:00',
                status: 'active'
            },
            {
                id: 2,
                name: 'DR.DEN สาขาเซ็นทรัลเวิลด์',
                region: 'กรุงเทพและปริมณฑล',
                address: 'ชั้น 7 เซ็นทรัลเวิลด์ ถนนราชดำริ แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330',
                phone: '02-234-5678',
                hours: 'ทุกวัน 10:00-22:00',
                status: 'active'
            }
        ];
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    formatDate(dateString) {
        if (!dateString) return 'ไม่ระบุ';
        
        const date = new Date(dateString);
        const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                       'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    // ============================================
    // STATS FOR HOMEPAGE
    // ============================================
    getStats() {
        return {
            reviews: this.getData('reviews').length,
            services: this.getData('services').length,
            promotions: this.getPromotions().length,
            articles: this.getData('articles').length,
            doctors: this.getData('doctors').length,
            branches: this.getData('branches').length,
            happyCustomers: Math.max(500, this.getData('reviews').length * 10)
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataBridge;
}
