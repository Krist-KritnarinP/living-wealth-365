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
- **Full Screen UI**: ออกแบบและจัดวาง Layout แบบเต็มหน้าจอ (Full Screen Experience) เพื่อการมองเห็นและใช้งานที่เต็มตา ชัดเจน
- **Full Responsive**: รองรับการแสดงผลทุกหน้าจออย่างสมบูรณ์แบบ ทั้ง:
  - สมาร์ทโฟน (Smartphones ทุกขนาดหน้าจอ)
  - แท็บเล็ตและไอแพด (iPad / Tablets ทั้งแนวตั้งและแนวนอน)
  - แล็ปท็อปและคอมพิวเตอร์ตั้งโต๊ะ (Desktop Screens)
- **Typography & Accessibility for All Ages & Genders**:
  - ตัวอักษรขนาดใหญ่ อ่านง่าย สบายตา (High Legibility & Readability)
  - เหมาะสำหรับผู้ใช้งานทุกเพศ ทุกวัย (All genders, All age groups รวมถึงผู้สูงวัย)
  - รักษาระดับ Contrast ที่ชัดเจน ไม่ใช้ฟอนต์บางหรือเล็กเกินไป
- **Design System**: Zen Glass (Tailwind CSS 4 + daisyUI 5) พร้อมรองรับ `zen-light` และ `zen-dark`

## Project Structure & Architecture
- **Root Directory**: `/Users/kritnarinp/Desktop/living wealth 365/`
- **Frontend Directory**: `living wealth 365 front end/`
  - Tech Stack: Pure React.js (JavaScript, JSX, Vite, Tailwind CSS 4, daisyUI 5, Lucide React, Axios) — **Strictly NO TypeScript (.ts/.tsx)** per client instruction.
  - Port: 5173
- **Backend Directory**: `living wealth 365_backend/`
  - Tech Stack: Node.js, Express.js (ES Modules JavaScript) — **Strictly NO TypeScript (.ts)** per client instruction.
  - Database & ORM: PostgreSQL / MySQL + Prisma ORM (`prisma`, `@prisma/client`)
  - Official Models: `Admin`, `Lead`, `Post`, `Product` and Enum `LeadStatus` (NEW, CONTACTED, CLOSED, CANCELLED)
  - Port: 5001

## Multi-Agent Collaboration Protocol
1. **Rule Enforcement**: All agents must strictly read and observe `note/guidelines.md` (located in root, backend, and frontend).
2. **Handover Protocol**: Every agent must read `handover.md` upon taking over the workspace, and update it upon milestone completion.
3. **Language Boundary**: Both backend and frontend must stay in JavaScript (`.js` and `.jsx`). Do not convert to TypeScript unless explicitly authorized by the user.
4. **Scope Discipline**: Do NOT create unrequested tables or speculative UI pages unless explicitly instructed by the user. Always keep implementations minimal, cohesive, and directly aligned with the user's prompt.
5. **Mandatory Git Commit Discipline**: นอกจากอัปเดต `handover.md` แล้ว **ต้องทำ `git commit` ทุกครั้ง** หลังเสร็จสิ้นแต่ละขั้นตอนหรือ Milestone โดยใช้ Commit message ที่ชัดเจนและอธิบายงานที่เปลี่ยน ห้ามละเลยเด็ดขาด เพื่อความต่อเนื่องและปลอดภัยของโค้ดเมื่อมี Agent ตัวอื่นเข้ามาทำงานร่วมต่อ
