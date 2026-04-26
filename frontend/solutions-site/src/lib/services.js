/** @type {Service[]} */
const services = [
  {
    slug: 'domains',
    name: 'Domain Registration',
    tagline: 'Find, register, and manage your domain — all in one place.',
    icon: '🌐',
    highlights: [
      'Search across 500+ TLDs',
      'Free WHOIS privacy protection',
      'Anycast DNS with 99.99% SLA',
      'Auto-renewal & expiry alerts',
    ],
    description:
      'HostingOcean Solutions makes it easy to search, register, and renew domain names across all major TLDs. Every domain includes free WHOIS privacy protection, DNS management through our global anycast DNS network, and one-click connection to any HostingOcean hosting product.',
    features: [
      'Search across 500+ TLDs with real-time availability',
      'Bulk registration and portfolio management dashboard',
      'Free WHOIS privacy on all eligible TLDs',
      'Anycast DNS with 99.99% uptime SLA and < 20 ms global propagation',
      'DNSSEC signing support',
      'Domain transfer wizard with auto-unlock and EPP code retrieval',
      'Auto-renewal and expiry alerts (30/14/7/1 day)',
      'DNS API for programmatic record management',
    ],
    group: 'Web Presence',
  },
  {
    slug: 'web-hosting',
    name: 'Shared Web Hosting',
    tagline: 'Fast, reliable hosting for websites of every size.',
    icon: '🚀',
    highlights: [
      'LiteSpeed Web Server + LSCache',
      'Free SSL auto-issued',
      '40+ one-click installers',
      'Daily backups, 30-day retention',
    ],
    description:
      'HostingOcean shared hosting plans give individuals, bloggers, and small businesses everything they need to launch a professional website — without the complexity of managing a server. Powered by LiteSpeed Web Server for up to 3× faster page loads.',
    features: [
      'LiteSpeed Web Server with LSCache for WordPress',
      'Free SSL certificate (auto-renewed via Let\'s Encrypt)',
      'One-click installers for WordPress, Joomla, Drupal, and 40+ apps',
      'cPanel control panel',
      'Automated daily backups with 30-day retention',
      'Unlimited bandwidth (fair use policy applies)',
      'PHP 8.x, Node.js, Python 3.x support',
      'Email hosting included (IMAP/SMTP, webmail)',
      'Free domain with annual plans',
    ],
    group: 'Web Presence',
  },
  {
    slug: 'vps',
    name: 'VPS Hosting',
    tagline: 'Dedicated resources. Full control. Cloud speed.',
    icon: '⚡',
    highlights: [
      'AWS EC2-backed dedicated vCPU & RAM',
      'NVMe SSD with I/O guarantees',
      'Managed or unmanaged tiers',
      'Scale up with zero downtime',
    ],
    description:
      'HostingOcean VPS plans give developers and growing businesses the power of a dedicated virtual machine on AWS EC2 with guaranteed CPU and RAM, NVMe SSD storage, and a private network. Choose managed or unmanaged tiers.',
    features: [
      'AWS EC2-backed dedicated vCPU and RAM (no overselling)',
      'NVMe SSD storage with I/O performance guarantees',
      'Choice of OS: Ubuntu 24.04 LTS, Debian 12, AlmaLinux 9, Windows Server 2022',
      'Full root / administrator access',
      'Private networking between VPS instances',
      'DDoS protection (up to 10 Gbps scrubbing)',
      'Automated snapshots (hourly / daily / weekly)',
      'Managed tier: OS hardening, patching, 24/7 monitoring',
      'Scale up/down with zero downtime',
    ],
    group: 'Infrastructure',
  },
  {
    slug: 'ssl',
    name: 'SSL Certificates',
    tagline: 'Secure every site, automatically.',
    icon: '🔒',
    highlights: [
      'Free DV SSL on all hosting plans',
      'OV & EV certificates from DigiCert',
      'Wildcard & multi-domain (SAN) certs',
      'Expiry monitoring & auto-renewal',
    ],
    description:
      'HostingOcean SSL certificates protect every website and API. Free DV certificates are issued automatically for all hosting customers. OV and EV certificates are available for businesses requiring the trust signals needed for e-commerce and enterprise applications.',
    features: [
      'Free DV SSL auto-issued and auto-renewed for all hosting plans',
      'OV and EV certificates from DigiCert and Sectigo',
      'Wildcard SSL (*.yourdomain.com)',
      'Multi-domain (SAN) certificates for up to 250 domains',
      'One-click installation on all HostingOcean hosting products',
      'Expiry monitoring with 60/30/14/7/1 day renewal alerts',
      'Certificate transparency log monitoring',
      'REST API for automated provisioning',
    ],
    group: 'Web Presence',
  },
  {
    slug: 'email',
    name: 'Business Email',
    tagline: 'Professional email on your own domain — without the complexity.',
    icon: '✉️',
    highlights: [
      'Custom domain email addresses',
      'DKIM, DMARC & SPF auto-configured',
      'ML-assisted spam filtering',
      'ActiveSync for mobile devices',
    ],
    description:
      'HostingOcean Business Email delivers reliable, secure, ad-free email hosting on your own domain. All plans include spam filtering, DKIM/DMARC/SPF auto-configuration, mobile sync, and a clean webmail interface. Storage is backed by S3 with per-mailbox encryption.',
    features: [
      'Custom domain email (you@yourcompany.com)',
      'IMAP/SMTP/POP3 with SSL/TLS enforced',
      'ActiveSync for mobile devices (iOS, Android)',
      'Webmail via Roundcube — or connect Outlook, Apple Mail, Thunderbird',
      'Spam and virus filtering with ML-assisted scoring',
      'DKIM, DMARC, and SPF records auto-configured at setup',
      'Shared mailboxes, aliases, and distribution lists',
      'Email archiving and legal hold (Business+ plan)',
    ],
    group: 'Communication',
  },
  {
    slug: 'managed-lms',
    name: 'Managed LMS',
    tagline: 'Launch a fully managed learning platform in minutes.',
    icon: '🎓',
    highlights: [
      'Dedicated Moodle instance per customer',
      'SCORM, xAPI & LTI 1.3 support',
      'SAML 2.0 / OAuth SSO integration',
      'Managed upgrades, backups & monitoring',
    ],
    description:
      'HostingOcean Managed LMS gives educators, training providers, and enterprises a fully hosted, maintained, and secured Moodle environment — no server management required. HostingOcean handles all updates, backups, performance tuning, and 24/7 uptime monitoring.',
    features: [
      'Dedicated Moodle instance per customer (silo isolation)',
      'Custom domain with auto-provisioned SSL',
      'SCORM 1.2/2004, xAPI (Tin Can), LTI 1.3 support',
      'Automated daily backups with 90-day retention',
      'S3-backed file storage',
      'Plugin marketplace — 50 curated, security-reviewed plugins',
      'GDPR compliance tools (data export, right-to-erasure)',
      'SSO integration: SAML 2.0, OAuth 2.0, LDAP/Active Directory',
      'Managed Moodle upgrades (zero-downtime, tested in staging)',
    ],
    group: 'Learning',
  },
  {
    slug: 'ai-solutions',
    name: 'AI Solutions',
    tagline: 'Add intelligence to your products — without building the infrastructure.',
    icon: '🤖',
    highlights: [
      'Pre-built support & onboarding bots',
      'Managed RAG pipeline — bring your own docs',
      'White-label embeddable chat widget',
      'GPT-4o, Claude 3.5 & Gemini 1.5',
    ],
    description:
      'HostingOcean AI Solutions enables businesses to embed AI-powered capabilities into their websites, applications, and internal workflows through simple API calls. Deploy pre-built AI agents or build custom agents using the HostingOcean AI API and SDK.',
    features: [
      'Pre-built AI chatbot agents for customer support and onboarding',
      'Managed RAG pipeline — bring your own documents',
      'Document ingestion: PDFs, Word docs, web pages, CMS',
      'Conversation memory and session management',
      'White-label chat widget (one-script-tag embed)',
      'REST API + SDK (JavaScript, Python, PHP)',
      'Model choice: GPT-4o, Claude 3.5, Gemini 1.5',
      'Analytics dashboard: volume, resolution rate, escalation rate',
      'GDPR-compliant with EU data residency option',
    ],
    group: 'AI & Automation',
  },
];

/**
 * Returns all services.
 * @returns {typeof services}
 */
export function getAllServices() {
  return services;
}

/**
 * Returns a single service by slug, or undefined if not found.
 * @param {string} slug
 * @returns {(typeof services)[number] | undefined}
 */
export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

/**
 * Returns all valid service slugs (for generateStaticParams).
 * @returns {string[]}
 */
export function getAllServiceSlugs() {
  return services.map((s) => s.slug);
}
