# Project Handover Document (handover.md)

## 1. Project Objective & Scope
- **Project**: Living Wealth 365
- **Official GitHub Repository**: `https://github.com/Krist-KritnarinP/living-wealth-365.git` (Remote: `origin`, Branch: `main`)
- **Mandatory Git Push Protocol**: ทุก Agent ที่เข้ามารับช่วงต่อ ต้องรัน `git commit` และ `git push origin main` ทุกครั้งหลังจบแต่ละขั้นตอนหรือ Milestone เพื่อให้ GitHub Repository ซิงค์ตรงกับโค้ดล่าสุดตลอดเวลา ห้ามปล่อยให้ค้างอยู่เฉพาะ local เด็ดขาด
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
- **Mandatory Git Discipline**: นอกจากบันทึก `handover.md` แล้ว **ต้องทำ Git Commit และ Git Push ขึ้น GitHub (`git push origin main`) ทุกครั้ง** หลังจบแต่ละขั้นตอนหรือ Milestone โดยห้ามละเลยเด็ดขาด เพื่อให้ทุก Agent ทำงานบนฐานโค้ดเดียวกันอย่างสมบูรณ์
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

## 9. Registration Form Confirm Password & Real-Time Validation
- **Added Confirm Password**:
  - Updated `RegisterPage.jsx` with dedicated `confirmPassword` input.
  - Implemented real-time password matching status: displays green `CheckCircle2` with "ตรงกัน" badge when matched, red badge "ไม่ตรงกัน" when mismatched.
  - Dynamic input border states: `input-success` on match, `input-error` on mismatch.
  - Form validation: checks password minimum length (>= 6 chars) with toast warning, and password match validation before customer login.
- **Verification**: Verified via `npm run build` in 940ms with zero errors.

## 10. Development Roadmap Documentation (roadmap.md)
- **Created Roadmap Specification**: `roadmap.md` placed in root directory documenting the 6 strategic development phases of Living Wealth 365.
- **Progress Tracking**:
  - Phase 1 (Discovery & Planning): Completed (Requirements, Tech Stack, Hosting Architecture, Schema, Notification strategy).
  - Phase 2 (UI/UX Design & Theming): Completed (CI Colors, Zen Glass theme, Wireframes, Screen layouts, Light/Dark logos).
  - Phase 3 (Frontend Development): Completed (Pure React JS, 100% Full-Screen, CRM Collapsible Sidebar, Bilingual, daisyUI Toasts/Modals, Confirm Password, Interactive Prototypes).
  - Phase 4 (Backend & API Integration): Next planned phase (Database setup, JWT Auth, Lead API, Webhook notifications).
  - Phase 5 (Testing & QA): Pending Phase 4 completion.
  - Phase 6 (Deployment & Launch): Pending Phase 5 completion.

## 11. Full Backend API, Local MySQL Workbench Prep, Password Strength Meter & Mobile Navigation
- **Strict Security & Git Hygiene**:
  - Tightened root `.gitignore`, frontend `.gitignore`, and backend `.gitignore`.
  - Strictly excluded all `.env*`, `.env.local`, keys, certificates, test artifacts (`playwright-report`, `test-results`), and logs from Git.
- **Backend Architecture & MySQL Integration (`living wealth 365_backend`)**:
  - Prepared connection path for local MySQL Workbench (`Service: Mysql@localhost:3306`, `User: root`).
  - Configured `DATABASE_URL="mysql://root:PASSWORD_HERE@localhost:3306/living_wealth_365"`.
  - Updated `prisma/schema.prisma` to MySQL datasource and added unique `username` field to `User` model.
  - Configured `JWT_SECRET` in `.env` (enforcing >= 10 characters requirement) with `src/lib/jwt.js`.
  - Implemented authentication & role middleware (`src/middleware/auth.js`) supporting Customer and Admin verification.
  - Implemented complete API routes:
    - `/api/auth`: register (with password >= 8 chars, unique username/email), login, me, profile update, logout.
    - `/api/leads`: create lead, list leads (admin CRM pipeline & customer history), update status/notes.
    - `/api/posts`: Blog CMS (public list, read single slug, admin create/update/delete).
    - `/api/products`: Mu-Tae-Lu CMS (public active catalog, admin create/update/delete).
    - `/api/wishlist`: Customer auspicious item wishlist management.
- **Frontend Password Strength Meter & Single-Column Register Page**:
  - Redesigned `RegisterPage.jsx` into a clean, 100% single-column layout.
  - Separated `username` (3-30 chars, alphanumeric + _) and `name` (Full Name) into distinct fields.
  - Implemented interactive Password Strength Meter starting at 8 characters:
    - Visual color-coded progress bar (Weak / Medium / Strong).
    - Real-time criteria checklist:
      1. Minimum 8 characters (Weak / ง่าย)
      2. Upper & lower case letters (A-Z, a-z)
      3. Numbers (Medium / ปานกลาง)
      4. Special characters `@$!%*?#&` (Strong / ยาก - ปลอดภัยสูง)
    - Real-time matching indicator for Confirm Password (`CheckCircle2` "ตรงกัน" / `XCircle` "ไม่ตรงกัน").
- **Mobile Responsive Navigation (< 390px)**:
  - Redesigned `Navbar.jsx` for compact viewports: secondary actions (language switcher, theme switcher, wishlist) tucked into mobile drawer, completely preventing menu overflow on screens < 390px.
  - Preserved bilingual support (`useLanguage`) and W3C ARIA accessibility in dialogs and modals (ESC key listener, focus trap).
- **Data Continuity & Form Validation**:
  - Integrated `normalizePhone` and `validPhone` for 9-10 digit Thai numbers.
  - Added selected product summary card to `LeadCaptureForm.jsx` when selecting auspicious stones.
  - Forwarded real lead reference ID and details to `ThankYouPage.jsx`.
  - Added 6 Node.js unit tests (`tests/validation.test.js`) verifying phone normalization, username, password meter, birth date, registration validation, and safe redirects.

## 12. How to Run
### Frontend:
```bash
cd "living wealth 365 front end"
npm test      # Runs 6 unit tests
npm run dev   # Runs on http://localhost:5173
```

### Backend:
```bash
cd "living wealth 365_backend"
npm start     # Runs on http://localhost:5001 (Health check: /api/health)
```

## 13. Live MySQL Backend Integration & Insurance Plan CMS (Latest Milestone)
- **Local MySQL Workbench & Prisma Synchronization**:
  - Connected backend to local MySQL (`mysql://root:***@localhost:3306/living_wealth_365`).
  - Added `InsurancePlan` model in `schema.prisma` with fields: `id`, `type` (LIFE / NON_LIFE), `category`, `categoryName`, `name`, `slug`, `tagline`, `coverageAmount`, `startingPrice`, `features` (JSON string array), `recommendedFor`, `description`, `isActive`, `sortOrder`, `createdAt`, `updatedAt`.
  - Executed `npx prisma db push` to generate and apply database tables cleanly.
- **Comprehensive Database Seeding (`seed.js`)**:
  - **Admin User**: `admin_lw` (`admin@livingwealth365.com` / `Admin@365Living!`)
  - **Customer User**: `somchai_lw` (`somchai@example.com` / `Customer@123`)
  - **7 Insurance Plans Seeded**:
    1. *AIA Health Happy เหมาเบิ้ลคุ้ม* (HEALTH) - วงเงิน 5-25 ล้านบาท
    2. *AIA Multi-Pay CI โรคร้ายเจอจ่ายหลายรอบ* (CRITICAL_ILLNESS) - วงเงิน 1-5 ล้านบาท
    3. *AIA Annuity Fix วางแผนเกษียณมีเงินใช้* (RETIREMENT) - วงเงินคืนปีละ 12-24%
    4. *AIA Super Care คุ้มครองตลอดชีพ* (LIFE) - วงเงิน 1-10 ล้านบาท
    5. *ประกันรถยนต์ชั้น 1 ซ่อมห้าง* (MOTOR) - วงเงิน 2,000,000 บาท
    6. *ประกันอัคคีภัย & ทรัพย์สิน Home Safety 365* (PROPERTY) - วงเงิน 5,000,000 บาท
    7. *ประกันอุบัติเหตุส่วนบุคคล PA Plus* (PA) - วงเงิน 1,000,000 บาท
  - **Mu-Tae-Lu Stone Products**: 6 auspicious bracelets and stones with full descriptions, prices, and stock.
  - **Knowledge Articles**: 3 financial and tax planning blog articles.
  - **Sample Leads & Customer Wishlist**: Pre-seeded for immediate testing in Admin CRM and Customer Account.
- **Backend API Endpoints (`/api/insurance-plans`)**:
  - `GET /api/insurance-plans`: Public endpoint to query active insurance plans with optional `?type=LIFE|NON_LIFE` and `?category=...` filters.
  - `GET /api/insurance-plans/:slug`: Public endpoint to fetch single plan details.
  - `POST /api/insurance-plans`: Admin-only endpoint to create new plans.
  - `PATCH /api/insurance-plans/:id`: Admin-only endpoint to update plan details, pricing, coverage, or toggle `isActive`.
  - `DELETE /api/insurance-plans/:id`: Admin-only endpoint to remove plans.
- **Frontend Plan Comparison & Lead Capture**:
  - Created `PlanCard.jsx` displaying coverage highlights, price per year, bullet features, and "ดูรายละเอียด" modal.
  - "ขอรับข้อเสนอแผนนี้" button passes the chosen plan into `LeadCaptureForm.jsx` as an active selection card.
  - Integrated into `LifeInsurancePage.jsx` and `NonLifeInsurancePage.jsx`.
- **Admin Insurance CMS (`AdminInsurancePage.jsx`)**:
  - Mounted route: `/admin/cms/insurance` (`ROUTES.ADMIN_INSURANCE`).
  - Added to Admin sidebar in `DashboardLayout.jsx` with real-time plan count badge.
  - Features: Type filter (All / ประกันชีวิต / ประกันวินาศภัย), Search by name/tagline, toggle active status directly from table, Add/Edit modal with multi-feature tags, and delete confirmation modal.
- **Frontend Live API & Graceful Offline Fallback**:
  - `AuthContext.jsx` connects to live backend on mount (`http://localhost:5001/api/...`).
  - Utilizes `Promise.allSettled` to guarantee the application never crashes or shows white screens if the backend or database is restarting.
## 14. UI/UX Polishing: Custom Contact & Call Modal and Table Pill Badges
- **Custom Contact & Call Modal (`AdminDashboardPage.jsx`)**:
  - Replaced the raw `<a href="tel:...">` which triggered the browser's native popup alert (`Open Phone?`) on desktop browsers with an interactive **Custom Contact Modal**.
  - **Features**:
    - Displays full customer details: Name, Lead ID, Topic/Interest, Convenient time, and current Status badge.
    - Large phone number display with **1-Click Copy** (`คัดลอกเบอร์โทร`) providing immediate clipboard copy and visual feedback without browser popups.
    - Deliberate "โทรออก (tel:)" button for mobile or desktop softphone users.
    - 1-Click shortcut to transition status from `NEW` to `CONTACTED` ("ปรับเป็น 'กำลังคุยแผน'").
    - Shortcut to open the consultation note modal directly ("จดบันทึกการคุย").
    - Closes gracefully via backdrop click, top-right close button, or ESC key.
- **Table Status & Category Pill Badges (Anti-Squish Fix)**:
  - Fixed squished/wrapped badges across `AdminInsurancePage`, `AdminProductsPage`, `AdminBlogPage`, and `StatusBadge`.
  - Applied `whitespace-nowrap`, comfortable padding (`px-3 py-1.5`), and minimum column widths to prevent Thai words (e.g. "เปิดใช้งาน", "วางแผนเกษียณ & บำนาญ") from wrapping into multiple overlapping lines.
  - Implemented cohesive Zen Glass semi-transparent pill style with matching theme colors.
- **Full-Width Modal Form Layout (`AdminInsurancePage`, `AdminProductsPage`, `AdminBlogPage`)**:
  - Replaced legacy `.form-control` and `.label` inline-flex behaviors which caused labels and input boxes to sit awkwardly side-by-side with half-empty widths.
  - Upgraded all modal fields to modern `flex flex-col gap-1.5 w-full` with `w-full` inputs and textareas.
  - Labels now sit cleanly on top of each field, and every input/select/textarea stretches 100% full-width across the container.
## 15. Google Translate Engine Integration & Brand Term Protection
- **Whole-Website Automatic Translation Integration**:
  - Embedded Google Translate Engine via `index.html` with callback `googleTranslateElementInit`.
  - Tied directly to the existing `toggleLanguage()` button in `LanguageContext.jsx` and `Navbar.jsx`.
  - Clicking `🇹🇭 TH` / `🇬🇧 EN` automatically translates **all paragraphs, cards, descriptions, blog posts, and dynamic content on the entire website on-the-fly** via Google Neural Machine Translation (NMT).
- **React Virtual DOM Crash Prevention**:
  - Added safe DOM node patch (`Node.prototype.removeChild` and `Node.prototype.insertBefore`) in `index.html` to eliminate any potential React virtual DOM desynchronization issues caused by Google Translate text node mutations.
- **Clean Zen UI Preservation**:
  - Applied CSS overrides in `index.css` to hide Google's default iframe banner, popups, and highlight tooltips.
  - Ensures the layout never shifts (`top: 0px !important`) and maintains the sleek Zen Glass navigation aesthetic.
- **Brand Name & Key Terms Protection (`notranslate`)**:
  - Added `notranslate` class and `translate="no"` attributes to "Living Wealth 365" brand identity in `Navbar.jsx` and `Footer.jsx` to prevent the brand name from being translated or mangled.
## 16. Bug Fix: Blog Author Object Rendering Resolution
- **Issue**:
  - Accessing `http://localhost:5173/admin/cms/blog` triggered React Error: `Uncaught Error: Objects are not valid as a React child (found: object with keys {name, username})`.
- **Root Cause**:
  - The live backend MySQL API (`GET /api/posts`) includes author relation as an object: `author: { name: '...', username: '...' }`.
  - Frontend was directly attempting to render `{post.author}` as a child in JSX table cells and blog cards without checking for object type.
- **Solution**:
  - Normalized `author` and `publishedAt` in `AuthContext.jsx` upon fetching from API.
  - Added safe fallback extraction (`typeof post.author === 'object' ? post.author?.name || post.author?.username : post.author`) across:
    - `AdminBlogPage.jsx`
    - `BlogPage.jsx`
    - `BlogDetailPage.jsx`
## 17. 100% True Full-Screen Dashboard Expansion (Edge-to-Edge)
- **Elimination of Max-Width Constraints**:
  - Removed restrictive `max-w-7xl` and `max-w-6xl` containers across all internal CRM and CMS dashboard pages.
  - Replaced with true edge-to-edge `w-full` layout in:
    - `AdminInsurancePage.jsx` (Insurance Plans CMS)
    - `AdminDashboardPage.jsx` (Leads CRM Pipeline)
    - `AdminProductsPage.jsx` (Auspicious Items CMS)
    - `AdminBlogPage.jsx` (Knowledge Hub CMS)
    - `AccountDashboardPage.jsx` (Customer Profile)
    - `AccountHistoryPage.jsx` (Consultation History)
    - `AccountWishlistPage.jsx` (Saved Wishlist)
  - Tables, metric cards, action toolbars, and search filters now stretch 100% across the full viewport width without any vacant gaps on the right side.
- **Verification**:
  - All 6 unit tests passing (`npm test`).
  - Production build clean (`npm run build` passed in 659ms).

## 18. Multi-Format File Upload System (Images & PDF Brochures with DaisyUI Radial Progress)
- **Backend Architecture (`living wealth 365_backend`)**:
  - Integrated `multer` disk storage in `src/routes/upload.js`.
  - Configured safe sanitized unique file naming (`${baseName}-${timestamp}-${random}.${ext}`).
  - Strict MIME type filter: Images (`JPG`, `PNG`, `WebP`, `GIF`, `SVG`) and Documents (`application/pdf`) with 25MB file size limit.
  - Automatic `uploads/` directory creation and static asset serving via `app.use('/uploads', express.static(...))`.
  - Configured `helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })` to ensure cross-origin asset loading between frontend (port 5173) and backend (port 5001).
  - Protected with `authenticateUser` and `requireAdmin` middleware.
  - `.gitignore` updated to prevent uploaded media from entering version control.
- **Frontend Architecture (`living wealth 365 front end`)**:
  - Added `uploadApi.uploadFile(file, onProgress)` with Axios upload progress tracking and `resolveAssetUrl` helper in `src/api.js`.
  - Built reusable `FileUploadZone.jsx` component:
    - Dedicated `+` button and drag-and-drop dropzone.
    - Uses exact DaisyUI `radial-progress` with `--value: [percent]`, `aria-valuenow`, and `role="progressbar"` during upload.
    - Image preview thumbnail with "เปลี่ยน (+)" and "ลบ (Trash)" actions.
    - PDF document badge with direct preview link.
    - Optional manual URL entry fallback.
- **Admin CMS Integration**:
  - `AdminInsurancePage.jsx`: Cover image (`imageUrl`) + PDF brochure (`brochureUrl`) upload zones. Table displays cover thumbnail and 1-click PDF badge.
  - `AdminBlogPage.jsx`: Cover image (`imageUrl`) upload zone. Table displays article thumbnail.
  - `AdminProductsPage.jsx`: Auspicious product image (`imageUrl`) upload zone. Table displays product thumbnail.
- **Public Website Integration**:
  - `PlanCard.jsx`: Displays cover image and "ดาวน์โหลดโบรชัวร์ (PDF)" button in both card view and detail comparison modal.
  - `ProductCard.jsx`, `BlogPage.jsx`, and `BlogDetailPage.jsx`: Fully integrated with `resolveAssetUrl` and image fallbacks.
## 19. Item Editing Implementation in Blog CMS & Products CMS
- **Identified Gap**:
  - `AdminBlogPage.jsx` and `AdminProductsPage.jsx` only had delete actions (`Trash2`) in their tables and only supported creation (`handleCreate`) without editing state.
- **Implementation in `AdminBlogPage.jsx`**:
  - Added `editingPost` state and `handleOpenAdd()` / `handleOpenEdit(post)` handlers.
  - Added `Edit2` pencil button in the action column next to delete.
  - Pre-populates all post fields (title, category, readTime, excerpt, content, imageUrl) when clicking edit.
  - Form switches dynamically to edit mode: Title "แก้ไขบทความความรู้", submit button "บันทึกการแก้ไข", calling `updatePost(editingPost.id, formData)`.
- **Implementation in `AdminProductsPage.jsx`**:
  - Added `editingProduct` state and `handleOpenAdd()` / `handleOpenEdit(prod)` handlers.
  - Added `Edit2` pencil button in the action column next to delete.
  - Pre-populates all product fields (name, category, price, dayMatch, element, description, imageUrl) when clicking edit.
  - Form switches dynamically to edit mode: Title "แก้ไขข้อมูลสินค้าหินมงคล", submit button "บันทึกการแก้ไข", calling `updateProduct(editingProduct.id, formData)`.
- **Verification**:
  - Unit tests passing 6/6 (`npm test`).
  - Production build clean (`npm run build` passed in 665ms).

## 20. Personal Income Tax Calculator (ระบบคำนวณภาษีเงินได้บุคคลธรรมดา ภ.ง.ด. 90/91)
- **Engine Implementation (`src/utils/taxCalculator.js`)**:
  - Implements Thai Revenue Department (กรมสรรพากร) progressive tax brackets (0% - 35%):
    - 0 – 150,000 THB: 0% (ยกเว้น)
    - 150,001 – 300,000 THB: 5%
    - 300,001 – 500,000 THB: 10%
    - 500,001 – 750,000 THB: 15%
    - 750,001 – 1,000,000 THB: 20%
    - 1,000,001 – 2,000,000 THB: 25%
    - 2,000,001 – 5,000,000 THB: 30%
    - เกิน 5,000,000 THB: 35%
  - Standard statutory expenses (50% up to 100,000 THB).
  - Deductions support:
    - Personal allowance (60,000 THB)
    - Spouse allowance (60,000 THB)
    - Children allowance (30,000 THB / person)
    - Parent allowance (30,000 THB / person)
    - Social security (max 9,000 THB)
    - General & health life insurance (max 100,000 THB)
    - Annuity / pension insurance (max 15% of income, up to 200,000 THB)
    - Retirement funds (Provident fund, RMF, SSF/Thai ESG)
    - Home mortgage interest (max 100,000 THB)
  - Tax-saving opportunity analysis: Computes remaining life/annuity insurance deduction quota and calculates potential cash tax savings (`remainingQuota * marginalRate`).
- **Interactive UI (`src/pages/public/TaxCalculatorPage.jsx`)**:
  - Full-screen responsive 12-column Zen Glass layout.
  - Interactive inputs with quick preset income buttons, real-time recalculation, and progressive bracket step visualizer.
  - Highlights tax savings with a 1-click consultation modal integrating `LeadCaptureForm` pre-filled with interest "วางแผนภาษีและลดหย่อนภาษีบุคคลธรรมดา".
- **Navigation Integration**:
  - Route: `/tax-calculator` (`ROUTES.TAX_CALCULATOR`).
  - Top Navbar: Added "คำนวณภาษี" (TH) / "Tax Calculator" (EN) navigation link.
  - Hero Section: Prominent "คำนวณภาษีเบื้องต้น" CTA button with `Calculator` icon.
  - 3 Pillars Section: "บริหารภาษี & ส่งต่อมรดก" links directly to the tax calculator.
  - Footer: "คำนวณและวางแผนภาษีบุคคลธรรมดา" link under บริการและการวางแผน.
- **Verification & Test Coverage (`tests/taxCalculator.test.js`)**:
  - 4 dedicated unit tests covering 0% threshold, progressive tiers (5%, 10%), tax deduction savings, and zero/negative input safeguards.
  - All 10 project tests passing cleanly (`npm test`).
  - Production build successful (`npm run build`).

## 21. Spectacular Birthday Stone Calculator Visual FX & 3D Gemstone Display
- **Visual Design & FX Engine (`src/components/mutelu/StoneCalculator.jsx`)**:
  - **Dynamic Ambient Backdrop Glow**: Large soft blurred radial-gradient halo placed behind the Zen Glass container that morphs colors and pulses (`animate-pulse-glow`) in real time according to the active day.
  - **Celestial Day Selector Tabs**:
    - Complete cosmic palette for all 7 days with astrological symbols (☀️ 🌙 🌸 🌿 👑 💎 🪐) and dual-tone sacred color dots.
    - Active tab elevates with scaled size (`scale-105`), glowing ring, and day-specific vibrant gradient.
    - Inactive tabs feature responsive hover glows matching the day's auspicious color.
  - **3D Gemstone Crystal Orb Display**:
    - Floating gemstone sphere (`animate-float-gem`) with realistic radial gradients reflecting the authentic gemstone color (Ruby Gold, Tiger Eye Amber, Rose Quartz Pink, Emerald Malachite, Imperial Golden Topaz, Sapphire Cyan, Cosmic Amethyst Violet).
    - High-gloss specular highlight arc, rotating dashed outer halo ring (`animate-aura-spin-slow`), counter-rotating glow circle, and 4 floating twinkling stars (`animate-sparkle-twinkle`).
    - Genuine product thumbnail integration with real pricing when matched from database products.
  - **The Epic Shimmer CTA Button**:
    - Full-width day-themed glowing gradient button.
    - Continuous light streak sweep animation (`animate-shimmer-sweep`) with hover scaling (`hover:scale-[1.01]`).
- **Animation Suite in `src/index.css`**:
  - Added keyframes and utility classes: `animate-shimmer-sweep`, `animate-pulse-glow`, `animate-float-gem`, `animate-sparkle-twinkle`, and `animate-aura-spin-slow`.
- **Verification**:
  - All 10 test suites passed (`npm test`).
  - Production build cleanly succeeded in 781ms (`npm run build`).

## 22. Integration of Tax Calculator into Knowledge Hub & Refinement of Stone Calculator
- **Consolidation of Tax Calculator into Knowledge Hub (`/blog`)**:
  - Extracted tax computation engine and UI into reusable component [`src/components/tax/TaxCalculator.jsx`].
  - Transformed [`src/pages/public/BlogPage.jsx`] into an All-in-One Hub with Feature Switcher:
    - 📰 **คลังบทความความรู้ (Knowledge Articles)**: Category filter, search, and cross-feature tax banner.
    - 🧮 **โปรแกรมคำนวณภาษี ภ.ง.ด. 90/91 (Tax Calculator)**: Interactive tax calculator with progressive brackets and AIA lead capture consultation modal.
    - Supports URL query parameter: `/blog?tab=calculator` switches directly to the tax calculator.
  - Streamlined Navbar: Consolidated under "คลังความรู้ & ภาษี" (`/blog`), keeping top menu uncluttered.
  - Redirect: `/tax-calculator` smoothly navigates to `/blog?tab=calculator`.
- **Refinement of Birthday Stone Calculator (`StoneCalculator.jsx`)**:
  - **Compact Dimensions**: Reduced nested redundant box containers; unified into a balanced, well-proportioned `max-w-4xl` frame with comfortable padding.
  - **Dynamic Theme Gradient Background**: Replaced plain white background with tailored multi-color gradients shifting in real-time according to the selected day's sacred palette (e.g., warm amber-orange for Thursday, emerald-jade for Wednesday, rose-quartz for Tuesday).
  - **Zero Overflow Guarantee**: Contained sparkles inside bounds, shortened and beautified CTA button label (`truncate max-w-[85%]`), ensuring clean responsive wrapping on all screen sizes.
- **Verification**:
  - All 10 test suites passed (`npm test`).
  - Production build successful (`npm run build` completed in 767ms).

## 23. Elimination of Stuck Leading Zeros & Frictionless Numeric Inputs in Tax Calculator
- **Identified UX Friction**:
  - Input fields initialized with numeric `0` caused the digit "0" to persist in inputs; pressing backspace converted `""` back to `0`, making it impossible to erase the leading zero when typing (e.g. typing resulted in "050000").
- **Solution Implementation (`src/components/tax/TaxCalculator.jsx`)**:
  - **Blank State Representation**: Fields defaulting to zero (`otherIncome`, `annuityInsurance`, `providentFundAndRmf`, `homeLoanInterest`) now initialize with empty string `""` paired with `placeholder="0"`.
  - **`handleNumberInput(setter, max)` Engine**:
    - Supports blank clearing: Backspacing to empty sets `""` instead of reverting to `0`.
    - Auto-strips leading zeros: Uses `raw.replace(/^0+(?=\d)/, '')` so typing after 0 instantly becomes clean numbers without manual cursor adjustment.
    - Honors statutory ceilings (e.g., social security max 9,000, life insurance max 100,000).
  - **`onFocus={(e) => e.target.select()}`**:
    - Clicking or tabbing into any numeric input auto-selects the entire value, allowing instant overwrite without manual backspacing.
  - **Robust Real-Time Calculation**:
    - Converts inputs via `Number(val) || 0` prior to invoking `calculatePersonalTax`, preserving flawless live reactive computation.
- **Verification**:
  - All 10 unit test suites passed (`npm test`).
  - Production build clean (`npm run build` in 886ms).

## 24. Strategic Transformation to 7-Pillar Platform, Top & Joy Personal Brand, and Blueprint Architecture
- **Paradigm Shift from Transactional E-commerce to Holistic Life & Wellbeing Platform**:
  - Transformed the platform identity according to the Blueprint PDF: *"A Life Well Planned. A Life Well Lived."*
  - Positioned **Top & Joy** as fellow travelers and trusted curators rather than corporate sales gurus.
  - Organized content and navigation into **3 Core Gateways** and **7 Content Pillars**:
    - **Living (วิถีชีวิต & ธรรมชาติ)**: `LIFE` (สมดุล 6 มิติ), `WELLBEING` (อายุวัฒนะ & สุขภาพระดับเซลล์), `EARTH_ENERGY` (แร่ธาตุธรรมชาติ & จักระ)
    - **Learning (การเรียนรู้ & การเงิน)**: `WEALTH` (สถาปัตยกรรมการเงิน 4 เสา & ประกัน & ภาษี), `INNER_LIFE` (โลกภายใน & สมาธิ), `JOURNAL` (วารสาร & Top's Notes)
    - **Connecting (เพื่อนร่วมทาง)**: `ABOUT` (ปรัชญาชีวิต & Top & Joy), `Let's Talk` (นัดหมายพูดคุยฟรี 1-on-1)
- **Database & Prisma Architecture Upgrade (`schema.prisma` & MySQL)**:
  - Added Enums: `ContentPillar` (7 pillars), `PostType` (`ARTICLE`, `TOPS_NOTES`, `JOURNEY`, `EXPLORING`), `EarthAspect` (`SCIENCE`, `HISTORY`, `CULTURE`, `CHAKRA_ENERGY`, `PERSONAL_EXP`).
  - Extended `Post` model with: `pillar`, `postType`, `authorName`, `readTime`, `tags`.
  - Extended `Product` model with: `aspect`, `chakra`, `mineralFormula`, `isCurated`.
  - Executed `npx prisma db push` and `npx prisma generate` without data loss or breaking changes.
- **Comprehensive Database & Mock Data Seeding**:
  - Implemented `prisma/seed.js` and synchronized with `src/constants/mockData.js`:
    - Seeded users: `admin_lw` (System Admin), `top_curator` (Top), `joy_curator` (Joy), `somchai_lw` (Customer).
    - Seeded 15 comprehensive articles/notes across all 7 pillars.
    - Seeded 8 curated mineral/crystal pieces featuring precise chemical formulas (e.g. SiO₂, Cu₂CO₃(OH)₂) and chakra alignments.
    - Seeded 7 insurance and wealth protection plans + 4 realistic leads in CRM.
- **Frontend Architecture & Page Implementations**:
  - **`LifeMapTeaser.jsx`**: Interactive 6-dimension Life Map SVG radar wheel with real-time balance score and personalized insights.
  - **`HomePage.jsx`**: Hero hook (*"วันนี้...อะไรคือสิ่งที่คุณอยากรักษาไว้?"*), 3 Core Gateways, interactive Life Map, Top & Joy story, curated minerals, and warm Let's Talk CTA.
  - **`Navbar.jsx` & `Footer.jsx`**: 3 Gateways navigation with mega-menu dropdowns, responsive mobile drawer, and Top & Joy brand signature.
  - **`LifePage.jsx` (`/life`)**: 6 Dimensions framework, non-negotiables, retirement living guide.
  - **`WealthPage.jsx` (`/wealth`)**: 4 Pillars of Wealth Architecture, protection catalog, and seamlessly embedded **Tax Calculator**.
  - **`WellbeingPage.jsx` (`/wellbeing`)**: Cellular longevity science, circadian rhythm, and interactive **Home Health Sanctuary Checklist**.
  - **`InnerLifePage.jsx` (`/inner-life`)**: The Art of Stillness, interactive **Mindfulness Pause Breathing Timer**, and self-inquiry framework.
  - **`EarthEnergyPage.jsx` (`/earth-energy`)**: Clear distinction between Mineral Physics (SiO₂ Piezoelectricity), Chakras, and 6,000-year history; includes interactive **3D Gemstone Visualizer**.
  - **`JournalPage.jsx` (`/journal`)**: Dual filter system by Pillar and Content Type (Top's Notes, Joy's Journey, Articles, Exploring).
  - **`AboutPage.jsx` (`/about`)**: Personal profiles of Top & Joy, core values, and `#talk` appointment capture.
- **Admin CMS Enhancement**:
  - Updated `AdminBlogPage.jsx` with Pillar and Post Type selectors, author attribution, and tag management.
  - Updated `AdminProductsPage.jsx` with Aspect selector, Chakra input, Mineral Formula input, and curated piece tags.
  - Updated `DashboardLayout.jsx` with upgraded sidebar navigation labels.
- **Verification & Quality Assurance**:
  - Unit Tests: 10/10 test suites passed (`npm test` in 125ms).
  - Production Build: Clean Vite bundle build (`npm run build` completed in 884ms).

## 25. GitHub Remote Setup & Initial Repository Push
- **Repository Setup**:
  - Created root [`README.md`](file:///Users/kritnarinp/Desktop/living%20wealth%20365/README.md) detailing the 7-pillar platform architecture, tech stack, getting started guide, and key features.
  - Linked remote repository: `https://github.com/Krist-KritnarinP/living-wealth-365.git`.
  - Configured upstream branch `main`.
- **First Push**:
  - Successfully pushed all commits, models, seed data, and frontend components to GitHub (`git push -u origin main`).
  - Verified repository is clean and synchronized.
- **Handover & Multi-Agent Synchronization**:
  - Updated Section 1 & Section 2 of `handover.md` to establish the GitHub Repository URL and Mandatory Git Push Protocol at the very top.
  - Updated `note.md` (Project Overview & Multi-Agent Collaboration Protocol Rule 5) so all incoming agents immediately recognize the GitHub repository and run `git push origin main` after committing.
  - Updated `note/guidelines.md` across root, backend, and frontend with the mandatory push policy.

## 26. Supabase PostgreSQL Configuration & Live Database Migration
- **Database Architecture**: Successfully migrated from local MySQL to cloud-hosted **Supabase PostgreSQL** (`aws-0-ap-southeast-2.pooler.supabase.com:5432`).
- **Connection Configuration**:
  - `DATABASE_URL` & `DIRECT_URL`: Configured to the session-mode pooler direct connection on port 5432, enabling both Express API queries and Prisma CLI DDL migrations seamlessly.
  - Safe `.env` management: Kept local and strictly ignored in `.gitignore`.
- **Live Synchronization & Schema Push**:
  - Executed `npx prisma db push` targeting Supabase `postgres` public schema in 16.42s with zero errors.
  - Generated Prisma Client v5.22.0.
- **Data Seeding & Verification**:
  - Executed `node prisma/seed.js` and successfully seeded:
    - 4 Users (`admin_lw`, `top_curator`, `joy_curator`, `somchai_lw`)
    - 15 Knowledge & Journal posts across 7 Pillars
    - 8 Curated Earth & Energy minerals/crystals with chemical formulas & chakra mappings
    - 7 AIA Life & Health protection plans
    - 4 Consultation leads in CRM
    - Customer wishlist bookmark
  - Verified live Supabase querying via Prisma Client: `{ users: 4, posts: 15, products: 8, plans: 7, leads: 4 }`.
## 27. Expanded Comprehensive Database Seeding on Supabase (Double Scale)
- **Objective**: Scale up the platform database with a large, realistic, authentic dataset covering all 7 pillars, advanced wealth planning, active longevity science, mineral physics, and CRM leads.
- **Backend Database Seeding Execution (`prisma/seed.js`)**:
  - **9 Users**:
    - Admins: `admin_lw` (System Admin), `top_curator` (Top), `joy_curator` (Joy), `dr_kanokwan` (Longevity & Wellness Medical Advisor).
    - Customers: `somchai_lw`, `worraphon_vip` (HNW Estate & Trust), `thanarat_biz` (SME Owner & Keyman), `may_mindful` (Interior Designer & Meditator), `ananya_retire` (Active Retirement).
  - **30 Articles across 7 Pillars**:
    - Complete coverage of LIFE (Non-Monetary Assets, Universal Design, Ikigai), WEALTH (Keyman Protection, Estate Planning, 3-Bucket Strategy), WELLBEING (Zone 2 & VO2 Max, Gut-Brain Axis, Light Hygiene), INNER_LIFE (The Power of Not Knowing, Mindfulness in Business, Digital Detox), EARTH_ENERGY (Amethyst Physics, Tourmaline Pyroelectricity), JOURNAL (Top's 10-Year Reflections, Joy's Journey), ABOUT (Brand Philosophy).
  - **16 Curated Earth & Energy Pieces**:
    - Authenticated with precise mineral formulas (SiO₂ + Fe³⁺, NaFe₃Al₆(BO₃)₃Si₆O₁₈(OH)₄, SrSO₄, FeS₂, Be₃Al₂Si₆O₁₈ + Fe²⁺, KAlSi₃O₈, CaSO₄·2H₂O, etc.) and chakra mappings.
  - **12 Comprehensive Protection Plans**:
    - Added AIA Infinite Wealth Prestige (Unit Linked), AIA Senior Happy, AIA Keyman Executive Protection, AIA Smart Tax Care 10/5, AIA Critical Care Prestige (Targeted Therapy).
  - **10 CRM Consultation Leads**:
    - Spanning estate planning, corporate tax, home sanctuary minerals, senior health, and Let's Talk appointments.
  - **4 Active Wishlists**:
    - Seeded for Somchai, May, and Worraphon.
- **Live Supabase PostgreSQL Verification**:
  - Successfully verified via Prisma Client query:
    `{ users: 9, posts: 30, products: 16, plans: 12, leads: 10, wishlists: 4 }`
- **Frontend Synchronization**:
  - Synchronized `src/constants/mockData.js` and `AuthContext.jsx` with `INITIAL_INSURANCE_PLANS` fallback to guarantee seamless offline and online parity.
  - Unit tests: 10/10 passed (138ms).
  - Production build: Clean bundle build in 999ms.

## 28. Vercel Frontend Deployment Readiness & SPA Routing Configuration
- **Deployment Strategy**: Single-click Frontend deployment on Vercel connecting to GitHub repository `Krist-KritnarinP/living-wealth-365`.
- **SPA Routing Fix**:
  - Created [`living wealth 365 front end/vercel.json`](file:///Users/kritnarinp/Desktop/living%20wealth%20365/living%20wealth%20365%20front%20end/vercel.json) with client-side rewrites rule (`"source": "/(.*)" -> "/index.html"`), preventing 404 errors when clients refresh or directly navigate to deep routes (`/wealth`, `/life`, `/about`, etc.).
- **Vercel Settings**:
  - Root Directory: `living wealth 365 front end`
  - Framework Preset: Vite
  - Build Command: `vite build`
  - Output Directory: `dist`
- **Verification**: Clean Vite production build in 842ms.





