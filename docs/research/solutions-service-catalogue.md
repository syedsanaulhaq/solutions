# Research: HostingOcean Solutions — Service Catalogue

- **Author**: Research Agent
- **Date**: 2026-04-26
- **Status**: Complete
- **Scope**: Define the full service catalogue for HostingOcean Solutions — names, one-line taglines, detailed descriptions, key features, target customers, and positioning notes. Intended for use by docs-agent (marketing copy), code-agent (solutions site pages), and product team (pricing/packaging).

---

## 1. Overview

HostingOcean Solutions is the customer-facing product brand built on top of the HostingOcean platform. It offers seven product lines spanning domain management, web hosting, managed cloud infrastructure, SSL/TLS security, email, LMS hosting, and AI-powered services. All products are delivered from AWS infrastructure and managed through the HostingOcean control plane API.

---

## 2. Service Catalogue

---

### 2.1 Domain Registration & Management

**Tagline**: *Find, register, and manage your domain — all in one place.*

**Description**:
HostingOcean Solutions makes it easy to search, register, and renew domain names across all major TLDs — including `.com`, `.net`, `.org`, `.io`, `.co`, and hundreds of country-code and new-gTLD extensions. Every domain includes free WHOIS privacy protection, DNS management through our global anycast DNS network, and one-click connection to any HostingOcean hosting product.

**Key features**:
- Search across 500+ TLDs with real-time availability
- Bulk registration and portfolio management dashboard
- Free WHOIS privacy on all eligible TLDs
- Anycast DNS with 99.99% uptime SLA and < 20 ms global propagation
- DNSSEC signing support
- Domain transfer wizard with auto-unlock and EPP code retrieval
- Auto-renewal and expiry alerts (30/14/7/1 day)
- DNS API for programmatic record management

**Target customers**: Individuals, startups, agencies managing client portfolios, enterprises with large domain estates.

**Positioning**: Competitive on price; differentiated by control-plane API access (no other registrar offers a developer-first API at this price point).

---

### 2.2 Shared Web Hosting

**Tagline**: *Fast, reliable hosting for websites of every size.*

**Description**:
HostingOcean shared hosting plans give individuals, bloggers, and small businesses everything they need to launch a professional website — without the complexity of managing a server. Every plan includes SSD storage, a free SSL certificate, one-click WordPress/CMS installers, automated daily backups, and 24/7 support. Powered by LiteSpeed Web Server for up to 3× faster page loads than Apache-based alternatives.

**Key features**:
- LiteSpeed Web Server with LSCache for WordPress
- Free SSL certificate (auto-renewed via Let's Encrypt)
- One-click installers for WordPress, Joomla, Drupal, PrestaShop, and 40+ apps
- cPanel control panel
- Automated daily backups with 30-day retention
- Unlimited bandwidth (fair use policy applies)
- PHP 8.x, Node.js, Python 3.x multi-runtime support
- Email hosting included (IMAP/SMTP, webmail via Roundcube)
- Free domain with annual plans

**Plans**: Starter (1 site), Business (10 sites), Pro (unlimited sites + staging).

**Target customers**: Personal blogs, small business websites, WordPress developers, freelancers hosting client sites.

**Positioning**: LiteSpeed + LSCache differentiates from cPanel/Apache incumbents (GoDaddy, Bluehost); developer runtime support (Node.js, Python) differentiates from budget hosts.

---

### 2.3 VPS Hosting

**Tagline**: *Dedicated resources. Full control. Cloud speed.*

**Description**:
HostingOcean VPS plans give developers and growing businesses the power of a dedicated virtual machine at a fraction of the cost of bare-metal. Each VPS is provisioned on isolated AWS EC2 instances with guaranteed CPU and RAM, NVMe SSD storage, and a private network. Choose from managed (HostingOcean handles OS updates, security patches, and monitoring) or unmanaged (full root access, your config) tiers.

**Key features**:
- AWS EC2-backed dedicated vCPU and RAM (no overselling)
- NVMe SSD storage with I/O performance guarantees
- Choice of OS: Ubuntu 24.04 LTS, Debian 12, AlmaLinux 9, Windows Server 2022
- Full root / administrator access
- Private networking between VPS instances in the same region
- DDoS protection (up to 10 Gbps scrubbing)
- Automated snapshots (hourly / daily / weekly)
- Managed tier: OS hardening, patching, 24/7 monitoring, alert response
- Unmanaged tier: full control, SSH key auth, custom firewall rules via API
- Scale up/down with zero downtime (online resize)

**Plans**: Starter (1 vCPU / 1 GB RAM), Standard (2 vCPU / 4 GB), Business (4 vCPU / 8 GB), Enterprise (custom, dedicated host available).

**Target customers**: Developers, SaaS startups, e-commerce stores outgrowing shared hosting, agencies needing isolated environments per client.

**Positioning**: AWS backbone (better reliability than competitors on commodity hardware) with the simplicity of a managed control panel; appeals to developers who want real infrastructure without AWS console complexity.

---

### 2.4 SSL / TLS Certificates

**Tagline**: *Secure every site, automatically.*

**Description**:
HostingOcean SSL certificates protect every website and API you run on the platform. Free Domain Validation (DV) certificates are issued automatically via Let's Encrypt for all hosting customers. Paid Organisation Validation (OV) and Extended Validation (EV) certificates are available for businesses that require the trust indicators needed for e-commerce, banking, and enterprise applications. All certificates include automatic renewal, one-click installation, and real-time expiry monitoring.

**Key features**:
- Free DV SSL auto-issued and auto-renewed for all hosting plans
- OV and EV certificates from DigiCert and Sectigo (1- and 2-year terms)
- Wildcard SSL (`*.yourdomain.com`) to cover all subdomains
- Multi-domain (SAN) certificates for up to 250 domains per cert
- One-click installation on all HostingOcean hosting products
- Expiry monitoring with 60/30/14/7/1 day renewal alerts
- Certificate transparency log monitoring
- REST API for automated provisioning (useful for DevOps pipelines)

**Plans**: Free (DV, auto), Standard OV ($49/yr), Wildcard OV ($129/yr), EV ($199/yr).

**Target customers**: All hosting customers (free DV), e-commerce merchants (OV/EV), enterprises with compliance requirements.

**Positioning**: Free DV removes the barrier for all customers; paid tiers offer enterprise trust signals competitors (Namecheap, GoDaddy) charge significantly more for.

---

### 2.5 Business Email Hosting

**Tagline**: *Professional email on your own domain — without the complexity.*

**Description**:
HostingOcean Business Email delivers reliable, secure, ad-free email hosting on your own domain. Built on a hardened IMAP/SMTP stack with optional Microsoft 365 or Google Workspace integration for customers who prefer those ecosystems. All plans include spam filtering (SpamAssassin + ML model), DKIM/DMARC/SPF auto-configuration, mobile sync (ActiveSync), and a clean webmail interface. Storage is backed by S3 with per-mailbox encryption.

**Key features**:
- Custom domain email (`you@yourcompany.com`)
- IMAP/SMTP/POP3 with SSL/TLS enforced
- ActiveSync for mobile devices (iOS, Android)
- Webmail via Roundcube (included) or connect any client (Outlook, Apple Mail, Thunderbird)
- Spam and virus filtering with ML-assisted scoring
- DKIM, DMARC, and SPF records auto-configured at setup
- Shared mailboxes, aliases, and distribution lists
- Email archiving and legal hold (Business+ plan)
- Optional Microsoft 365 / Google Workspace passthrough integration

**Plans**: Starter (5 GB/mailbox), Business (25 GB/mailbox + archiving), Enterprise (100 GB + legal hold + SAML SSO).

**Target customers**: Small businesses, remote teams, freelancers, organisations migrating off shared ISP email.

**Positioning**: Priced below Microsoft 365 / Google Workspace for customers who only need email (not the full suite); DKIM/DMARC auto-setup is a key differentiator vs bare-bones alternatives.

---

### 2.6 Managed LMS Hosting (Powered by Moodle)

**Tagline**: *Launch a fully managed learning platform in minutes.*

**Description**:
HostingOcean Managed LMS gives educators, training providers, and enterprises a fully hosted, maintained, and secured Moodle environment — no server management required. Each customer gets a dedicated Moodle instance on its own subdomain (or custom domain), with isolated storage and database. Plans scale from small training teams to large universities with thousands of concurrent learners. HostingOcean handles all OS updates, Moodle upgrades, database backups, performance tuning, and 24/7 uptime monitoring.

**Key features**:
- Dedicated Moodle instance per customer (silo isolation — no shared databases)
- Custom domain with auto-provisioned SSL
- Pre-installed theme customisation (logo, colours, fonts)
- SCORM 1.2/2004, xAPI (Tin Can), LTI 1.3 support
- Automated daily backups with 90-day retention
- S3-backed file storage (no storage limits on Business+)
- Plugin marketplace — 50 curated, security-reviewed plugins
- GDPR compliance tools (data export, right-to-erasure)
- SSO integration: SAML 2.0, OAuth 2.0, LDAP/Active Directory
- Managed Moodle upgrades (zero-downtime, tested in staging first)
- 24/7 Moodle-specific support team

**Plans**: Starter (up to 100 active learners), Business (up to 1,000), Enterprise (unlimited + SLA + dedicated infrastructure).

**Target customers**: Schools and universities, corporate L&D teams, professional certification providers, government training programmes, e-learning entrepreneurs.

**Positioning**: Managed Moodle removes the #1 pain point (maintenance overhead) that causes organisations to self-host poorly. Priced below specialist Moodle hosts (Moodle.com, MoodleCloud) for equivalent features.

---

### 2.7 AI Solutions (Powered by HostingOcean AI)

**Tagline**: *Add intelligence to your products — without building the infrastructure.*

**Description**:
HostingOcean AI Solutions enables businesses to embed AI-powered capabilities into their websites, applications, and internal workflows through simple API calls. The service abstracts the complexity of LLM provisioning, vector databases, and RAG pipelines behind a managed platform. Customers can deploy pre-built AI agents (customer support bot, onboarding assistant, knowledge base Q&A) or build custom agents using the HostingOcean AI API and SDK.

**Key features**:
- Pre-built AI chatbot agents — customisable for customer support, onboarding, and FAQ
- Managed RAG (Retrieval-Augmented Generation) pipeline — bring your own documents
- Document ingestion: upload PDFs, Word docs, web pages, or connect a CMS
- Conversation memory and session management per end-user
- White-label chat widget (embed on any website with one script tag)
- REST API + SDK (JavaScript, Python, PHP) for custom integrations
- Model choice: GPT-4o, Claude 3.5, Gemini 1.5 (customer selects per agent)
- Usage-based pricing with monthly caps and overage alerts
- GDPR-compliant data processing (EU data residency option)
- Analytics dashboard: conversation volume, resolution rate, escalation rate

**Plans**: Starter (500 conversations/month), Business (5,000/month + RAG), Enterprise (unlimited + custom model fine-tuning + dedicated inference).

**Target customers**: E-commerce stores (product recommendation bot), SaaS companies (in-app help assistant), educational institutions (student support bot), enterprises (internal knowledge base Q&A).

**Positioning**: Priced as a managed service — customers pay for outcomes (conversations resolved) rather than infrastructure. Differentiates from raw OpenAI/Anthropic API access by providing the full stack (hosting, RAG, widget, analytics) out of the box.

---

## 3. Service Groupings for Navigation

| Group | Services |
|---|---|
| **Web Presence** | Domain Registration, Shared Hosting, SSL Certificates |
| **Infrastructure** | VPS Hosting |
| **Communication** | Business Email |
| **Learning** | Managed LMS |
| **AI & Automation** | AI Solutions |

---

## 4. Cross-Sell Matrix

| Primary product | Natural upsells |
|---|---|
| Domain Registration | Shared Hosting, SSL, Business Email |
| Shared Hosting | SSL (auto), Business Email, Domain |
| VPS Hosting | Managed LMS, AI Solutions, SSL, Business Email |
| SSL | No primary upsell (included with hosting); upgrade to OV/EV |
| Business Email | Domain (if not already held), Shared Hosting |
| Managed LMS | AI Solutions (student support bot), VPS (staging environment) |
| AI Solutions | Managed LMS (learning assistant), VPS (custom model hosting) |

---

## 5. Key Differentiators (Platform-Wide)

1. **Developer-first API** — every product is controllable via the HostingOcean REST API and SDK; no product is UI-only.
2. **AWS backbone** — SLA-backed infrastructure, not commodity hardware.
3. **Unified billing** — one invoice across all products; usage-based and subscription tiers available.
4. **Security by default** — SSL auto-issued, DKIM/DMARC auto-configured, WHOIS privacy included, IMDSv2 enforced on VPS.
5. **Multi-region** — available in US, EU, APAC; data residency guarantees for compliance-sensitive customers.

---

## 6. References

- [products/domains/](../../../products/domains/)
- [products/shared-hosting/](../../../products/shared-hosting/)
- [products/vps/](../../../products/vps/)
- [products/ssl/](../../../products/ssl/)
- [products/email/](../../../products/email/)
- [docs/research/multi-tenant-lms-architecture.md](./multi-tenant-lms-architecture.md)
- [backend/src/services/chatbot/](../../../backend/src/services/chatbot/) — AI pipeline implementation
- [clients/js-sdk/](../../../clients/js-sdk/) — JavaScript SDK
