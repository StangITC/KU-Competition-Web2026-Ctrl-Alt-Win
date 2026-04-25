# KU‑Competition‑Web2026 – Team Ctrl‑Alt‑Win
เป็นเว็บแอปพลิเคชันแบบ Static ที่สร้างด้วย HTML, CSS, JavaScript (ไม่มีฟรมเวิร์ก) เพื่อเป็นตัวอย่างการทำระบบจองที่พัก/ท่องเที่ยวของการแข่งขัน KU Competition 2026

# จุดประสงค์ของเว็บไซต์
แสดง หน้าหลัก (Home) ที่ออกแบบตามฟิกมา (Figma) ของทีม
ให้ผู้ใช้ ค้นหาที่พัก (Search‑Result) พร้อมการแบ่งหน้า (Pagination mock‑up)
แสดงรายละเอียดของห้องพัก (Room‑Detail) พร้อมภาพและข้อมูลครบถ้วน
มี Navbar / Footer สากลที่ทำงานบนอุปกรณ์ทุกขนาด (Responsive) ด้วยเมนูแฮมเบอร์เกอร์สำหรับมือถือ
ใช้ JavaScript เพื่อจัดการการนำทางและอินเตอร์แอคชั่นพื้นฐาน (เช่น toast‑notification)

# ไฟล์และโฟลเดอร์
index.html	หน้าโฮมเพจหลัก
404.html	หน้าแสดงข้อผิดพลาดเมื่อไม่พบไฟล์
pages/search-result.html	หน้าแสดงผลการค้นหา (พร้อมตัวอย่าง pagination)
pages/room-detail.html	หน้าแสดงรายละเอียดของห้องพัก
assets/js/shared‑layout.js	โค้ดสากลสำหรับเพิ่ม Navbar, Footer และเมนู hamburger
assets/css/shared‑layout.css	ระบบดีไซน์สากล (Navbar / Footer) และการตอบสนองต่ออุปกรณ์
assets/css/home‑fix.css, search‑fix.css, room‑fix.css	การปรับแต่งเฉพาะหน้าและการทำให้รองรับมือถือ
assets/js/app.js	โลจิกหลักของการโต้ตอบและการนำทาง
public/	รูปภาพ, SVG, และไฟล์ assets ที่ส่งออกจาก Figma

