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
- **Mandatory Git Discipline**: นอกจากบันทึก `handover.md` แล้ว **ต้องทำ Git Commit ทุกครั้ง** หลังจบแต่ละขั้นตอนหรือ Milestone โดยห้ามละเลยเด็ดขาด
- **Mandatory Pre-Execution Review Protocol (ทวนคำสั่งและสรุปงานก่อนลงมือเสมอ)**: ก่อนลงมือทำโค้ดหรือแก้ไขระบบทุกครั้ง ต้องทวนคำสั่งของผู้ใช้และสรุปแผนงาน/ขั้นตอนทั้งหมดให้ผู้ใช้เห็นภาพก่อนเสมอ ห้ามลงมือทำเองโดยพลการโดยไม่ได้ทวนคำสั่งและสรุปงานก่อนเด็ดขาด

## 3. Stitch MCP Integration Status
- **Status**: Connected & Active via MCP Server `stitch`
- **Active Stitch Project**: **Living Wealth 365 Platform** (ID: `12978997839434193186`)
- **Design System**: "Serene Prosperity"
- **Screens Ready in Stitch**:
  1. `b4852686845247e1bfce03b97551ebc4`: Admin Dashboard - จัดการ Leads & ลูกค้า
  2. `783b9a1f41484fc7853dec4f0360842a`: Living Wealth 365 - หน้าแรก (Home)
  3. `1f458d8adfaa47c4b984ef45d97b380d`: ประกันชีวิต & สุขภาพ AIA และวางแผนภาษี
  4. `a631268e4e574f628c966b1ad88c4571`: คลังความรู้การเงินและวางแผนภาษี (Knowledge Hub)
  5. `db380ae3a1324a90bff3bd85629c708f`: สรุปสิทธิลดหย่อนภาษี 2567-2568 ฉบับสมบูรณ์ (Single Article)
  6. `28838cf132844eb7b36f55a420edfc63`: แคตตาล็อกสายมู & หินมงคล (Mu-Tae-Lu)

## 4. Architecture & File Structure
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
│       ├── App.jsx                    # Clean root coordinator component (Decomposed & Refactored)
│       ├── api.js                     # Base Axios client
│       ├── index.css                  # Zen Glass theme: Tailwind CSS 4 + daisyUI 5 + balanced base
│       ├── main.jsx
│       ├── constants/
│       │   └── content.js             # Structured business data & pillars constants (DRY)
│       └── components/                # Modular, cohesive components (Single Responsibility)
│           ├── Navbar.jsx             # Top navigation & theme toggle
│           ├── HeroSection.jsx        # Full-screen Hero banner & CTAs
│           ├── CoreValues.jsx         # 6 core values grid
│           ├── PillarsSection.jsx     # Financial pillars cards & selection
│           ├── ContactSection.jsx     # Contact info & promise checklist
│           └── Footer.jsx             # Full-width footer
│
└── living wealth 365_backend/         # Pure Node.js + Express (ES Modules, no TypeScript)
    ├── package.json                   # Express, Prisma, Zod, Helmet, Cors, Morgan
    ├── .env / .env.example            # Port 5001, DATABASE_URL (PostgreSQL / MySQL)
    ├── note/
    │   └── guidelines.md              # Engineering rules copy for backend
    ├── prisma/
    │   └── schema.prisma              # Official models: User, Lead, Post, Product, Wishlist, Enums: Role, LeadStatus
    └── src/
        ├── index.js                   # Base Express server entry point
        ├── lib/
        │   └── prisma.js              # PrismaClient singleton
        ├── middleware/
        │   └── errorHandler.js        # Global error handler
        └── routes/
            └── health.js              # GET /api/health
```

## 5. Master Architecture Specification (ARCHITECTURE.md)
- **Approved & Created**: `living wealth 365 front end/ARCHITECTURE.md`
- **Master Route Summary**:
  - **Public Routes**: `/` (Home), `/insurance/life`, `/insurance/non-life`, `/mutelu`, `/blog`, `/blog/:slug`, `/login`, `/register`, `/thank-you`
  - **Customer Routes (Role: CUSTOMER)**: `/account` (Overview), `/account/history` (Consultation status tracking), `/account/wishlist` (Saved auspicious items)
  - **Admin Routes (Role: ADMIN)**: `/admin/dashboard` (Leads CRM pipeline), `/admin/cms/blog`, `/admin/cms/products`
- **Clean Structure**: Separated Frontend (`src/pages/`, `src/components/`, `src/context/`, `src/api/`) and Backend (`prisma/`, `src/routes/`, `src/controllers/`, `src/middlewares/`).

## 6. Complete Frontend UI Implementation (End-to-End Prototype)
- **Status**: Completed full-page frontend implementation according to `ARCHITECTURE.md` (Pure React JS / JSX, zero TypeScript).
- **Public Pages**:
  - `HomePage.jsx` (`/`): Hero, 6 Core Values, 3 Pillars, Featured Mutelu, Featured Blog, Quick Lead form.
  - `LifeInsurancePage.jsx` (`/insurance/life`): AIA Health Happy, Multi-Pay CI, Retirement flow, LeadCaptureForm.
  - `NonLifeInsurancePage.jsx` (`/insurance/non-life`): Car insurance, Fire & Property, Group PA, LeadCaptureForm.
  - `MuteluPage.jsx` (`/mutelu`): Stone catalog, category filters, `StoneCalculator` (interactive day-of-week birth matcher), Wishlist ❤️ buttons, and Lead form.
  - `BlogPage.jsx` (`/blog`): Knowledge hub, search bar, category filters, responsive cards.
  - `BlogDetailPage.jsx` (`/blog/:slug`): Single article reader, author metadata, share action, consult CTA.
  - `LoginPage.jsx` (`/login`): Sign in with 1-Click fast login presets (Customer / Admin).
  - `RegisterPage.jsx` (`/register`): Sign up with birthDate for Mutelu calculation.
  - `ThankYouPage.jsx` (`/thank-you`): Lead reference ID, Meta conversion pixel tag, and navigation actions.
- **Customer Pages (Role: CUSTOMER)**:
  - `AccountDashboardPage.jsx` (`/account`): Personal info summary, birthDate edit, quick stats.
  - `AccountHistoryPage.jsx` (`/account/history`): Real-time Lead status tracking (`StatusBadge`: NEW 🟡, CONTACTED 🟢, CLOSED 🔵), advisor notes.
  - `AccountWishlistPage.jsx` (`/account/wishlist`): Saved auspicious stones, 1-click order / consult.
- **Admin Pages (Role: ADMIN)**:
  - `AdminDashboardPage.jsx` (`/admin/dashboard`): CRM pipeline table, status updating, note modal, phone call buttons, summary stats.
  - `AdminBlogPage.jsx` (`/admin/cms/blog`): CMS post list, publish/draft toggle, add post modal, delete post.
  - `AdminProductsPage.jsx` (`/admin/cms/products`): CMS products list, active toggle, add product modal, delete product.
- **Interactive State & Demo Tool**:
  - `AuthContext.jsx`: Reactive state for currentUser, theme, wishlist, leads, posts, products with localStorage persistence.
  - `RoleSwitcher.jsx`: Floating toolbar to test between Guest 👁️, Customer 👤, and Admin 🔒 in 1 click.
  - Build verified cleanly via `npm run build` with zero errors.

## 7. Professional CRM Dashboard, Bilingual Support, daisyUI Toast & Modal
- **Dashboard Layout with Collapsible Left Sidebar**:
  - Created `DashboardLayout.jsx` specifically for `/account/*` and `/admin/*` routes.
  - Collapsible Sidebar with smooth desktop expand/collapse rail (persisted in `localStorage`), mobile off-canvas drawer, badge counters, and direct user profile/logout footer.
  - Clean separation: Marketing `Navbar` and `Footer` are hidden inside `/account` and `/admin`, giving a pure professional SaaS CRM experience.
- **Bilingual Support (🇹🇭 TH / 🇬🇧 EN)**:
  - Created `LanguageContext.jsx` with instant translation switching across navigation, buttons, roles, and status messages.
  - Language switcher button placed on marketing `Navbar` and Dashboard `Topbar`.
- **daisyUI Toast & Modal System (Replaced `window.alert` & `window.confirm`)**:
  - Created `ToastContext.jsx` (`showToast(msg, type)`): Renders elegant floating alerts (`toast toast-top toast-end z-50`).
  - Created `ConfirmModal.jsx`: Reusable daisyUI modal replacing destructive `window.confirm` dialogs.
  - Replaced browser `alert` in article sharing with `showToast`.
- **Verification**: Verified via `npm run build` in 654ms with zero errors. Pure React JS (no TypeScript).

## 8. Dark Theme Logo, Sidebar Balance, and Admin Status Modernization
- **Dark Theme Transparent Logo**:
  - Extracted transparent assets: `logo-light.png`, `logo-dark.png` (radiant royal blue, luminous gold, and vivid red dot without white rectangular background), and square icon variants `logo-icon-light.png`, `logo-icon-dark.png`.
  - Created reusable `<BrandLogo />` component that automatically switches logo assets based on active theme (`zen-light` vs `zen-dark`) and collapsed state.
  - Replaced legacy `/logo.jpg` across `Navbar.jsx`, `DashboardLayout.jsx`, and `Footer.jsx`.
- **Sidebar Header Sizing & Balance (ตอนกาง & ตอนพับ)**:
  - Expanded Sidebar (`!collapsed`): Width upgraded from `w-64` to `w-72` (288px) to eliminate text clipping of "Living Wealth 365" and give generous padding to the collapse toggle button.
  - Collapsed Sidebar (`collapsed`): Perfectly centered the logo icon using `logo-icon-*.png` with a clean expand handle button centered below it.
- **Admin Status & Table Modernization (แก้ความเบียด & ดีไซน์ล้าสมัย)**:
  - `StatusBadge.jsx`: Redesigned as Modern Glass Glow Pills with soft ambient glow borders and animated pinging dots.
  - Status Changer: Replaced crude form `<select>` with an Interactive Dropdown Pill (`ChevronDown`), allowing 1-click status updating directly on the badge.
  - Table Layout: Combined customer avatar + name + phone, giving spacious padding (`py-4 pl-4`) and removing the duplicate status column.
  - Top KPI Cards: Upgraded to modern SaaS stat cards with large bold metrics, trend indicators, and glowing icon containers.
- **Verification**: Verified via `npm run build` in 998ms with zero errors.

## 9. How to Run
### Frontend:
```bash
cd "living wealth 365 front end"
npm run dev
# Runs on http://localhost:5173
```

### Backend:
```bash
cd "living wealth 365_backend"
npm run dev
# Server runs on http://localhost:5001 (Health check: /api/health)
```




