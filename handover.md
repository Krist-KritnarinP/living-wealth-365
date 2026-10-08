# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365
- **Objective**: Clean project scaffolding separating Frontend (`living wealth 365 front end`) and Backend (`living wealth 365_backend`) using pure React JS / Node.js (JavaScript, without TypeScript).
  - Frontend: React 19 (Vite, JavaScript), Tailwind CSS 4 + daisyUI 5 (Zen Glass theme installed).
  - Backend: Node.js Express (JavaScript), base `schema.prisma` configuration initialized.
- **Status**: Completed Balanced Typography Scale (reduced ~30% for ideal comfort) while preserving True 100% Full-Screen Edge-to-Edge UI Layout.

## 2. Core UI / UX Implementation in App.jsx & index.css
- **100% True Full-Screen & Edge-to-Edge Layout**:
  - ตัดข้อจำกัด `max-w-7xl` และ `max-w-6xl` ออกทั้งหมด เพื่อไม่ให้เหลือพื้นที่ว่างด้านซ้ายและขวา
  - Navbar, Hero, Services Grid, Values Ribbon, Contact และ Footer ขยายเต็มขอบหน้าจอ (`w-full px-4 sm:px-8 lg:px-12 xl:px-16`)
- **Balanced & Readable Typography Scale (ลดลง ~30% สบายตาทุกช่วงวัย)**:
  - Base html font-size: 16px, Body: 1rem (จากเดิม 19px / 1.15rem)
  - Headings: `text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black`
  - Subheadings & Paragraphs: `text-base sm:text-lg lg:text-xl font-normal leading-relaxed`
  - Badges & Buttons: `text-sm sm:text-base font-bold min-h-[44px] px-6 py-2.5`
  - สัดส่วนสวยงาม สมดุลย์ อ่านง่าย ชัดเจน ไม่เทอะทะ
- **Universal Responsiveness**:
  - Smartphone (< 640px): เลย์เอาต์แนวตั้ง เต็มหน้าจอ ไม่ล้นด้านข้าง สัมผัสง่าย
  - iPad / Tablet (640px - 1024px): 2-3 คอลัมน์ กระจายเต็มขอบจอทั้งแนวตั้งและแนวนอน
  - Desktop (> 1024px): ขยายเต็มตา 100% ไร้ขอบว่างด้านข้าง
- **Zen Glass Theme**: รองรับ Light Mode (`zen-light`) และ Dark Mode (`zen-dark`) สลับได้ที่ Navbar

## 3. Architecture & File Structure
```
living wealth 365/
├── CI.jpg                             # Brand Corporate Identity reference
├── Logo.jpg                           # Official logo image
├── note.md                            # Central multi-agent communication bridge
├── handover.md                        # Canonical handover & task progress document
├── note/
│   └── guidelines.md                  # Project rules & engineering philosophy
│
├── living wealth 365 front end/       # Pure React.js (Vite + JSX, no TypeScript)
│   ├── index.html                     # Configured with data-theme="zen-light"
│   ├── vite.config.js                 # Vite config with @tailwindcss/vite
│   ├── package.json                   # React 19, daisyUI 5, Tailwind 4, Lucide React, Axios
│   ├── note/
│   │   └── guidelines.md              # Engineering rules copy for frontend
│   └── src/
│       ├── App.jsx                    # True 100% Full-Screen & A++ Typography UI
│       ├── api.js                     # Base Axios client
│       ├── index.css                  # Zen Glass theme: Tailwind CSS 4 + daisyUI 5 + A++ Base
│       └── main.jsx
│
└── living wealth 365_backend/         # Pure Node.js + Express (ES Modules, no TypeScript)
    ├── package.json                   # Express, Prisma, Zod, Helmet, Cors, Morgan
    ├── .env / .env.example            # Port 5001, DATABASE_URL="file:./dev.db"
    ├── note/
    │   └── guidelines.md              # Engineering rules copy for backend
    ├── prisma/
    │   └── schema.prisma              # Clean base schema (generator & datasource, ready for user models)
    └── src/
        ├── index.js                   # Base Express server entry point
        ├── lib/
        │   └── prisma.js              # PrismaClient singleton
        ├── middleware/
        │   └── errorHandler.js        # Global error handler
        └── routes/
            └── health.js              # GET /api/health
```

## 4. How to Run
### Backend:
```bash
cd "living wealth 365_backend"
npm run dev
# Server runs on http://localhost:5001 (Health check: /api/health)
```

### Frontend:
```bash
cd "living wealth 365 front end"
npm run dev
# Runs on http://localhost:5173
```
