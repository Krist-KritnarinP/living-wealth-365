# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365
- **Objective**: Clean project scaffolding separating Frontend (`living wealth 365 front end`) and Backend (`living wealth 365_backend`) using pure React JS / Node.js (JavaScript, without TypeScript).
  - Frontend: React 19 (Vite, JavaScript), Tailwind CSS 4 + daisyUI 5 (Zen Glass theme installed).
  - Backend: Node.js Express (JavaScript), base `schema.prisma` configuration initialized.
- **Status**: Completed True 100% Full-Screen Edge-to-Edge UI Layout and Default A++ Extra Large Typography enforcement across the entire website.

## 2. Core UI / UX Implementation in App.jsx & index.css
- **100% True Full-Screen & Edge-to-Edge Layout**:
  - ตัดข้อจำกัด `max-w-7xl` และ `max-w-6xl` ออกทั้งหมด เพื่อไม่ให้เหลือพื้นที่ว่างด้านซ้ายและขวา
  - Navbar, Hero, Services Grid, Values Ribbon, Contact และ Footer ขยายเต็มขอบหน้าจอ (`w-full px-4 sm:px-8 lg:px-12 xl:px-16`)
- **Default A++ Typography Scale Across Entire Website**:
  - ปรับขนาดฟอนต์เริ่มต้นของทั้งเว็บเป็นระดับ **A++ (ขนาดใหญ่พิเศษ)**
  - Base html font-size: 19px, Body: 1.15rem (~22px)
  - Headings: `text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black`
  - Subheadings & Paragraphs: `text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed`
  - Badges & Buttons: `text-lg sm:text-2xl font-black min-h-[56px] px-8 py-3`
  - ออกแบบให้อ่านง่าย สบายตา ชัดเจนเป็นพิเศษสำหรับผู้รับบริการทุกเพศ ทุกวัย (รวมถึงผู้สูงอายุ)
- **Universal Responsiveness**:
  - Smartphone (< 640px): เลย์เอาต์แนวตั้ง เต็มหน้าจอ ไม่ล้นด้านข้าง ตัวหนังสือใหญ่ชัดเจน
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
