# 🗺️ Roadmap: Living Wealth 365 Web Application

แผนการพัฒนาระบบเว็บไซต์และระบบจัดการหลังบ้าน (Admin Dashboard) สำหรับแบรนด์ Living Wealth 365 โดยใช้ React.js และสถาปัตยกรรมที่รองรับบนโฮสติ้งของ Atom

---

## Phase 1: Discovery & Planning (สัปดาห์ที่ 1)
**เป้าหมาย:** สรุปขอบเขตงานและเตรียมความพร้อมด้านโครงสร้างพื้นฐาน
- [x] สรุป Feature Requirement ทั้งหมดกับลูกค้า (หน้า Public, Customer และ Admin)
- [x] สรุป Tech Stack: React.js (Vite), Tailwind CSS, daisyUI, `react-router-dom` (Pure JavaScript, No TypeScript)
- [x] ตรวจสอบสภาพแวดล้อม Hosting ของ Atom (Shared Hosting หรือ VPS) เพื่อเลือกแนวทาง Backend (Express.js ES Modules + Prisma ORM)
- [x] ออกแบบ Data Schema เบื้องต้น (Prisma Schema: User, Lead, Post, Product, Wishlist)
- [x] สรุปช่องทางการแจ้งเตือน Lead Form (เช่น LINE Notify หรือ Email)

---

## Phase 2: UI/UX Design & Theming (สัปดาห์ที่ 2)
**เป้าหมาย:** ออกแบบหน้าจอให้ตรงกับ CI แบรนด์และคอนเซปต์ Minimal/Zen
- [x] สร้าง Wireframe สรุป User Journey ตั้งแต่หน้าแรกจนถึงการกรอกฟอร์ม และบันทึก Wishlist
- [x] กำหนด Color Palette ใน Tailwind Config ตาม CI แบรนด์:
  - Primary: `#023E8D`
  - Secondary: `#FFB53B`
  - Accent: `#B62B1C`
  - Background: `#F5F7FA`
- [x] ออกแบบ UI Mockup หน้าสำคัญ: Home, Insurance (Life & Non-Life), Mu-Tae-Lu, Blog
- [x] ออกแบบหน้า Admin Dashboard และตารางข้อมูล (Lead Management CRM Pipeline)
- [x] จัดทำ Logo โปร่งใส 2 เวอร์ชัน (Light & Dark Theme)

---

## Phase 3: Frontend Development (สัปดาห์ที่ 3-4)
**เป้าหมาย:** พัฒนาระบบส่วนหน้าทั้งหมดและวาง Routing
- [x] Project Setup: สร้างโปรเจกต์ React + ติดตั้ง Tailwind CSS & daisyUI (Zen Glass Theme)
- [x] วางโครงสร้าง Layout: `<AppShell />` (Public Navbar/Footer) และ `<DashboardLayout />` (CRM Collapsible Sidebar)
- [x] พัฒนา Public Pages:
  - [x] หน้า Home (Hero, 6 Core Values, 3 Pillars, Featured Mutelu, Featured Blog, Lead Form)
  - [x] หน้า Life / Non-life Insurance (ข้อมูลจุดเด่น + `<LeadCaptureForm />`)
  - [x] หน้า Mu-Tae-Lu (แคตตาล็อกสินค้า + เครื่องคำนวณหินตามวันเกิด + Wishlist ❤️)
  - [x] หน้า Blog & Blog Detail (Grid บทความ + ตัวกรอง + หน้าอ่าน + แชร์)
  - [x] หน้า Login & Register (พร้อม Confirm Password Validation)
  - [x] หน้า Thank You (Tracking Pixel Simulation)
- [x] พัฒนา Customer & Admin Pages:
  - [x] หน้า Dashboard สมาชิก (ข้อมูลส่วนตัว + ประวัติ Lead + Wishlist)
  - [x] หน้า Dashboard แอดมิน (KPI Stats, ตาราง Leads, Interactive Status Changer, Note Modal)
  - [x] หน้า CMS (จัดการบทความและสินค้ามงคล)
- [x] ทำให้รองรับ Mobile Responsive (Mobile-first + Tablet/iPad + Desktop 100% Full Screen)
- [x] ระบบสลับ 2 ภาษา (🇹🇭 TH / 🇬🇧 EN) และ daisyUI Toast/Modal

---

## Phase 4: Backend & API Integration (สัปดาห์ที่ 5)
**เป้าหมาย:** เชื่อมต่อข้อมูลส่วนหน้ากับฐานข้อมูลและระบบแจ้งเตือน
- [ ] Setup Database (PostgreSQL / MySQL บนโฮสต์ Atom ด้วย Prisma ORM)
- [ ] สร้างระบบ Authentication (JWT + Password Hashing) สำหรับ Customer และ Admin Login
- [ ] พัฒนาและเชื่อมต่อ API สำหรับส่งข้อมูลจาก `<LeadCaptureForm />` เข้า Database
- [ ] เชื่อมต่อ API สำหรับดึงข้อมูลบล็อกและสินค้ามาแสดงผล
- [ ] ติดตั้งสคริปต์แจ้งเตือน (Webhook) ส่งเข้า LINE Notify / Email ทันทีเมื่อมี Lead ใหม่

---

## Phase 5: Testing & Quality Assurance (สัปดาห์ที่ 6)
**เป้าหมาย:** ทดสอบระบบให้ไร้ข้อผิดพลาดและพร้อมใช้งาน
- [ ] Cross-browser & Device Testing (ทดสอบบน Chrome, Safari, iOS, Android)
- [ ] ทดสอบการทำงานของฟอร์ม (Form Validation & Error Handling)
- [ ] ทดสอบระบบ Backend: การอัปเดตสถานะ Lead, การอัปโหลดภาพ
- [ ] ตรวจสอบ Performance และ SEO พื้นฐาน (Meta tags, รูปภาพที่ถูกบีบอัด)
- [ ] UAT (User Acceptance Testing) ให้ลูกค้าทดลองใช้งานและ Feedback

---

## Phase 6: Deployment & Launch (สัปดาห์ที่ 7)
**เป้าหมาย:** นำระบบขึ้นใช้งานจริงและส่งมอบ
- [ ] Build React Application (`npm run build`)
- [ ] ตั้งค่า Server/Hosting บน Atom และอัปโหลดไฟล์
- [ ] เชื่อมต่อ Domain Name และติดตั้ง SSL Certificate (HTTPS)
- [ ] ตรวจสอบระบบ Production และเช็ก LINE Notify บนสภาพแวดล้อมจริง
- [ ] ติดตั้งเครื่องมือ Tracking (เช่น Google Analytics, Facebook Pixel)
- [ ] ส่งมอบงาน (Go-Live) พร้อมคู่มือการใช้งานระบบ Admin
