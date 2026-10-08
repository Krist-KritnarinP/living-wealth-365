# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365
- **Objective**: Clean project scaffolding separating Frontend (`living wealth 365 front end`) and Backend (`living wealth 365_backend`) using pure React JS / Node.js (JavaScript, without TypeScript).
  - Frontend: React 19 (Vite, JavaScript), Tailwind CSS 4 + daisyUI 5 (Zen Glass theme installed).
  - Backend: Node.js Express (JavaScript), base `schema.prisma` configuration initialized.
- **Status**: Setup & packages installed cleanly. No unrequested tables or speculative UI pages. Ready for custom requirements.

## 2. Core UI / UX Requirements (Mandate)
- **Full Screen UI Layout**: การจัดวางหน้าเว็บทุกหน้าต้องเป็นแบบเต็มหน้าจอ (Full Screen) เพื่อให้เห็นข้อมูลชัดเจน เต็มพื้นที่
- **Cross-Device Responsiveness**: รองรับ Responsive สมบูรณ์แบบ 100%:
  - สมาร์ทโฟนทุกรุ่น (Smartphone)
  - ไอแพดและแท็บเล็ตทุกขนาด (iPad / Tablet ทั้งแนวตั้งและแนวนอน)
  - หน้าจอคอมพิวเตอร์ (Desktop / Laptop)
- **Accessible Typography & Readability**:
  - ตัวอักษรต้องมีขนาดที่อ่านง่าย สบายตา (High Legibility & Comfort)
  - เหมาะสำหรับทุกเพศ ทุกวัย (All genders & All age groups ครอบคลุมผู้สูงอายุ)
  - Contrast ระหว่างพื้นหลังและตัวหนังสือต้องชัดเจนตามเกณฑ์ Accessibility
- **Design System**: Zen Glass (Tailwind CSS 4 + daisyUI 5, `zen-light` และ `zen-dark`)

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
│       ├── App.jsx                    # Clean starter template demonstrating Zen Glass theme
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
