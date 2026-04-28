# HostingOcean Solutions — New Hire Onboarding Guide

## Welcome

Welcome to the HostingOcean Solutions team. This document walks you through everything you need to get up and running in your first week.

---

## 1. Access and Accounts

You will need accounts/access to the following services. Request them from a senior team member on Day 1:

| Service | Purpose |
|---|---|
| GitHub | Source code — `https://github.com/syedsanaulhaq/solutions` |
| VPS SSH | Production server — `95.111.247.141` (port 22) |
| Email (SMTP) | Outbound email for lead notifications and auto-replies |
| Admin Dashboard | `/admin` on the solutions site — ask for `ADMIN_PASSWORD` |
| OpenAI | AI chatbot API key |

---

## 2. Local Development Setup

### Prerequisites

- Node.js 20 LTS (use `nvm` or `nvm-windows`)
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/syedsanaulhaq/solutions.git
cd solutions/frontend/solutions-site

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local
# Fill in the values — see the Environment Variables section in deployment-guide.md

# 4. Start the development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 3. Project Structure

```
frontend/solutions-site/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── api/          # API routes (quote, admin, newsletter, saas, integrations)
│   │   ├── admin/        # Admin dashboard pages (auth-gated)
│   │   ├── blog/         # Blog listing, category, tag, and post pages
│   │   ├── solutions/    # SaaS product pages (chatbot, lms-builder, automation)
│   │   └── ...           # Other service and marketing pages
│   ├── components/       # Reusable React components
│   ├── data/             # JSON data files (blog, portfolio, testimonials, etc.)
│   ├── lib/              # Utility functions (analytics, leads, pricing, seo, etc.)
│   └── styles/           # Global CSS
├── data/                 # Additional data files (blog.json, portfolio.json, etc.)
├── docs/                 # Internal documentation (you are reading one now)
└── public/               # Static assets
```

---

## 4. Branching Strategy

- **`develop`** — active development branch. All work merges here.
- **`main`** — production-ready branch. Merged from `develop` after review.

Always create a feature branch off `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

Submit a pull request to `develop` when complete.

---

## 5. Code Standards

- **TypeScript** is required for all new code. Avoid `any` types.
- **React Server Components** by default; add `'use client'` only when you need browser APIs or React hooks.
- **TailwindCSS** for all styling. No inline styles unless unavoidable.
- **ShadCN UI** components are in `src/components/ui/` — use them before creating new UI primitives.
- Run `npm run lint` before every commit. The pipeline will reject non-passing PRs.

---

## 6. Key Contacts

| Name | Role |
|---|---|
| Syed Fazli | Founder & Lead Engineer |

---

## 7. First Week Checklist

- [ ] Git access and first `git pull` working
- [ ] Local dev server running (`npm run dev`)
- [ ] Can access admin dashboard at `/admin/leads`
- [ ] Read `delivery-process.md`, `qa-checklist.md`, and `deployment-guide.md`
- [ ] Understand the quote form → lead pipeline (see `api/quote/route.ts`)
- [ ] First task assigned and branch created
