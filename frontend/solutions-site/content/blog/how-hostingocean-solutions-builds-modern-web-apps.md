---
title: "How HostingOcean Solutions Builds Modern Web Apps — Our Full Delivery Process"
description: "An inside look at how HostingOcean Solutions takes a project from initial brief to production deployment. Discovery, architecture, development, QA, and handover — the full process."
keywords: ["custom web app development", "software development process", "how to build a web app", "software agency process", "custom development UK", "web app delivery", "HostingOcean Solutions"]
ogImage: "/images/blog/how-we-build-web-apps.jpg"
date: "2026-04-28"
author: "HostingOcean Solutions"
readTime: "12 min"
category: "React Development"
tags: ["Web Development", "Process", "Project Management", "Architecture", "Case Study"]
featured: true
internalLinks:
  - { text: "Services", href: "/services" }
  - { text: "Portfolio", href: "/portfolio" }
  - { text: "Get a quote", href: "/get-a-quote" }
  - { text: "Pricing calculator", href: "/pricing-calculator" }
---

# How HostingOcean Solutions Builds Modern Web Apps — Our Full Delivery Process

There is a predictable gap between what agencies promise and what they actually deliver. Projects run over time, over budget, and frequently fall short of what was discussed in the initial call. Most clients have experienced this at least once.

The root cause is almost always the same: the discovery phase was skipped, assumptions were made, and nobody aligned on what "done" actually means before development started.

This article explains exactly how we work. Not a polished marketing version — the actual process we follow on every project, including the things that go wrong and how we handle them.

---

## Phase 0: Brief and Qualification (Before We Start)

Before we scope anything, we need to understand whether a project is right for us to take on. We are not a generalist agency. We specialise in:

- AI Chatbot Development (RAG-powered, enterprise-grade)
- LMS Development (custom, Moodle, white-label, multi-tenant)
- Automation & Integrations (n8n, Make, custom Node.js)
- Full-stack web applications (Next.js, Node.js, PostgreSQL/Supabase)

If a project sits outside these areas, we will say so upfront rather than stretch our team thin.

### What we ask before scoping

The brief we receive via the quote form tells us a lot, but we always follow up with specific questions before producing a proposal:

1. What is the core user journey? (Who does what, and what does the system need to do for them?)
2. What does "success" look like in 6 months?
3. What integrations are non-negotiable on day one vs. nice-to-have post-launch?
4. What existing systems does this replace or connect to?
5. Who is the internal decision-maker and who signs off on technical decisions?

The answers to these questions determine whether we can produce an accurate fixed-price proposal or whether we need a discovery engagement first.

**Timeline:** Brief received → qualification call within 1 business day → proposal within 48 hours of call.

---

## Phase 1: Discovery and Scoping

For projects above £15,000 or with significant complexity, we recommend a paid Discovery phase before committing to a full build price. Here is why.

### What changes between "brief" and "scoped"

A brief says: "We need an LMS for our training programmes."

A scope says:
- 250 learners initially, scaling to 2,000 over 18 months
- SCORM 1.2 content from an existing library of 40 courses
- SSO via Azure AD (mandatory — learners will not create new accounts)
- Completion reporting exported to HR system (BambooHR)
- Manager approval workflow before enrolment
- Hosted in the UK (data residency requirement)
- Custom certificate generation with learner name and completion date

These are not edge cases — they are requirements that fundamentally affect architecture, technology choices, and delivery timeline. Discovering them after the build has started is how projects double in cost.

### What a Discovery phase produces

1. **Requirements document** — Every user story, integration requirement, and constraint written down and agreed
2. **Technical architecture document** — Data model, system diagram, technology choices with reasoning
3. **Clickable prototype** (for UI-heavy projects) — Key user journeys validated before a line of code is written
4. **Fixed-price proposal** for the full build, based on actual requirements

Discovery typically takes 2–4 weeks and costs £1,500–£4,000 depending on scope. It is deducted from the full project cost if we proceed.

---

## Phase 2: Architecture and Stack Selection

Once requirements are clear, we choose the technology stack. This decision is deliberate — not based on what we used last time.

### Our 2026 default stack

For full-stack web applications:

| Layer | Technology | Reasoning |
|---|---|---|
| Frontend | Next.js 15 (App Router) | RSC for performance, file-system routing, standalone build |
| Styling | Tailwind CSS + ShadCN | Consistent design system, rapid composition |
| Database | PostgreSQL via Supabase or Neon | Managed, type-safe via Prisma or Drizzle ORM |
| API | Next.js Route Handlers | Co-located with UI, no separate server for small–medium apps |
| Auth | Supabase Auth or Auth.js | Depending on infrastructure requirements |
| Background jobs | BullMQ on Redis | For queues, scheduled tasks, async processing |
| Email | Nodemailer + SMTP or Resend | Transactional email |
| Deployment | PM2 on VPS or Docker container | Self-hosted, no vendor lock-in |
| CI/CD | GitHub Actions | Automated testing + deployment on push |

For AI Chatbot projects, we add: LangChain or LlamaIndex, a vector database (Pinecone, pgvector, or Qdrant), and OpenAI / Anthropic depending on requirements.

For LMS projects: video delivery via Mux or Cloudflare Stream, SCORM package parser, xAPI statement store.

For Automation projects: n8n self-hosted, webhook receivers, queue-based execution with retry logic.

### When we deviate from the default

The stack above is a starting point. We deviate when:
- The client has an existing stack we need to integrate with
- Compliance or data residency requires specific hosting
- Performance requirements at scale demand a different architecture
- The client's team will own the codebase post-handover (we choose what they can maintain)

---

## Phase 3: Development

### How we structure the codebase

Every project follows the same high-level structure regardless of framework:

```
src/
  app/           ← Next.js App Router (pages + API routes)
  components/    ← Shared UI components
    ui/          ← ShadCN / design system primitives
  features/      ← Feature-specific components, hooks, utilities
  lib/           ← Shared utilities, clients, helpers
  types/         ← TypeScript type definitions
  config/        ← Environment-dependent configuration
data/            ← Static data (content, configuration)
docs/            ← Project documentation
tests/           ← Unit + integration tests
```

This structure is designed so that a new developer can find any piece of code without asking. Features are self-contained; shared utilities are findable; types are centralised.

### Branching and version control

We use GitHub with a simple branching model:

- `main` — production-ready code only
- `develop` — integration branch; all feature work merges here first
- `feature/description` — individual features or fixes

Every meaningful commit includes a description that explains *why*, not just *what*. "fix: quote form validation" is not a useful commit message. "fix: quote form — service field was not included in validation schema causing silent 500 on submission" is.

### Two-week sprints with a demo at the end of each

Development is broken into two-week sprints. At the end of each sprint:
- We deploy the sprint's work to a staging environment
- We run a 30-minute demo with the client
- The client provides written feedback (we use a shared Notion board)
- Feedback is categorised: bug (fix in current sprint), scope (add to backlog), out-of-scope (separate quote)

This stops the silent drift that causes "we assumed you wanted X" conversations at the end of a project.

---

## Phase 4: Quality Assurance

QA is not an afterthought — it has its own sprint at the end of development.

### What our QA process covers

**Functional testing:**
- Every user story has an acceptance criteria that must pass
- Edge cases: empty states, error states, boundary values (what happens at 0, 1, and max records)
- Authentication flows: login, logout, session expiry, password reset
- Form validation: all fields, all error states, server-side validation

**Cross-browser and device testing:**
- Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- Mobile: iPhone Safari, Android Chrome — at common breakpoints (375px, 768px, 1280px, 1920px)
- Accessibility: keyboard navigation, screen reader compatibility for public-facing pages, WCAG 2.1 AA for critical user flows

**Performance:**
- Lighthouse CI on main routes (target: 90+ performance on mobile)
- Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1
- Database query analysis: EXPLAIN ANALYZE on slow queries, indexes verified

**Security:**
- Environment variables audited (no secrets in client bundles)
- API routes: input validation on every endpoint, no SQL injection vectors
- Authentication: CSRF protection, session management
- Dependency audit: `npm audit` with critical issues resolved

**Load testing (for high-traffic applications):**
- k6 scripts simulating expected concurrent users at 2x peak
- Database connection pool sizing verified
- Memory and CPU profiling under load

---

## Phase 5: Deployment

### Our deployment model

We self-host on VPS (Ubuntu) unless the client specifies otherwise. This gives us full control over the environment, no cold-start latency, and predictable costs.

Typical deployment stack:
- **Web server:** Apache (reverse proxy) → Node.js on port 3000
- **Process manager:** PM2 (auto-restart on crash, log rotation)
- **SSL:** Let's Encrypt via Certbot (auto-renewal)
- **Build artifact:** `output: 'standalone'` — minimal Node.js bundle, no node_modules bloat

Deployment is scripted. No manual SSH steps for routine releases. Our CI/CD pipeline:

```
git push origin develop
→ GitHub Actions: install → lint → build → test
→ If tests pass: package artifact
→ Upload to server: pscp
→ Unzip + restart PM2
→ Health check: curl /api/health
→ Slack notification: deployed or failed
```

Zero-downtime deployment is handled by PM2's reload mechanism — the new server starts before the old one is stopped.

### What we hand over at deployment

- **Credentials document** — All environment variables documented and securely delivered
- **Architecture overview** — Diagram of how the system is structured
- **Runbook** — How to deploy a new release, how to roll back, how to monitor
- **Admin access** — Database, hosting, domain, all controlled by the client

We do not hold credentials or act as a gatekeeper. On day one after handover, the client has everything they need to operate and modify the system without us.

---

## Phase 6: Post-Launch Support

Every project includes a 30-day post-launch support window. During this period:
- Bug reports are addressed within 1 business day
- Critical issues (data loss, authentication failure, broken payment flow) are treated as P0 and addressed within 4 hours

After the support window, clients can choose:
- A monthly retainer for ongoing development and maintenance
- Ad-hoc work priced per project
- Full handover to an internal team (we provide onboarding documentation)

---

## Typical Project Timelines

| Project Type | Discovery | Development | QA + Deployment | Total |
|---|---|---|---|---|
| AI Chatbot (SaaS tier) | 1–2 weeks | 6–8 weeks | 2 weeks | 9–12 weeks |
| Custom AI Chatbot | 2–4 weeks | 8–14 weeks | 2–3 weeks | 12–21 weeks |
| LMS (SaaS tier) | 1–2 weeks | 8–10 weeks | 2–3 weeks | 11–15 weeks |
| Custom LMS | 3–5 weeks | 12–20 weeks | 3–4 weeks | 18–29 weeks |
| Automation project | 1–2 weeks | 4–8 weeks | 1–2 weeks | 6–12 weeks |
| Full-stack web app | 2–4 weeks | 10–16 weeks | 2–3 weeks | 14–23 weeks |

These are ranges. A well-written brief with clear requirements sits at the lower end. Scope growth and unavailable stakeholders push towards the upper end.

---

## What Goes Wrong (and How We Handle It)

### Scope creep

The most common problem. A feature request arrives mid-development that was not in the original brief.

Our response: We assess the request, estimate the cost and timeline impact, and give the client a clear choice — include it now (delay + additional cost) or add it to a post-launch backlog. We do not absorb scope without a decision.

### Integration problems

Third-party APIs behave differently in production than in their documentation. This happens regularly.

Our response: We raise integration issues as soon as they are discovered (not at the end of development), document the specific problem, and present options (workaround, alternative approach, or deferring the integration).

### Stakeholder unavailability

Clients who cannot attend sprint demos or respond to feedback questions slow projects down.

Our response: We document all decisions in writing and proceed with the most reasonable interpretation of requirements when feedback is delayed beyond three business days. This keeps the project moving without silently accumulating risk.

### Changing requirements

Business needs change. Sometimes the brief evolves mid-project.

Our response: We scope the change, price it, and either amend the contract or create a separate project for the additional work. We do not absorb changes silently.

---

## Why Fixed-Price Projects

We price fixed-price wherever possible. Time-and-materials billing (day rates) creates a misalignment: the longer the project takes, the more the agency earns. We prefer to get paid for delivery, not time.

For fixed-price to work, discovery has to be thorough. A fixed price based on a vague brief is not fixed — it is a number that will be renegotiated. We do the discovery work upfront to make the number accurate.

---

## Start a Project

If you have a project in mind and want to understand what it would cost to build properly:

[→ Try the pricing calculator](/pricing-calculator) — get an instant budget range in 5 questions  
[→ Submit a brief](/get-a-quote) — receive a detailed written proposal within 48 hours  
[→ Explore our work](/portfolio) — see projects we have delivered

We work with businesses of all sizes, from early-stage startups to enterprise organisations. The process above scales accordingly — a small automation project and a large LMS platform follow the same principles, with the investment of each phase proportional to the complexity of the build.
