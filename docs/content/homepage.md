# Homepage Content — HostingOcean Solutions

- **Page**: `/` (root)
- **URL**: `https://solutions.hostingocean.com`
- **Author**: Docs Agent
- **Date**: 2026-04-26
- **Status**: Approved
- **Audience**: Marketing, Design, Engineering
- **Purpose**: Canonical content specification for the solutions-site homepage. All copy, labels, stats, and microcopy are defined here. Component implementations should pull from this document.

---

## Table of Contents

1. [Page-level Metadata](#1-page-level-metadata)
2. [Tone & Voice](#2-tone--voice)
3. [Section 1 — Hero](#3-section-1--hero)
4. [Section 2 — Trust Bar](#4-section-2--trust-bar)
5. [Section 3 — Services Grid](#5-section-3--services-grid)
6. [Section 4 — How It Works](#6-section-4--how-it-works)
7. [Section 5 — Social Proof](#7-section-5--social-proof)
8. [Section 6 — Call to Action Band](#8-section-6--call-to-action-band)
9. [Footer Notes](#9-footer-notes)
10. [SEO & Structured Data](#10-seo--structured-data)
11. [Content Change Log](#11-content-change-log)

---

## 1. Page-level Metadata

| Field | Value |
|---|---|
| `<title>` | HostingOcean Solutions — Web Hosting, Domains & AI |
| `meta description` | Professional web hosting, domain registration, SSL certificates, business email, managed LMS, and AI-powered services — all on AWS infrastructure. Start free. |
| OG title | HostingOcean Solutions — Everything you need to launch, host & grow online |
| OG description | From domain registration to AI chatbots — HostingOcean Solutions gives you seven enterprise-grade services on one platform, starting free. |
| OG image alt | HostingOcean Solutions dashboard preview on AWS infrastructure |
| Twitter card type | `summary_large_image` |
| Canonical URL | `https://solutions.hostingocean.com/` |
| `robots` | `index, follow` |
| Primary keyword | web hosting |
| Secondary keywords | domain registration, VPS hosting, SSL certificate, managed Moodle, AI chatbot, business email |

---

## 2. Tone & Voice

| Principle | Guidance |
|---|---|
| **Confident, not arrogant** | State facts and outcomes. Avoid superlatives like "best" or "world-class" without evidence. |
| **Technically credible** | Use real product terms (LiteSpeed, LTI 1.3, DKIM/DMARC, RAG). The audience includes developers. |
| **Human, not corporate** | Short sentences. Active voice. Contractions are fine ("you'll", "it's"). No passive constructions. |
| **Outcome-led** | Lead with what the customer gains, not what the product does. "Launch in minutes" not "our platform enables rapid deployment". |
| **Inclusive** | No jargon acronyms without expansion on first use on a given page. |

**Reading level target**: Flesch–Kincaid Grade 8–10. Aim for sentences under 20 words.

---

## 3. Section 1 — Hero

**Purpose**: Establish value proposition and drive sign-up or exploration within 5 seconds.

### Badge / Eyebrow

```
AWS-backed infrastructure · 99.9% uptime SLA
```

*Design note*: Green status dot to the left signals live operational status.

### Headline (H1)

```
Everything you need to launch, host & grow online
```

*Accented words* (render in brand blue `#0066ff`): `launch, host & grow`

**Alternatives (A/B test candidates)**:

| Variant | Headline |
|---|---|
| A (current) | Everything you need to **launch, host & grow** online |
| B | One platform. Seven services. Zero server headaches. |
| C | Professional hosting for everyone — from a blog to an enterprise. |
| D | Your domain, hosting, email, LMS & AI — all in one place. |

### Subheading

```
HostingOcean Solutions delivers professional web hosting, domain registration,
managed LMS, business email, and AI-powered services — all from one platform,
on enterprise-grade AWS infrastructure.
```

*Max length*: 200 characters. Keep to 2 lines at desktop.

### Primary CTA

| Property | Value |
|---|---|
| Label | Get started free |
| Destination | `https://app.hostingocean.com/signup` |
| Style | Filled primary button |
| Accessibility label | Create a free HostingOcean Solutions account |

### Secondary CTA

| Property | Value |
|---|---|
| Label | Explore services |
| Destination | `/services` |
| Style | Outline button |
| Accessibility label | Browse all HostingOcean Solutions services |

### Hero Stats Bar

Four metrics displayed in a horizontal row below the CTAs, separated by a top border.

| Stat value | Stat label |
|---|---|
| 10,000+ | Active customers |
| 500+ | TLDs supported |
| 99.9% | Uptime SLA |
| 24/7 | Expert support |

*Source / update cadence*: Customer count updated quarterly from CRM. Uptime sourced from monitoring dashboard rolling 12-month average.

---

## 4. Section 2 — Trust Bar

**Purpose**: Fast-scan social proof and feature highlights. Reduces bounce by reassuring new visitors.

**Background**: Light surface (`--color-surface: #f5f7fa`).

### Trust items

| Icon | Label |
|---|---|
| 🔒 | SSL on every plan |
| ☁️ | AWS infrastructure |
| 📞 | 24/7 support |
| 💾 | Daily backups |
| 🌍 | Multi-region |
| 🛡️ | DDoS protection |

*Layout*: Single horizontal row, centred, wraps on mobile. No links — purely informational.

---

## 5. Section 3 — Services Grid

**Purpose**: Introduce all seven product lines. Each card links to the individual service page.

### Section header

**Heading (H2)**:
```
Our Services
```

**Subheading**:
```
Everything you need to build, grow, and manage your online presence — from a single platform.
```

### Service cards

Each card displays: icon · product name · tagline · 4 highlights · "Learn more →" CTA.

---

#### Card 1 — Domain Registration

| Field | Value |
|---|---|
| Icon | 🌐 |
| Name | Domain Registration |
| Slug | `/services/domains` |
| Tagline | Find, register, and manage your domain — all in one place. |
| Highlight 1 | Search across 500+ TLDs |
| Highlight 2 | Free WHOIS privacy protection |
| Highlight 3 | Anycast DNS with 99.99% SLA |
| Highlight 4 | Auto-renewal & expiry alerts |
| Card CTA | Learn more → |

---

#### Card 2 — Shared Web Hosting

| Field | Value |
|---|---|
| Icon | 🚀 |
| Name | Shared Web Hosting |
| Slug | `/services/web-hosting` |
| Tagline | Fast, reliable hosting for websites of every size. |
| Highlight 1 | LiteSpeed Web Server + LSCache |
| Highlight 2 | Free SSL auto-issued |
| Highlight 3 | 40+ one-click installers |
| Highlight 4 | Daily backups, 30-day retention |
| Card CTA | Learn more → |

---

#### Card 3 — VPS Hosting

| Field | Value |
|---|---|
| Icon | ⚡ |
| Name | VPS Hosting |
| Slug | `/services/vps` |
| Tagline | Dedicated resources. Full control. Cloud speed. |
| Highlight 1 | AWS EC2-backed dedicated vCPU & RAM |
| Highlight 2 | NVMe SSD with I/O guarantees |
| Highlight 3 | Managed or unmanaged tiers |
| Highlight 4 | Scale up with zero downtime |
| Card CTA | Learn more → |

---

#### Card 4 — SSL Certificates

| Field | Value |
|---|---|
| Icon | 🔒 |
| Name | SSL Certificates |
| Slug | `/services/ssl` |
| Tagline | Secure every site, automatically. |
| Highlight 1 | Free DV SSL on all hosting plans |
| Highlight 2 | OV & EV certificates from DigiCert |
| Highlight 3 | Wildcard & multi-domain (SAN) certs |
| Highlight 4 | Expiry monitoring & auto-renewal |
| Card CTA | Learn more → |

---

#### Card 5 — Business Email

| Field | Value |
|---|---|
| Icon | ✉️ |
| Name | Business Email |
| Slug | `/services/email` |
| Tagline | Professional email on your own domain — without the complexity. |
| Highlight 1 | Custom domain email addresses |
| Highlight 2 | DKIM, DMARC & SPF auto-configured |
| Highlight 3 | ML-assisted spam filtering |
| Highlight 4 | ActiveSync for mobile devices |
| Card CTA | Learn more → |

---

#### Card 6 — Managed LMS

| Field | Value |
|---|---|
| Icon | 🎓 |
| Name | Managed LMS |
| Slug | `/services/managed-lms` |
| Tagline | Launch a fully managed learning platform in minutes. |
| Highlight 1 | Dedicated Moodle instance per customer |
| Highlight 2 | SCORM, xAPI & LTI 1.3 support |
| Highlight 3 | SAML 2.0 / OAuth SSO integration |
| Highlight 4 | Managed upgrades, backups & monitoring |
| Card CTA | Learn more → |

---

#### Card 7 — AI Solutions

| Field | Value |
|---|---|
| Icon | 🤖 |
| Name | AI Solutions |
| Slug | `/services/ai-solutions` |
| Tagline | Add intelligence to your products — without building the infrastructure. |
| Highlight 1 | Pre-built support & onboarding bots |
| Highlight 2 | Managed RAG pipeline — bring your own docs |
| Highlight 3 | White-label embeddable chat widget |
| Highlight 4 | GPT-4o, Claude 3.5 & Gemini 1.5 |
| Card CTA | Learn more → |

---

## 6. Section 4 — How It Works

**Purpose**: Reduce perceived complexity. Addresses the "this seems complicated" objection.

**Status**: Defined here for future implementation (Phase 2 homepage update).

### Section header

**Heading (H2)**:
```
Up and running in three steps
```

**Subheading**:
```
No servers to configure. No contracts to sign. Start in minutes.
```

### Steps

| # | Step title | Step body |
|---|---|---|
| 1 | **Choose your service** | Browse our seven product lines — hosting, domains, email, LMS, SSL, VPS, or AI. Pick the plan that fits your needs today, upgrade any time. |
| 2 | **Set it up instantly** | One-click provisioning gets your service live in under 60 seconds. We handle the infrastructure. You get the control panel and the API. |
| 3 | **Launch & grow** | Your site, email, or learning platform is live. Add more services as your needs grow — all managed from one dashboard. |

*Design note*: Numbered step cards in a horizontal row at desktop, stacked on mobile. Consider animated progress indicator on scroll.

---

## 7. Section 5 — Social Proof

**Purpose**: Build trust through customer evidence. Reduce sign-up friction for high-intent visitors.

**Status**: Defined here for Phase 2. Requires customer testimonials to be collected.

### Section header

**Heading (H2)**:
```
Trusted by 10,000+ businesses worldwide
```

### Testimonial slots (3 cards)

Placeholders — to be replaced with real customer quotes:

| # | Quote | Attribution | Company | Plan |
|---|---|---|---|---|
| 1 | *"Migrating our Moodle to HostingOcean halved our infrastructure bill and eliminated the maintenance overhead. The managed upgrades alone saved us 20 hours a month."* | [Name, Title] | [University / L&D company] | Managed LMS Business |
| 2 | *"The AI chatbot resolved 65% of our support tickets in the first month. Setup took an afternoon. Our support team now focuses on the complex cases."* | [Name, Title] | [E-commerce company] | AI Solutions Business |
| 3 | *"We host 40+ client sites here. The LiteSpeed performance and the cPanel familiarity made the switch from GoDaddy a no-brainer."* | [Name, Title] | [Digital agency] | Shared Hosting Pro |

### Logos bar

Display up to 8 customer or partner logos in greyscale. Placeholder — to be populated by marketing.

---

## 8. Section 6 — Call to Action Band

**Purpose**: Bottom-of-page conversion capture for visitors who have scrolled through all content.

**Background**: Gradient from `#0066ff` to `#0047b3` (brand blue).

### Heading (H2)

```
Ready to get started?
```

### Subheading

```
Join thousands of businesses running on HostingOcean Solutions.
No setup fees. Cancel any time.
```

### Primary CTA

| Property | Value |
|---|---|
| Label | Create free account |
| Destination | `https://app.hostingocean.com/signup` |
| Style | White filled button |
| Accessibility label | Create a free HostingOcean Solutions account |

### Secondary CTA

| Property | Value |
|---|---|
| Label | Talk to sales |
| Destination | `/contact` |
| Style | White outline button |
| Accessibility label | Contact the HostingOcean Solutions sales team |

---

## 9. Footer Notes

The global footer is rendered on all pages including the homepage. Content is defined in the Footer component and governed by the site-wide footer content spec (TBD). Key homepage-relevant items:

- **Uptime indicator**: Live "All systems operational" badge with green dot. Source: status page API at `https://status.hostingocean.com`. If degraded/outage, indicator should update dynamically.
- **Copyright line**: `© {year} HostingOcean Solutions. All rights reserved.` Year auto-populated from `new Date().getFullYear()`.
- **Cookie consent**: Consent banner to appear on first visit (EU/EEA visitors). Not within scope of this document — see `docs/specs/cookie-consent.md`.

---

## 10. SEO & Structured Data

### Target keyword clusters

| Cluster | Primary keyword | Supporting keywords |
|---|---|---|
| Hosting | web hosting | cheap web hosting, cPanel hosting, WordPress hosting, LiteSpeed hosting |
| Domains | domain registration | buy domain name, .com domain, cheap domain, domain registrar |
| VPS | VPS hosting | cloud VPS, managed VPS, AWS VPS, Linux VPS |
| Email | business email hosting | custom email domain, professional email |
| LMS | managed Moodle hosting | Moodle cloud hosting, hosted LMS |
| AI | AI chatbot platform | managed RAG, AI customer support bot |

### Structured data (JSON-LD)

Recommended schema types for the homepage:

1. **`Organization`** — name, url, logo, sameAs (social profiles), contactPoint
2. **`WebSite`** — name, url, potentialAction (SearchAction pointing to `/services?q={query}`)
3. **`ItemList`** — listing of the 7 service pages (for rich results in search)

Example `Organization` block:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HostingOcean Solutions",
  "url": "https://solutions.hostingocean.com",
  "logo": "https://solutions.hostingocean.com/images/logo.png",
  "description": "Professional web hosting, domain registration, SSL, email, managed LMS, and AI services on AWS infrastructure.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": "English",
    "contactOption": "TollFree"
  }
}
```

### Internal linking priorities (from homepage)

| Destination | Anchor text | Section |
|---|---|---|
| `/services` | Explore services | Hero secondary CTA |
| `/services/domains` | Domain Registration | Services grid card |
| `/services/web-hosting` | Shared Web Hosting | Services grid card |
| `/services/vps` | VPS Hosting | Services grid card |
| `/services/ssl` | SSL Certificates | Services grid card |
| `/services/email` | Business Email | Services grid card |
| `/services/managed-lms` | Managed LMS | Services grid card |
| `/services/ai-solutions` | AI Solutions | Services grid card |
| `/contact` | Talk to sales | CTA band |
| `https://app.hostingocean.com/signup` | Get started free / Create free account | Hero + CTA band |

---

## 11. Content Change Log

| Date | Author | Change |
|---|---|---|
| 2026-04-26 | Docs Agent | Initial version created from service catalogue research |

---

*Source research*: [docs/research/solutions-service-catalogue.md](../research/solutions-service-catalogue.md)
