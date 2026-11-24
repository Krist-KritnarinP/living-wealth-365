# Living Wealth 365

> **A Life Well Planned. A Life Well Lived.**
> Full-stack web platform for holistic life planning, personal wealth & tax simulation, wellbeing, and advisor CRM.

---

## Overview

**Living Wealth 365** is a full-stack application structured around **3 Core Gateways** and **7 Content Pillars**:

- **Living**: Life (6-Dimension Life Map & time design), Wellbeing (longevity & Home Health Sanctuary), Earth & Energy (mineral & crystal catalog).
- **Learning**: Wealth (4-pillar financial architecture & Thai personal income tax calculator), Inner Life (mindfulness & reflection), Journal (editorial notes & stories).
- **Connecting**: About (advisor philosophy) and Let's Talk (1-on-1 consultation booking & CRM pipeline).

---

## Architecture & Repository Structure

```text
.
├── living wealth 365 front end/   # React 19 + Vite SPA (Tailwind CSS v4, DaisyUI v5)
├── living wealth 365_backend/     # Express.js REST API + Prisma ORM (PostgreSQL)
├── render.yaml                    # Render deployment blueprint for backend service
└── README.md
```

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router v7, Tailwind CSS v4, DaisyUI v5, Axios, Lucide React |
| **Frontend Tooling** | `oxlint` (linting), Node.js native test runner (`node --test`) |
| **Backend** | Node.js (ES Modules), Express.js, Zod, Multer, S3-compatible storage (`@aws-sdk/client-s3`) |
| **Database & ORM** | PostgreSQL (Supabase Pooler + Direct URL), Prisma ORM v5 |
| **Auth & Security** | JWT (`jsonwebtoken`), `bcryptjs`, Helmet, CORS, `express-rate-limit` |

---

## Key Capabilities

- **Interactive Life Map (6 Dimensions)**: Real-time SVG radar assessment across Health, Wealth, Time, Relationships, Inner Life, and Purpose.
- **Personal Income Tax Calculator (2568)**: Progressive 7-tier Thai PIT calculation with insurance and Thai ESG deduction simulation.
- **Earth & Energy Visualizer**: Mineral and crystal catalog separating geological properties, crystal structure, history, and energy notes.
- **Mindfulness & Wellbeing Tools**: Guided breathing pause timer and Home Health Sanctuary checklist.
- **Advisor CRM & Admin CMS**: Lead pipeline tracking, 7-pillar journal management, and catalog administration.

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **PostgreSQL** database (e.g., Supabase)

### 1. Backend Setup

```bash
cd "living wealth 365_backend"
npm install
cp .env.example .env
```

Update `.env` with your database connection strings (`DATABASE_URL`, `DIRECT_URL`), a strong `JWT_SECRET`, `PORT=5001`, and `CORS_ORIGIN`.

```bash
# Generate Prisma client and sync schema
npm run prisma:generate
npm run prisma:push

# Optional: seed local development data
npm run seed

# Start development server
npm run dev
```

Health check endpoint: `GET /api/health`

### 2. Frontend Setup

```bash
cd "living wealth 365 front end"
npm install
npm run dev
```

### Available Scripts

| Scope | Command | Purpose |
| :--- | :--- | :--- |
| Frontend | `npm run dev` | Start Vite dev server |
| Frontend | `npm run lint` | Run `oxlint` |
| Frontend | `npm test` | Run unit tests (`node --test tests/*.test.js`) |
| Frontend | `npm run build` | Production bundle |
| Backend | `npm run dev` | Start API server with `nodemon` |
| Backend | `npm start` | Start production API server |
| Backend | `npm run prisma:studio` | Open Prisma Studio |

---

## Deployment

- **Backend**: Configured in [`render.yaml`](render.yaml) (Node runtime, Singapore region, health check at `/api/health`). Set `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, and `CORS_ORIGIN` in the hosting environment.
- **Frontend**: Standard static SPA build (`npm run build` in `living wealth 365 front end/`), deployed with `CORS_ORIGIN` pointing to the production frontend domain.

---

## Security & Credentials Policy

- **Never commit credentials, `.env` files, or demo passwords to version control or documentation.**
- Local test/seed accounts are managed strictly in local development via `living wealth 365_backend/prisma/seed.js` and environment configuration—rotate or override seeded credentials before any staging or production deployment.

---

## License

Copyright © 2026 Living Wealth 365. All rights reserved.
