# living-wealth-365

> **A Life Well Planned. A Life Well Lived.**  
> แพลตฟอร์มการวางแผนชีวิต สุขภาพองค์รวม และสถาปัตยกรรมการเงิน ผสานศาสตร์โลกกายภาพเข้ากับโลกภายใน คัดสรรโดย **Top & Joy**

---

## 🌿 ภาพรวมโครงการ (Project Overview)

**Living Wealth 365** คือ Life & Wellbeing Platform ที่ถือกำเนิดขึ้นจากแนวคิดการเชื่อมโยงความมั่นคงทางการเงินเข้ากับสุขภาพกายและจิตใจที่สงบสุข โดยมีผู้ร่วมก่อตั้ง **Top (นักวางแผนชีวิตและการเงิน)** และ **Joy (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)** ในฐานะ *"เพื่อนร่วมทาง (Fellow Travelers)"* ที่พร้อมรับฟังและร่วมค้นหาชีวิตที่ใช่

ระบบออกแบบภายใต้ **3 Core Gateways** และ **7 Content Pillars**:
1. **Living (วิถีชีวิต & ธรรมชาติ)**
   - **Life**: สมดุลชีวิต 6 มิติ (Life Map), การออกแบบเวลา และเป้าหมายชีวิต
   - **Wellbeing**: วิทยาศาสตร์การชะลอวัย (Longevity), สุขภาพระดับเซลล์ และ Home Health Sanctuary
   - **Earth & Energy**: แร่ธาตุธรรมชาติ คัดสรรตามหลักธรณีวิทยา ($SiO_2$), ประวัติศาสตร์ และจักระ
2. **Learning (การเรียนรู้ & การเงิน)**
   - **Wealth**: สถาปัตยกรรมการเงิน 4 เสาหลัก (ปกป้อง, ฉุกเฉิน, เติบโต, มรดก) และโปรแกรมคำนวณภาษี 2568
   - **Inner Life**: โลกภายใน, ศิลปะแห่งความเงียบสงบ (The Art of Stillness) และการสังเกตใจตนเอง
   - **Journal**: วารสารความคิด, Top's Notes, Joy's Journey และการสำรวจความหมายของการใช้ชีวิต
3. **Connecting (เพื่อนร่วมทาง)**
   - **About**: ปรัชญาชีวิตของ Top & Joy
   - **Let's Talk**: ระบบนัดหมายสนทนา 1-on-1 แบบเป็นกันเอง ปราศจากแรงกดดัน

---

## ✨ ฟีเจอร์เด่น (Key Features)

- 🧭 **Interactive Life Map (6 Dimensions)**: เครื่องมือประเมินวงล้อชีวิต 6 มิติ (สุขภาพ, การเงิน, เวลา, ความสัมพันธ์, โลกภายใน, เป้าหมาย) พร้อมกราฟเรดาร์ SVG และบทวิเคราะห์ภาพสะท้อนชีวิตแบบเรียลไทม์
- 🧮 **Personal Income Tax Calculator (2568)**: คำนวณภาษีเงินได้บุคคลธรรมดา ภ.ง.ด. 90/91 ตามอัตราก้าวหน้า 7 ขั้น พร้อมระบบจำลองลดหย่อนภาษีประกันและกองทุน Thai ESG
- 💎 **Earth & Energy 3D Visualizer**: คลังแร่ธาตุและคริสตัลธรรมชาติที่แยกมิติชัดเจนระหว่างวิทยาศาสตร์แร่ธาตุ โครงสร้างผลึก ประวัติศาสตร์อารยธรรม และพลังงานจักระ พร้อม 3D Gemstone Orb
- 🧘 **Mindfulness Pause Timer**: ตัวจับเวลาฝึกสติและลมหายใจ (1, 2, 5 นาที) พร้อมวงแหวนสมาธิและแสงกระเพื่อมผ่อนคลาย
- 🏡 **Home Health Sanctuary Checklist**: เช็กลิสต์ 5 นิสัยเปลี่ยนบ้านให้เป็นพื้นที่ฟื้นฟูสุขภาพระดับเซลล์และการนอนหลับลึก
- 🔒 **Advisor CRM & Admin CMS**: แดชบอร์ดติดตามลูกค้า (CRM Pipeline), ระบบจัดการบทความวารสาร 7 เสาหลัก และระบบจัดการแคตตาล็อกแร่ธาตุ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend (`/living wealth 365 front end`)
- **Core**: React 18 / Pure JavaScript (JSX)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI (Zen Glass Theme, Responsive 100%)
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Testing**: Node.js Native Test Runner (`node --test`)

### Backend (`/living wealth 365_backend`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma ORM (v5)
- **Security & Auth**: JWT, bcryptjs, CORS, Helmet
- **Uploads**: Multer File Storage

---

## 🚀 การติดตั้งและเริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Backend
```bash
cd "living wealth 365_backend"
npm install

# กำหนดค่า .env (DATABASE_URL, JWT_SECRET, PORT=5001)
# ดัน schema ขึ้น MySQL
npx prisma db push

# รัน seed ข้อมูลจำลองชุดใหญ่ (Users, 7 Pillars, Minerals, Insurance, Leads)
node prisma/seed.js

# เริ่มต้นเซิร์ฟเวอร์
npm run dev
```

### 2. ติดตั้ง Frontend
```bash
cd "living wealth 365 front end"
npm install

# รัน Unit Tests ตรวจสอบระบบ
npm test

# เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนา
npm run dev

# หรือ Build สำหรับ Production
npm run build
```

---

## 👤 บัญชีทดสอบในระบบ (Demo Accounts)

- **ผู้ดูแลระบบ (Admin)**: `admin_lw` / รหัสผ่าน: `Admin1234!`
- **ลูกค้าสมาชิก (Customer)**: `somchai_lw` / รหัสผ่าน: `Customer1234!`

---

## 📄 ใบอนุญาต (License)

ลิขสิทธิ์ © 2026 **Living Wealth 365 by Top & Joy**. สงวนลิขสิทธิ์ทุกประการ.
