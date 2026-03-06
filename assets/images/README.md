# วางรูปภาพของคุณที่นี่

## คำแนะนำการใช้รูปภาพ

### ขนาดที่แนะนำ:

1. **Hero Section**: 
   - ขนาด: 1200x800px
   - Format: JPG หรือ WebP

2. **Service Icons**: 
   - ขนาด: 200x200px
   - Format: PNG (background โปร่งใส)

3. **Reviews (Before/After)**:
   - ขนาด: 600x600px
   - Format: JPG หรือ WebP

4. **Branch Photos**:
   - ขนาด: 800x600px
   - Format: JPG หรือ WebP

5. **Blog Thumbnails**:
   - ขนาด: 800x500px
   - Format: JPG หรือ WebP

### การเพิ่มรูปภาพ:

1. วางไฟล์รูปภาพในโฟลเดอร์นี้
2. ตั้งชื่อไฟล์ให้สื่อความหมาย เช่น:
   - hero-background.jpg
   - service-filler.png
   - review-01.jpg
   - branch-bangkok.jpg

3. แก้ไขโค้ดใน index.html:
   ```html
   <!-- เดิม -->
   <div class="image-placeholder">
       <i class="fas fa-image"></i>
   </div>

   <!-- เปลี่ยนเป็น -->
   <img src="assets/images/ชื่อไฟล์.jpg" alt="คำอธิบาย">
   ```

### Optimization:

- ใช้ TinyPNG หรือ Squoosh.app เพื่อลดขนาดไฟล์
- พิจารณาใช้ WebP format สำหรับ modern browsers
- ใช้ lazy loading สำหรับรูปภาพที่ไม่อยู่ในหน้าจอแรก