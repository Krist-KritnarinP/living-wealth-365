# Agent Inter-Communication & Shared Project Notes (note.md)

## Project Overview
- **Project Name**: Living Wealth 365 (Financial & Insurance Advisor)
- **Tagline**: มั่นคง • มั่งคั่ง • ยั่งยืน (Life, Wealth, Health, Freedom, Happiness, Forever)
- **Brand Palette (CI Reference)**:
  - Security / Professionalism: Deep Blue `#023E8D`
  - Wealth / Opportunity: Warm Gold `#FFB53B`
  - Passion / Protection: Crimson Red `#B62B1C`
  - Background / Canvas: Off-White `#F5F7FA`

## UI / UX Design Mandate (Core Requirement)
- **Full Screen UI**: ออกแบบและจัดวาง Layout แบบเต็มหน้าจอ (Full Screen Experience 100% Edge-to-Edge) ไม่เหลือขอบว่างซ้าย-ขวา
- **Full Responsive**: รองรับการแสดงผลทุกหน้าจออย่างสมบูรณ์แบบ ทั้ง:
  - สมาร์ทโฟน (Smartphones ทุกขนาดหน้าจอ)
  - แท็บเล็ตและไอแพด (iPad / Tablets ทั้งแนวตั้งและแนวนอน)
  - แล็ปท็อปและคอมพิวเตอร์ตั้งโต๊ะ (Desktop Screens)
- **Typography & Accessibility for All Ages & Genders**:
  - ตัวอักษรขนาดพอดี สบายตา สมดุลย์ ชัดเจน (High Legibility & Comfort)
  - เหมาะสำหรับผู้ใช้งานทุกเพศ ทุกวัย (All genders, All age groups รวมถึงผู้สูงวัย)
  - รักษาระดับ Contrast ที่ชัดเจน ไม่ใช้ฟอนต์บางหรือเล็กเกินไป
- **Design System**: Zen Glass (Tailwind CSS 4 + daisyUI 5) พร้อมรองรับ `zen-light` และ `zen-dark`

## Stitch MCP Integration
- **Server Name**: `stitch` (MCP Server เชื่อมต่อพร้อมใช้งานใน Antigravity)
- **Connected Project**: **Living Wealth 365 Platform** (Project ID: `12978997839434193186`)
- **Design System in Stitch**: "Serene Prosperity" (Theme matching brand CI)
- **Screens Available in Stitch**:
  1. `b4852686845247e1bfce03b97551ebc4`: Admin Dashboard - จัดการ Leads & ลูกค้า
  2. `783b9a1f41484fc7853dec4f0360842a`: Living Wealth 365 - หน้าแรก (Home)
  3. `1f458d8adfaa47c4b984ef45d97b380d`: ประกันชีวิต & สุขภาพ AIA และวางแผนภาษี
  4. `a631268e4e574f628c966b1ad88c4571`: คลังความรู้การเงินและวางแผนภาษี (Knowledge Hub)
  5. `db380ae3a1324a90bff3bd85629c708f`: สรุปสิทธิลดหย่อนภาษี 2567-2568 ฉบับสมบูรณ์ (Single Article)
  6. `28838cf132844eb7b36f55a420edfc63`: แคตตาล็อกสายมู & หินมงคล (Mu-Tae-Lu)

## Project Structure & Architecture
- **Root Directory**: `/Users/kritnarinp/Desktop/living wealth 365/`
- **Frontend Directory**: `living wealth 365 front end/`
  - Tech Stack: Pure React.js (JavaScript, JSX, Vite, Tailwind CSS 4, daisyUI 5, Lucide React, Axios) — **Strictly NO TypeScript (.ts/.tsx)** per client instruction.
  - Port: 5173
- **Backend Directory**: `living wealth 365_backend/`
  - Tech Stack: Node.js, Express.js (ES Modules JavaScript) — **Strictly NO TypeScript (.ts)** per client instruction.
  - Official Models: `User` (Customer & Admin), `Lead` (Capture & Optional User link), `Post` (Knowledge/Blog), `Product` (Mu-Tae-Lu), `Wishlist` (User-Product bookmark) and Enums: `Role` (CUSTOMER, ADMIN), `LeadStatus` (NEW, CONTACTED, CLOSED, CANCELLED)
  - Port: 5001

## Multi-Agent Collaboration Protocol
1. **Rule Enforcement**: All agents must strictly read and observe `note/guidelines.md` (located in root, backend, and frontend).
2. **Handover Protocol**: Every agent must read `handover.md` upon taking over the workspace, and update it upon milestone completion.
3. **Language Boundary**: Both backend and frontend must stay in JavaScript (`.js` and `.jsx`). Do not convert to TypeScript unless explicitly authorized by the user.
4. **Scope Discipline**: Do NOT create unrequested tables or speculative UI pages unless explicitly instructed by the user. Always keep implementations minimal, cohesive, and directly aligned with the user's prompt.
5. **Mandatory Git Commit Discipline**: นอกจากอัปเดต `handover.md` แล้ว **ต้องทำ `git commit` ทุกครั้ง** หลังเสร็จสิ้นแต่ละขั้นตอนหรือ Milestone โดยใช้ Commit message ที่ชัดเจนและอธิบายงานที่เปลี่ยน ห้ามละเลยเด็ดขาด เพื่อความต่อเนื่องและปลอดภัยของโค้ดเมื่อมี Agent ตัวอื่นเข้ามาทำงานร่วมต่อ
6. **Clean Code & Component Refactoring Mandate**: ทุก Agent ต้องเขียนโค้ดตามมาตรฐาน Professional Programmer แยก Component เป็นระเบียบ (Single Responsibility), ห้ามเขียน Monolithic Giant Component ไฟล์เดียวยาวหลายร้อยบรรทัด, แยกโครงสร้างโฟลเดอร์เป็นระบบ (`components/`, `constants/`, `services/`, `hooks/`), และหมั่น Refactor โค้ดให้อ่านง่าย กระชับ ปราศจากโค้ดขยะก่อนส่งมอบงานเสมอ
7. **Mandatory Pre-Execution Clarification & Summary (ทวนคำสั่งและสรุปแผนงานก่อนลงมือเสมอ)**: ก่อนลงมือปฏิบัติงานทุกครั้ง **ต้องทวนคำสั่งของผู้ใช้ให้ชัดเจน** และ **สรุปแผนงาน/ขั้นตอนที่จะทำทั้งหมดให้ผู้ใช้เห็นภาพก่อนเสมอ** จากนั้นจึงค่อยลงมือทำ ห้ามข้ามขั้นตอนไปแก้ไขโค้ดหรือสร้างไฟล์โดยไม่สรุปให้ผู้ใช้ทราบก่อนโดยเด็ดขาด
