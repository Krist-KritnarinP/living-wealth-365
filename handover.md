# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365
- **Objective**: Clean project scaffolding separating Frontend (`living wealth 365 front end`) and Backend (`living wealth 365_backend`) using pure React JS / Node.js (JavaScript, without TypeScript).
  - Frontend: React 19 (Vite, JavaScript), Tailwind CSS 4 + daisyUI 5 (Zen Glass theme installed).
  - Backend: Node.js Express (JavaScript), base `schema.prisma` configuration initialized.
- **Status**: Completed Full Screen, Universal Responsive (Mobile / iPad / Desktop), and All-Ages Accessible Typography implementation in `App.jsx`.

## 2. Core UI / UX Implementation in App.jsx
- **Full Screen UI Layout**: โครงสร้างแบบเต็มหน้าจอ (`min-h-screen w-full flex flex-col justify-between`) สวยงาม สบายตา
- **Universal Responsiveness**:
  - Smartphone (< 640px): เลย์เอาต์แนวตั้ง กะทัดรัด ตัวหนังสืออ่านง่าย ไม่ล้นหน้าจอ ปุ่มกดไม่ต่ำกว่า 48px
  - iPad / Tablet (640px - 1024px): 3 คอลัมน์สมดุลย์ รองรับทั้งแนวตั้งและแนวนอน
  - Desktop (> 1024px): ขยายเต็มตา พร้อม Zen Glass effect และ Backdrop blur
- **All-Ages Typography & Real-time Font Scaling**:
  - ตัวอักษรขนาดใหญ่ อ่านง่าย สบายตาทุกเพศ ทุกวัย
  - **มีปุ่มกดปรับขนาดตัวอักษรสดบน Navbar**: ปรับได้ 3 ระดับ (ปกติ A -> สบายตา A+ -> ขนาดใหญ่พิเศษ A++) อำนวยความสะดวกสำหรับผู้สูงวัย
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
│       ├── App.jsx                    # Full Screen, Universal Responsive & Accessible UI
│       ├── api.js                     # Base Axios client
│       ├── index.css                  # Zen Glass theme: Tailwind CSS 4 + daisyUI 5
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
