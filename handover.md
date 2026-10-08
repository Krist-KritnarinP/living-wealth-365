# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365 (Financial & Insurance Advisor)
- **Objective**: Scaffolding two distinct decoupled projects — Frontend (React.js pure JavaScript with Vite & Tailwind CSS 4 + daisyUI 5 Zen Glass theme) and Backend (Node.js Express with Prisma ORM in pure JavaScript), without TypeScript (`.ts` / `.tsx`), tailored for financial and insurance advisory services according to brand CI guidelines (`CI.jpg` and `Logo.jpg`).
- **Status**: Completed Initial Project Scaffolding, Package Installation, Prisma Schema Setup & Verification, daisyUI 5 Installation & Zen Glass Theme Integration.

## 2. Architecture & File Structure
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
│   ├── package.json                   # React 19, daisyUI 5.7.47, Tailwind 4, Lucide React, Axios
│   ├── note/
│   │   └── guidelines.md              # Engineering rules copy for frontend
│   ├── public/
│   │   ├── logo.jpg                   # Copied brand logo
│   │   └── ci.jpg                     # Copied brand CI
│   └── src/
│       ├── App.jsx                    # Landing page + Zen Glass classes (navbar zen-surface, card zen-surface, theme toggle)
│       ├── api.js                     # Axios API client pointing to backend (port 5001)
│       ├── index.css                  # Zen Glass theme: Tailwind CSS 4 + daisyUI 5 plugin definitions
│       └── main.jsx
│
└── living wealth 365_backend/         # Pure Node.js + Express (ES Modules, no TypeScript)
    ├── package.json                   # Express, Prisma, Zod, Helmet, Cors, Morgan
    ├── .env / .env.example            # Port 5001, SQLite DATABASE_URL="file:./dev.db"
    ├── note/
    │   └── guidelines.md              # Engineering rules copy for backend
    ├── prisma/
    │   ├── schema.prisma              # Comprehensive financial advisory data schema
    │   └── dev.db                     # SQLite database file
    └── src/
        ├── index.js                   # Express server entry point
        ├── lib/
        │   └── prisma.js              # PrismaClient singleton
        ├── middleware/
        │   └── errorHandler.js        # Zod & global error handler
        └── routes/
            ├── health.js              # GET /api/health
            ├── services.js            # GET /api/services
            ├── consultations.js       # GET /api/consultations, POST /api/consultations
            └── plans.js               # GET /api/plans, POST /api/plans
```

## 3. Brand Identity & UI Theme Reference
- **Theme**: Zen Glass (Tailwind CSS 4 + daisyUI 5)
  - Light theme: `zen-light` (default)
  - Dark theme: `zen-dark`
  - Cards: `card zen-surface`
  - Header: `navbar zen-surface`
  - Buttons: `btn btn-primary` (Deep Blue `#023E8D`), `badge badge-secondary` (Warm Gold `#FFB53B`), `btn btn-accent` (Crimson Red `#B62B1C`)
  - Alerts: `alert alert-success`, `alert alert-error`
  - Whitespace: sections `py-16 md:py-24`, container `max-w-6xl mx-auto px-6`
- **Tagline**: "มั่นคง • มั่งคั่ง • ยั่งยืน" (Life, Wealth, Health, Freedom, Happiness, Forever)

## 4. Key Contracts & API Endpoints
- **Base URL**: `http://localhost:5001/api`
- `GET /api/health`: Health status and uptime
- `GET /api/services`: Service catalog (Life Insurance, Health Insurance, Retirement Planning, Tax Planning, Investment Advisory, Wealth Transfer)
- `POST /api/consultations`: Create booking lead (validated with Zod)
  - Fields: `clientName`, `clientPhone`, `clientEmail`, `serviceCategory`, `monthlyBudget`, `notes`
- `GET /api/consultations`: Retrieve recent bookings
- `POST /api/plans`: Create financial plan
- `GET /api/plans`: Retrieve financial plans

## 5. Verification Commands and Results
- **Frontend Verification**:
  - Command: `npm run build` inside `living wealth 365 front end`
  - Result: **Passed** (Built with daisyUI 5.7.47 in 579ms, 0 errors).
- **Backend Verification**:
  - Command: `npx prisma generate` && `npx prisma db push`
  - Result: **Passed** (Prisma client generated, SQLite `dev.db` synchronized).
  - Command: `node src/index.js` + `curl http://localhost:5001/api/health` + `curl -X POST http://localhost:5001/api/consultations`
  - Result: **Passed** (Server started, endpoints returned 200/201 JSON responses).

## 6. How to Run
### Backend:
```bash
cd "living wealth 365_backend"
npm run dev
# Server will run on http://localhost:5001
```

### Frontend:
```bash
cd "living wealth 365 front end"
npm run dev
# Web app will run on http://localhost:5173
```

## 7. Security & Limitations
- Input validation implemented via Zod on backend consultation and plan routes.
- CORS restricted to configured origins (`http://localhost:5173`).
- Helmet middleware enabled for secure HTTP headers.
- Secrets kept in `.env` and excluded via `.gitignore`.
- Production note: When deploying to cloud, update `DATABASE_URL` in backend `.env` to PostgreSQL / MySQL and set appropriate CORS origins.
