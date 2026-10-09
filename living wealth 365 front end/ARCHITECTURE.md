# 📑 เอกสารแบบแปลนสถาปัตยกรรมระบบฉบับสมบูรณ์ (Master Architecture Specification)
## โครงการ: Living Wealth 365 (Health, Wealth & Wisdom Platform)

---

## 📌 1. ภาพรวมและหลักการออกแบบระบบ (System Design Principles)

1. **Pure React JS (JavaScript / JSX เท่านั้น)**: ไม่มี TypeScript (`.ts` / `.tsx`) ในทุกไฟล์ทั้ง Frontend และ Backend
2. **Full Screen 100% Edge-to-Edge Layout**: หน้าจอขยายเต็มพื้นที่ ไม่จำกัดความกว้างกรอบแคบ รองรับ Responsive บน Smartphone, iPad/Tablet และ Desktop
3. **Balanced Typography (A+ Standard)**: ขนาดตัวอักษรปรับลดลง ~30% จากสเกลเริ่มต้น เพื่อความสบายตา อ่านง่าย เหมาะสำหรับทุกเพศทุกวัย
4. **Zen Glass Design Theme**: สไตล์มินิมอล กระจกใส พรีเมียม อิงตาม Tailwind CSS 4 และ daisyUI 5 (`zen-light` / `zen-dark`)
5. **Clean Code & Modular Architecture**: แยก Component, Controller, Route, Middleware เป็นชิ้นส่วนชัดเจน ไม่เขียนโค้ดยาวรวมในไฟล์เดียว

---

## 🗺️ 2. ตารางสรุปภาพรวม Route ทั้งหมด (Master Route Summary)

| Route Path | สิทธิ์การเข้าถึง | ชื่อหน้า / ฟังก์ชัน | วัตถุประสงค์หลัก | ปลายทาง / ปุ่มแอ็กชัน | Prisma Model ที่เกี่ยวข้อง |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **🌐 Public Zone** | | | | | |
| `/` | ทุกคน (Guest) | **Home Page** | แนะนำภาพรวม Living Wealth 365 (3 เสาหลัก), ดึงดูดความสนใจ, ไฮไลท์บริการ | ลิงก์ไปบริการ, บล็อก, มูเตลู, ปุ่มเข้าสู่ระบบ | `Post` (Featured), `Product` (Featured), `Lead` |
| `/insurance/life` | ทุกคน (Guest) | **Life & Health Insurance** | แสดงจุดเด่นประกันชีวิต/สุขภาพ/โรคร้ายแรง/เกษียณ พร้อม `<LeadCaptureForm/>` | กรอกฟอร์ม ➡️ `/thank-you` | `Lead` |
| `/insurance/non-life` | ทุกคน (Guest) | **Non-Life Insurance** | แสดงประกันวินาศภัย (รถยนต์, อัคคีภัย, ทรัพย์สิน) พร้อม `<LeadCaptureForm/>` | กรอกฟอร์ม ➡️ `/thank-you` | `Lead` |
| `/mutelu` | ทุกคน (Guest) | **Mu-Tae-Lu Catalog** | แคตตาล็อกหินมงคล + คำนวณหินตามวันเกิด + ปุ่ม ❤️ Wishlist | ❤️ (Guest ➔ `/login`, สมาชิก ➔ เก็บลง Wishlist), ปุ่มบูชา ➔ กรอกฟอร์ม ➔ `/thank-you` | `Product`, `Wishlist`, `User` |
| `/blog` | ทุกคน (Guest) | **Knowledge Hub** | สารบัญบทความการเงิน สุขภาพ และภาษี (มี Search & Category Filter) | คลิกการ์ด ➔ `/blog/:slug` | `Post` (published = true) |
| `/blog/:slug` | ทุกคน (Guest) | **Article Detail** | หน้าอ่านเนื้อหาบทความฉบับเต็ม พร้อมปุ่มแชร์และ Call-to-action ขอคำปรึกษา | คลิกขอปรึกษา ➔ ไปฟอร์ม Lead (Auto-fill หัวข้อ) | `Post`, `User` (Author) |
| `/login` | ทุกคน (Guest) | **Sign In** | เข้าสู่ระบบ (รองรับทั้ง Customer และ Admin) | Customer ➔ `/account`<br>Admin ➔ `/admin/dashboard` | `User` |
| `/register` | ทุกคน (Guest) | **Sign Up** | สมัครสมาชิกสำหรับลูกค้า (กรอกชื่อ, เบอร์, วันเกิดสำหรับสายมู) | สำเร็จ ➔ Auto Login ➔ `/account` | `User` (Role = CUSTOMER) |
| `/thank-you` | ทุกคน (Guest) | **Thank You & Tracking** | หน้าขอบคุณเมื่อส่งฟอร์มสำเร็จ (รองรับฝัง Meta Pixel / GA4 Event) | ปุ่ม "กลับสู่หน้าหลัก" หรือ "ดูประวัติคำขอ" | `Lead` |
| **👤 Customer Zone** | *(Role: CUSTOMER)* | | | | |
| `/account` | สมาชิก | **Account Overview** | สรุปโปรไฟล์ลูกค้า (ชื่อ, อีเมล, เบอร์, วันเกิดสายมู) และสถิติภาพรวม | เมนูข้างไป `/account/history`, `/account/wishlist` | `User` |
| `/account/history` | สมาชิก | **Consultation History** | ประวัติการกรอกฟอร์มขอคำปรึกษา พร้อม Badge สถานะ (🟡 รอดำเนินการ, 🟢 ที่ปรึกษารับเรื่องแล้ว) | ดูสถานะ, แจ้งเรื่องเพิ่มเติม | `Lead` (userId = User.id) |
| `/account/wishlist` | สมาชิก | **Saved Wishlist** | รายการสินค้าหินมงคลที่เคยกดบันทึกไว้ | คลิกดูสินค้า ➔ `/mutelu`, ปุ่ม "ปรึกษา/บูชา" ➔ Auto-fill ฟอร์ม Lead | `Wishlist`, `Product` |
| **🔒 Admin Zone** | *(Role: ADMIN)* | | | | |
| `/admin/dashboard` | ผู้ดูแลระบบ | **Admin CRM Dashboard** | สรุปสถิติ (Total Leads, New Users, Conversion) + ตาราง Lead Pipeline | เปลี่ยนสถานะ Lead, จด Note, กดโทรออก | `Lead`, `User` |
| `/admin/cms/blog` | ผู้ดูแลระบบ | **Blog Management** | ตารางบทความทั้งหมด (ดู/แก้ไข/ลบ/เปลี่ยนสถานะ Publish) | ปุ่ม "เขียนบทความใหม่" ➔ `/admin/cms/blog/new` | `Post` |
| `/admin/cms/products` | ผู้ดูแลระบบ | **Products Management** | จัดการสินค้ามงคล (เพิ่ม/แก้ไข/เปิด-ปิดการแสดงผล `isActive`) | ปุ่ม "เพิ่มสินค้าใหม่" ➔ `/admin/cms/products/new` | `Product` |

---

## 🔄 3. รายละเอียดการทำงานและ Data Flow แต่ละหน้า (Data In / Data Out)

### 1. หน้าหลัก — Home Page (`/`)
* **หน้าที่:** First Impression แนะนำแบรนด์, 3 เสาหลัก (Protection, Planning, Prosperity)
* **Data In:**
  * `GET /api/posts/featured` ➔ รับบทความเด่น 3 เรื่อง
  * `GET /api/products/featured` ➔ รับสินค้าสายมูแนะนำ 4 ชิ้น
* **Data Out:** Navigation สู่หน้าบริการต่างๆ

### 2. หน้าประกันชีวิตและสุขภาพ — Life Insurance (`/insurance/life`)
* **หน้าที่:** รายละเอียดประกันชีวิต, ประกันสุขภาพเหมาจ่าย AIA, โรคร้ายแรง, แผนเกษียณ พร้อมฟอร์ม Lead
* **Data Out (Form Submission):**
  * `POST /api/leads`
  * **Payload:**
    ```json
    {
      "name": "สมชาย ใจดี",
      "phone": "0812345678",
      "interest": "ประกันสุขภาพเหมาจ่าย AIA",
      "preferredTime": "13:00 - 17:00",
      "userId": "uuid-ถ้าล็อกอินอยู่ (optional)"
    }
    ```
  * **Response:** `{ success: true, leadId: "..." }` ➔ Redirect ไป `/thank-you?leadId=...`

### 3. หน้าประกันวินาศภัย — Non-Life Insurance (`/insurance/non-life`)
* **หน้าที่:** ประกันภัยรถยนต์, ประกันอัคคีภัยบ้าน/คอนโด, ประกันทรัพย์สิน พร้อมฟอร์ม Lead
* **Data Out:** `POST /api/leads` (Payload โครงสร้างเดียวกัน ระบุ `interest: "ประกันรถยนต์ / อัคคีภัย"`) ➔ Redirect ไป `/thank-you`

### 4. หน้าสายมูและวัตถุมงคล — Mu-Tae-Lu Catalog (`/mutelu`)
* **หน้าที่:** แสดงรายการหินมงคล + ระบบคำนวณหินเสริมดวงตามวันเดือนปีเกิด + ปุ่มกด ❤️ Wishlist
* **Data In:**
  * `GET /api/products?isActive=true` ➔ รับรายการสินค้าหินมงคล
  * (ถ้าล็อกอิน) `GET /api/user/me` ➔ นำ `birthDate` มา Auto-calculate หินประจำตัวทันที
* **Data Out:**
  * **กด ❤️ บันทึก Wishlist:**
    * ไม่ล็อกอิน ➔ Redirect ไป `/login?redirect=/mutelu`
    * ล็อกอินแล้ว ➔ `POST /api/wishlist/toggle` (Payload: `{ productId: "..." }`)
  * **กด "บูชา / ปรึกษา":**
    * Auto-fill ฟอร์ม Lead ➔ `POST /api/leads` ➔ Redirect ไป `/thank-you`

### 5. หน้ารวมบทความ & รายละเอียด — Blog (`/blog` & `/blog/:slug`)
* **หน้าที่:** สารบัญและหน้าอ่านบทความฉบับเต็ม พร้อมปุ่มแชร์และ Call-to-action
* **Data In:**
  * `/blog`: `GET /api/posts?published=true&category=...&search=...`
  * `/blog/:slug`: `GET /api/posts/:slug` ➔ `{ id, title, slug, content, imageUrl, author: { name }, createdAt }`
* **Data Out:** ปุ่มขอรับคำปรึกษา นำไปสู่ฟอร์ม Lead พร้อม Auto-fill หัวข้อบทความ

### 6. หน้าเข้าสู่ระบบ & สมัครสมาชิก — Auth (`/login` & `/register`)
* **หน้าที่:** ตรวจสอบสิทธิ์ผู้ใช้งาน และแยกเส้นทางตาม Role
* **Data In / Out:**
  * **Login:** `POST /api/auth/login`
    * Payload: `{ email: "...", password: "..." }`
    * Response: `{ token: "jwt...", user: { id, name, role: "CUSTOMER" | "ADMIN" } }`
    * Redirect: Customer ➔ `/account`, Admin ➔ `/admin/dashboard`
  * **Register:** `POST /api/auth/register`
    * Payload: `{ name: "...", email: "...", password: "...", phone: "...", birthDate: "1990-05-15" }`
    * Response: สร้าง User ใหม่ (Role: CUSTOMER) ➔ ส่ง Token ➔ Redirect ไป `/account`

### 7. หน้าขอบคุณ — Thank You (`/thank-you`)
* **หน้าที่:** ยืนยันการส่งข้อมูลสำเร็จ และเป็นจุดยิง Conversion Tracking (Meta Pixel / Google Analytics)
* **Data In:** Query parameters เช่น `?leadId=...&type=insurance`

### 8. หน้าสรุปโปรไฟล์ลูกค้า — Account Dashboard (`/account`)
* **หน้าที่:** แสดงข้อมูลส่วนตัวของสมาชิก ข้อมูลวันเกิดสำหรับสายมู
* **Data In:** `GET /api/user/me` ➔ `{ id, name, email, phone, birthDate, createdAt }`
* **Data Out:** `PUT /api/user/profile` (แก้ไขชื่อ, เบอร์โทร, วันเกิด)

### 9. หน้าประวัติคำปรึกษา — Consultation History (`/account/history`)
* **หน้าที่:** ลูกค้าตรวจสอบสถานะ Lead ที่เคยส่งไว้
* **Data In:** `GET /api/user/leads` ➔ รายการ Lead พร้อมสถานะ:
  * `NEW` ➔ 🟡 รอดำเนินการ
  * `CONTACTED` ➔ 🟢 ที่ปรึกษารับเรื่องแล้ว
  * `CLOSED` ➔ 🔵 ดำเนินการสำเร็จ
  * `CANCELLED` ➔ ⚪ ยกเลิก

### 10. หน้ารายการของมงคลที่สนใจ — Account Wishlist (`/account/wishlist`)
* **หน้าที่:** รายการสินค้าหินมงคลที่เคยกดหัวใจ ❤️ ไว้
* **Data In:** `GET /api/user/wishlist` ➔ รายการ Product ใน Wishlist
* **Data Out:** `DELETE /api/wishlist/:productId` หรือกด "บูชา" เพื่อ Auto-fill ฟอร์ม Lead

### 11. หน้าแดชบอร์ดแอดมิน — Admin Dashboard (`/admin/dashboard`)
* **หน้าที่:** ศูนย์จัดการลูกค้าและงานที่ปรึกษา (CRM Pipeline)
* **Data In:**
  * `GET /api/admin/stats` ➔ สถิติรวม
  * `GET /api/admin/leads?status=...&page=...` ➔ รายการ Leads ทั้งหมด
* **Data Out:** `PATCH /api/admin/leads/:id` ➔ ปรับสถานะและบันทึก Note การติดต่อ

### 12. หน้าจัดการ CMS — Admin Blog & Products (`/admin/cms/*`)
* **หน้าที่:** เพิ่ม/แก้ไข/ลบ บทความ และสินค้าสายมู
* **Data Out:** CRUD API สำหรับ Post และ Product

---

## 🎨 4. โครงสร้างโฟลเดอร์ฝั่ง FRONTEND (`living wealth 365 front end/`)

```text
living wealth 365 front end/src/
│
├── 📂 pages/                      # หน้าจอทั้งหมด (แยกตามกลุ่มผู้ใช้)
│   ├── 📁 public/                 # 🌐 โซนบุคคลทั่วไป (ไม่ต้องล็อกอิน)
│   │   ├── HomePage.jsx           # หน้าแรกภาพรวมบริการ
│   │   ├── LifeInsurancePage.jsx  # ประกันชีวิตและสุขภาพ
│   │   ├── NonLifeInsurancePage.jsx# ประกันวินาศภัย (รถ/บ้าน)
│   │   ├── MuteluPage.jsx         # แคตตาล็อกหินมงคล + คำนวณตามวันเกิด
│   │   ├── BlogPage.jsx           # หน้ารวมบทความ
│   │   ├── BlogDetailPage.jsx     # หน้าอ่านบทความฉบับเต็ม
│   │   ├── LoginPage.jsx          # เข้าสู่ระบบ
│   │   ├── RegisterPage.jsx       # สมัครสมาชิก
│   │   └── ThankYouPage.jsx       # หน้าขอบคุณหลังส่งฟอร์มสำเร็จ
│   │
│   ├── 📁 account/                # 👤 โซนสมาชิกทั่วไป (Role: CUSTOMER)
│   │   ├── AccountDashboardPage.jsx# หน้าโปรไฟล์ส่วนตัว
│   │   ├── AccountHistoryPage.jsx # ประวัติคำปรึกษา + สถานะติดตาม
│   │   └── AccountWishlistPage.jsx# สินค้าสายมูที่กดหัวใจไว้
│   │
│   └── 📁 admin/                  # 🔒 โซนแอดมิน (Role: ADMIN)
│       ├── AdminDashboardPage.jsx # สรุปสถิติ + จัดการ Leads
│       ├── AdminBlogPage.jsx      # จัดการบทความ (CMS)
│       └── AdminProductsPage.jsx  # จัดการสินค้ามงคล (CMS)
│
├── 📂 components/                 # ชิ้นส่วน UI ที่นำมาประกอบในหน้าต่างๆ
│   ├── 📁 common/                 # ชิ้นส่วนส่วนกลาง (Navbar, Footer, Card, Badge)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ZenGlassCard.jsx
│   │   └── StatusBadge.jsx
│   ├── 📁 forms/                  # ฟอร์มต่างๆ (LeadCaptureForm, LoginForm, RegisterForm)
│   │   ├── LeadCaptureForm.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   └── 📁 mutelu/                 # ชิ้นส่วนเฉพาะสายมู (StoneCalculator, ProductCard)
│       ├── StoneCalculator.jsx
│       └── ProductCard.jsx
│
├── 📂 context/                    # ตัวจัดการ State กลาง
│   └── AuthContext.jsx            # เก็บข้อมูลล็อกอินและสิทธิ์ (User Role)
│
├── 📂 api/                        # ฟังก์ชันยิง API เชื่อมต่อกับ Backend
│   ├── apiClient.js               # ตัวเชื่อมหลัก (ใส่ Auth Token อัตโนมัติ)
│   ├── authApi.js                 # API เข้าสู่ระบบ / สมัครสมาชิก
│   ├── leadApi.js                 # API ส่งฟอร์มและจัดการ Lead
│   ├── postApi.js                 # API ดึงและจัดการบทความ
│   └── productApi.js              # API สินค้าและ Wishlist
│
├── 📂 constants/                  # ค่าคงที่ต่างๆ
│   ├── routes.js                  # รายชื่อ URL ทั้งหมดในระบบ
│   └── content.js                 # ข้อความและคำโปรยบนหน้าเว็บ
│
├── App.jsx                        # จุดรวม Route ทั้งหมด (React Router)
├── main.jsx                       # จุดเริ่มต้นการรัน React
└── index.css                      # ตกแต่งธีม Zen Glass + ฟอนต์อ่านง่าย 100% Full Screen
```

---

## ⚙️ 5. โครงสร้างโฟลเดอร์ฝั่ง BACKEND (`living wealth 365_backend/`)

```text
living wealth 365_backend/
│
├── 📂 prisma/
│   └── schema.prisma              # พิมพ์เขียวฐานข้อมูล (User, Lead, Post, Product, Wishlist)
│
├── 📂 src/
│   ├── 📂 config/
│   │   └── prisma.js              # ตัวเชื่อมต่อฐานข้อมูล Prisma Client
│   │
│   ├── 📂 routes/                 # เส้นทาง API (URL Endpoints)
│   │   ├── authRoutes.js          # เส้นทาง /api/auth (login, register, me)
│   │   ├── leadRoutes.js          # เส้นทาง /api/leads (ส่งฟอร์ม, ดูสถานะ)
│   │   ├── postRoutes.js          # เส้นทาง /api/posts (อ่าน/จัดการบทความ)
│   │   ├── productRoutes.js       # เส้นทาง /api/products (สินค้ามงคล)
│   │   └── wishlistRoutes.js      # เส้นทาง /api/wishlist (รายการโปรด)
│   │
│   ├── 📂 controllers/            # สมองและตรรกะการทำงานของแต่ละฟังก์ชัน
│   │   ├── authController.js      # ตรวจสอบรหัสผ่าน, ออก Token JWT
│   │   ├── leadController.js      # บันทึก Lead ใหม่, ปรับสถานะลูกค้า
│   │   ├── postController.js      # จัดการดึงและบันทึกบทความ
│   │   ├── productController.js   # ดึงรายการสินค้า, จัดการคลังมูเตลู
│   │   └── wishlistController.js  # เพิ่ม/ลบสินค้าออกจากรายการโปรด
│   │
│   ├── 📂 middlewares/            # ตัวกรองความปลอดภัยก่อนเข้าถึงข้อมูล
│   │   ├── authMiddleware.js      # ตรวจสอบว่ามี Token ถูกต้องหรือไม่
│   │   ├── roleMiddleware.js      # เช็กสิทธิ์ว่าเป็น CUSTOMER หรือ ADMIN
│   │   └── errorHandler.js        # ตัวดักจับ Error รวมทั้งระบบ
│   │
│   └── 📂 utils/                  # เครื่องมือช่วยเหลือ
│       ├── jwt.js                 # ฟังก์ชันสร้างและแกะรหัส JWT
│       └── response.js            # จัดรูปแบบการตอบกลับมาตรฐาน { success, data, message }
│
├── .env                           # เก็บค่าความลับ เช่น DATABASE_URL, JWT_SECRET
├── package.json
└── server.js                      # จุดเริ่มต้นรันเซิร์ฟเวอร์ Express
```

---

## 🗺️ 6. ตัวอย่าง User Journey Flow

### Scenario A: ลูกค้าขาจร (ไม่ล็อกอิน) สนใจประกัน
`หน้า Home (/)` ➡️ ไปหน้า `/insurance/life` ➡️ อ่านข้อมูลแล้วกรอก `<LeadCaptureForm/>` ➡️ ส่งข้อมูลไป `POST /api/leads` ➡️ Redirect ไปหน้า `/thank-you` ➡️ ที่ปรึกษา/แอดมินเห็นใน `/admin/dashboard` แล้วติดต่อกลับ

### Scenario B: ลูกค้าสมาชิก (ล็อกอินแล้ว) สนใจสายมู
ล็อกอินที่ `/login` ➡️ ไปหน้า `/account` ➡️ เข้าชมแคตตาล็อก `/mutelu` ➡️ เลื่อนดูหินมงคลแล้วกด ❤️ บันทึก ➡️ วันถัดไปเข้าตรวจดูที่ `/account/wishlist` ➡️ กดปุ่ม "บูชา" ➡️ ฟอร์ม Auto-fill ชื่อและเบอร์โทรให้ทันที ➡️ กดยืนยันส่งข้อมูล ➡️ ไปหน้า `/thank-you` ➡️ ลูกค้าติดตามสถานะได้ที่ `/account/history`
