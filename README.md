# Classy Kitchen Utensils — E-commerce Platform

A bilingual (English / Kinyarwanda) online store for kitchen utensils, based in Kigali (City Plaza). Prices in **RWF**, mobile-first, with **MTN MoMo** and **Airtel Money** checkout, WhatsApp ordering, Google Maps, and social links.

> **Stack:** Node.js + Express + TypeScript · Prisma + PostgreSQL · React + Vite + TypeScript + Tailwind CSS

---

## 1. Architecture

```
                      ┌──────────────────────────────────────────────┐
   Mobile / Desktop   │                 FRONTEND (SPA)               │
      browser  ─────► │  React + Vite + TypeScript + Tailwind        │
                      │  • i18n (EN / RW)   • RWF formatting          │
                      │  • TanStack Query   • react-router            │
                      │  Hosted on Vercel                            │
                      └───────────────┬──────────────────────────────┘
                                      │  HTTPS / JSON  (?lang=en|rw)
                                      ▼
                      ┌──────────────────────────────────────────────┐
                      │                 BACKEND (API)                │
                      │  Express + TypeScript (layered)              │
                      │  routes → controllers → services → Prisma     │
                      │  helmet · CORS allowlist · rate-limit · Zod   │
                      │  Hosted on Render / Railway / Fly.io          │
                      └───────┬───────────────────────┬──────────────┘
                              │                       │
                   Prisma ORM │                       │ Payment adapters
                              ▼                       ▼
              ┌───────────────────────┐   ┌─────────────────────────────┐
              │   PostgreSQL          │   │  MTN MoMo API · Airtel Money │
              │   (Supabase / Neon)   │   │  (server-to-server, webhooks)│
              └───────────────────────┘   └─────────────────────────────┘

   Product images → object storage / CDN (Cloudinary or S3-compatible)
   Google Maps embed → store location (City Plaza, Kigali)
```

**Why this shape**

- **Separate frontend and backend.** The React app is just static files on a CDN (fast, cheap, scalable); the API is a stateless service that can scale independently. This is the standard, professional split and reads well on a CV.
- **Layered backend** (routes → controllers → services → data) keeps HTTP concerns, business logic, and database access apart, so the code stays testable and easy to reason about.
- **Payment adapters** hide MoMo / Airtel behind one interface, so the order flow doesn't care which provider is used and new providers can be added later.
- **i18n at the data layer.** Each product stores `nameEn/nameRw` and `descriptionEn/descriptionRw`; the API returns the right language based on `?lang=` or the `Accept-Language` header.

---

## 2. Project structure

```
classy-kitchen-utensils/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # data model (Product, Category, Order, …)
│   │   └── seed.ts              # categories + sample products (EN/RW, RWF)
│   ├── src/
│   │   ├── config/env.ts        # validated environment variables (Zod)
│   │   ├── lib/prisma.ts        # single PrismaClient instance
│   │   ├── middlewares/         # error handling, validation
│   │   ├── utils/i18n.ts        # language selection + localisation
│   │   ├── modules/             # feature modules (each: routes/controller/service)
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── orders/
│   │   │   └── payments/        # provider interface + MoMo/Airtel adapters
│   │   ├── app.ts               # express app + security middleware
│   │   └── server.ts            # entry point
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/site.ts       # contact / social / map (from env, no secrets)
│   │   ├── lib/api.ts           # axios client (base URL from env)
│   │   ├── lib/format.ts        # RWF currency formatting
│   │   ├── i18n.ts              # i18next setup (EN/RW)
│   │   ├── locales/{en,rw}.json
│   │   ├── components/          # Navbar, Footer, ProductCard, …
│   │   └── pages/               # Home, Products, ProductDetail, Cart, Contact
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml           # local Postgres + Adminer
└── README.md
```

---

## 3. Getting started (local)

**Prerequisites:** Node 20+, Docker (for the database), and Git.

```bash
# 1. Start a local PostgreSQL
docker compose up -d

# 2. Backend
cd backend
cp .env.example .env            # then fill in the values
npm install
npm run prisma:migrate          # create the tables
npm run seed                    # load categories + sample products
npm run dev                     # API on http://localhost:4000

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                     # app on http://localhost:5173
```

Inspect the database any time at http://localhost:8080 (Adminer) or with `npx prisma studio`.

---

## 4. Roadmap (each phase = one or more commits)

1. **Foundation** — architecture, structure, scaffold ✅ *(this commit set)*
2. **Catalog API** — products & categories endpoints, pagination, filtering, search
3. **Storefront UI** — product grid, detail page, language switcher, RWF prices
4. **Cart & checkout** — cart state, order creation (server-computed totals)
5. **Payments** — MTN MoMo + Airtel Money adapters + webhooks (sandbox first)
6. **Admin** — protected dashboard to manage products/orders
7. **Audit & hardening** — performance bottlenecks, security review, tests
8. **Deployment** — Vercel (web) + Render/Railway (API) + managed Postgres + CDN

---

## 5. Commit conventions

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     a new feature
fix:      a bug fix
chore:    tooling / config / deps
docs:     documentation only
refactor: code change that neither fixes a bug nor adds a feature
perf:     a performance improvement
test:     adding or fixing tests
```

See `COMMIT_PLAN.md` for the exact commit sequence to follow.

---

## 6. Security & money — non-negotiables

- Secrets (`DATABASE_URL`, `JWT_SECRET`, payment keys) live only in `.env`, never in Git.
- **Order totals are always recomputed on the server** from database prices — the client price is never trusted.
- Payment confirmation comes from **provider webhooks** (verified), not from the browser saying "paid".
- All input is validated with **Zod**; Prisma parameterises queries (no SQL injection).
- `helmet`, a strict **CORS allowlist**, and **rate limiting** are enabled in `app.ts`.
