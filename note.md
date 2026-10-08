# Agent Inter-Communication & Shared Project Notes (note.md)

## Project Overview
- **Project Name**: Living Wealth 365 (Financial & Insurance Advisor)
- **Tagline**: มั่นคง • มั่งคั่ง • ยั่งยืน (Life, Wealth, Health, Freedom, Happiness, Forever)
- **Brand Palette (CI Reference)**:
  - Security / Professionalism: Deep Blue `#023E8D`
  - Wealth / Opportunity: Warm Gold `#FFB53B`
  - Passion / Protection: Crimson Red `#B62B1C`
  - Background / Canvas: Off-White `#F5F7FA`

## Project Structure & Architecture
- **Root Directory**: `/Users/kritnarinp/Desktop/living wealth 365/`
- **Frontend Directory**: `living wealth 365 front end/`
  - Tech Stack: Pure React.js (JavaScript, JSX, Vite, Tailwind CSS, Lucide React, Axios) — **Strictly NO TypeScript (.ts/.tsx)** per client instruction.
  - Port: 5173
- **Backend Directory**: `living wealth 365_backend/`
  - Tech Stack: Node.js, Express.js (ES Modules JavaScript) — **Strictly NO TypeScript (.ts)** per client instruction.
  - Database & ORM: SQLite (Local development) + Prisma ORM (`prisma`, `@prisma/client`)
  - Security & Utilities: Helmet, CORS, Morgan, Dotenv, Zod (runtime validation)
  - Port: 5001

## Multi-Agent Collaboration Protocol
1. **Rule Enforcement**: All agents must strictly read and observe `note/guidelines.md` (located in root, backend, and frontend).
2. **Handover Protocol**: Every agent must read `handover.md` upon taking over the workspace, and update it upon milestone completion.
3. **Language Boundary**: Both backend and frontend must stay in JavaScript (`.js` and `.jsx`). Do not convert to TypeScript unless explicitly authorized by the user.
4. **Data Contract**:
   - Backend API base URL: `http://localhost:5001/api`
   - Core API endpoints:
     - `GET /api/health` — Service status check
     - `GET /api/services` — Financial & insurance service listings
     - `GET /api/consultations` — List consultation leads
     - `POST /api/consultations` — Submit consultation booking
     - `GET /api/plans` — List financial plans
     - `POST /api/plans` — Create financial plan
5. **Prisma Operations**:
   - Schema file: `living wealth 365_backend/prisma/schema.prisma`
   - To regenerate Prisma Client: `npm run prisma:generate` (inside backend)
   - To inspect database in GUI: `npm run prisma:studio` (inside backend)
