import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  FileText,
  RefreshCw,
  GraduationCap,
  MessageSquare,
  Zap,
  ShieldCheck,
  ChevronDown,
  Code2,
  Server,
  Workflow,
} from 'lucide-react';
import { PriceDisplay } from '@/components/PriceDisplay';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Transparent pricing for LMS development, AI chatbots, React applications, Node.js APIs, and automation. Fixed-price quotes, hourly rates, and monthly retainers.',
  path: '/pricing',
  keywords: [
    'software development pricing UK',
    'LMS development cost',
    'AI chatbot pricing',
    'web development rates UK',
    'fixed price software development',
    'monthly retainer software agency',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

interface PricingItem {
  title: string;
  priceLow: number;
  priceHigh?: number;
  highPlus?: boolean;
  prefix?: string;
  suffix?: string;
  description: string;
  includes: string[];
}

const pricingModels = [
  {
    icon: <FileText className="h-6 w-6" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    model: 'Fixed-Price Project',
    tagline: 'Best for well-scoped builds',
    description:
      'The most common engagement type. We scope the project together, agree a fixed price, and deliver to spec. No day-rate billing and no invoice surprises. You know the cost before we write a line of code.',
    highlights: [
      'Full written proposal before any commitment',
      'Scope, architecture, and timeline documented upfront',
      'No hidden costs — scope changes priced separately',
      'Milestone-based payments, not payment upfront',
      'Delivery to agreed acceptance criteria only',
      'Source code and full IP ownership transferred on completion',
    ],
    from: { low: 800, prefix: 'From ' },
    note: 'Depends on scope and complexity',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    model: 'Hourly Rate',
    tagline: 'Best for exploratory or evolving work',
    description:
      'Ideal when requirements are not yet fully defined, when you need an experienced second opinion, or when you have ongoing work that does not fit neatly into a fixed scope. Billed monthly with a full timesheet.',
    highlights: [
      'Senior engineer rate — the person doing the work',
      'Weekly time reports with task breakdown',
      'No retainer or minimum commitment',
      'Can transition to fixed-price once scope is clear',
      'Suitable for advisory, architecture, and code review',
      'Minimum four hours per engagement',
    ],
    from: { low: 15, suffix: '/hr' },
    note: 'Senior engineer rate. Discounts on volume blocks.',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    model: 'Monthly Retainer',
    tagline: 'Best for ongoing support and iteration',
    description:
      'A reserved block of engineering time each month. Suited to clients who need regular feature development, platform maintenance, performance tuning, or ongoing LMS administration and content work.',
    highlights: [
      'Guaranteed capacity each month — no availability risk',
      'Unused hours roll over up to one month',
      'Priority response for issues and incidents',
      'Regular sync calls included',
      'Flexible scope — features, bugs, infrastructure, content',
      'Cancel with 30 days notice — no lock-in',
    ],
    from: { low: 400, prefix: 'From ', suffix: '/month' },
    note: 'Minimum 10 hours/month. Volume discounts apply.',
  },
];

const lmsPricing: PricingItem[] = [
  {
    title: 'Moodle Setup & Configuration',
    priceLow: 600, priceHigh: 2000,
    description: 'Installation, theme configuration, plugin setup, user roles, course structure, and initial content import. Ideal for organisations moving to Moodle for the first time.',
    includes: [
      'Server deployment and configuration',
      'Theme customisation to brand guidelines',
      'Plugin selection and setup',
      'User enrolment and role configuration',
      'Basic course and category structure',
      'Admin training session',
    ],
  },
  {
    title: 'Custom LMS Development',
    priceLow: 4000, priceHigh: 12000, highPlus: true,
    description: 'A purpose-built learning platform with custom architecture, specific user flows, custom content types, integrations with your existing systems, and reporting tailored to your KPIs.',
    includes: [
      'Full product discovery and architecture design',
      'Custom course authoring and player',
      'SCORM / xAPI content support',
      'Learner progress tracking and reporting',
      'SSO integration (SAML, OAuth 2.0)',
      'Certificates, assessments, and completions',
    ],
  },
  {
    title: 'LMS Migration',
    priceLow: 1200, priceHigh: 4000,
    description: 'Migrating your existing LMS to a new platform — typically to Moodle or a custom solution. Includes data export, transformation, import, and validation.',
    includes: [
      'Audit of existing platform and content',
      'Data mapping and transformation scripts',
      'User, course, and completion data migration',
      'Content re-packaging where required',
      'Post-migration validation and sign-off',
      'Downtime minimisation plan',
    ],
  },
  {
    title: 'LMS Retainer Support',
    priceLow: 400, prefix: 'From ', suffix: '/month',
    description: 'Ongoing platform maintenance, feature development, content work, and user support for your existing LMS. Fixed monthly cost, predictable capacity.',
    includes: [
      'Moodle upgrades and security patches',
      'New feature development',
      'Performance monitoring and tuning',
      'Course and content updates',
      'User and enrolment administration',
      'Priority incident response',
    ],
  },
];

const chatbotPricing: PricingItem[] = [
  {
    title: 'Knowledge-Base Chatbot',
    priceLow: 800, priceHigh: 2200,
    description: 'A RAG-powered chatbot trained on your documentation, FAQs, and knowledge base. Deployable on your website or internal portal. Answers questions accurately from your own content.',
    includes: [
      'Document ingestion pipeline (PDF, Word, web)',
      'Vector database setup and indexing',
      'Chat UI component (embeddable widget)',
      'Admin panel to manage knowledge sources',
      'Source citation in responses',
      'Fallback to human handoff or contact form',
    ],
  },
  {
    title: 'Customer Support Bot',
    priceLow: 2000, priceHigh: 5000,
    description: 'A full-featured support chatbot integrated with your helpdesk, CRM, and product systems. Handles tier-1 queries autonomously and escalates with context when needed.',
    includes: [
      'CRM and helpdesk integration (HubSpot, Zendesk, Freshdesk)',
      'Account lookup and order status',
      'Ticket creation and escalation with full context',
      'Sentiment detection and priority routing',
      'Multi-language support',
      'Analytics dashboard for conversation metrics',
    ],
  },
  {
    title: 'Internal Assistant',
    priceLow: 1500, priceHigh: 4000,
    description: 'A private, secure AI assistant for your team — trained on internal policies, HR documents, runbooks, and institutional knowledge. Deployed inside your network.',
    includes: [
      'SSO authentication (Google, Microsoft, SAML)',
      'Role-based access to knowledge sources',
      'Ingestion of internal docs, wikis, and policies',
      'Conversation history per user',
      'Admin controls for content and access',
      'Fully self-hosted — no data leaves your infrastructure',
    ],
  },
  {
    title: 'Custom AI Product',
    priceLow: 3000, highPlus: true,
    description: 'A bespoke AI-powered feature or product — agents, multi-step reasoning workflows, voice interfaces, or complex integrations with your existing data and systems.',
    includes: [
      'Discovery and architecture design',
      'Custom model integration or fine-tuning',
      'Multi-step agent workflows',
      'Integration with existing APIs and data stores',
      'Evaluation framework and quality metrics',
      'Full documentation and handover',
    ],
  },
];

const reactPricing: PricingItem[] = [
  {
    title: 'MVP / Marketing Site',
    priceLow: 1200, priceHigh: 4000,
    description: 'A production-quality Next.js site or web app built to a defined scope — ideal for product launches, marketing sites, or client-facing portals needing custom functionality.',
    includes: [
      'Next.js with App Router and TypeScript',
      'TailwindCSS UI to your brand guidelines',
      'CMS or headless content integration',
      'SEO metadata and Open Graph setup',
      'Responsive, accessible, WCAG 2.1 AA',
      'Deployment and DNS configuration',
    ],
  },
  {
    title: 'React Web Application',
    priceLow: 4000, priceHigh: 11000, highPlus: true,
    description: 'A full-featured, data-driven web application — dashboards, admin panels, multi-user SaaS tools, or complex workflows with authentication, roles, and real-time data.',
    includes: [
      'Component library with design system',
      'Authentication and role-based access',
      'REST or GraphQL data layer integration',
      'Real-time features (WebSockets / SSE)',
      'Automated test suite (Vitest / Playwright)',
      'CI/CD pipeline and production deployment',
    ],
  },
  {
    title: 'Component Library / Design System',
    priceLow: 2000, priceHigh: 6000,
    description: 'A shared, documented component library for teams building multiple React products. Built with Storybook, tested, and published to your private npm registry.',
    includes: [
      'Core UI components (buttons, forms, tables, modals)',
      'Storybook documentation and visual testing',
      'Dark mode and theming support',
      'Accessibility testing built in',
      'Private npm package publishing',
      'Contribution guidelines and changelog',
    ],
  },
  {
    title: 'React Retainer',
    priceLow: 400, prefix: 'From ', suffix: '/month',
    description: 'Ongoing React development capacity — new features, performance tuning, dependency upgrades, and bug fixes. Works alongside your team or as your sole frontend engineering resource.',
    includes: [
      'Reserved monthly engineering hours',
      'Feature development and bug fixes',
      'Dependency and security updates',
      'Performance audits and optimisations',
      'Code reviews for your team',
      'Cancel with 30 days notice',
    ],
  },
];

const nodePricing: PricingItem[] = [
  {
    title: 'REST API Build',
    priceLow: 1200, priceHigh: 4000,
    description: 'A well-structured, documented REST API for a defined set of resources — ideal for mobile apps, third-party integrations, or decoupling a monolith into services.',
    includes: [
      'Express or Fastify with TypeScript',
      'JWT / OAuth 2.0 authentication',
      'PostgreSQL or MySQL schema and migrations',
      'OpenAPI / Swagger documentation',
      'Rate limiting, validation, error handling',
      'Docker containerisation and deployment',
    ],
  },
  {
    title: 'Full Backend System',
    priceLow: 4000, priceHigh: 12000, highPlus: true,
    description: 'A production-grade backend — multi-service architecture, complex business logic, event-driven processing, third-party integrations, and a robust data model.',
    includes: [
      'Service architecture design and documentation',
      'Background job queues (Bull, BullMQ)',
      'Webhook delivery and event processing',
      'Multi-tenant data isolation',
      'Automated test suite (unit + integration)',
      'Monitoring, alerting, and structured logging',
    ],
  },
  {
    title: 'API Integration Project',
    priceLow: 800, priceHigh: 3000,
    description: 'Connecting your systems to third-party APIs — payment providers, CRMs, ERPs, communication platforms, or data feeds. Reliable, monitored, with error recovery.',
    includes: [
      'Integration design and data mapping',
      'OAuth / API key credential management',
      'Retry logic and error handling',
      'Webhook ingestion and processing',
      'Integration test suite',
      'Runbook and monitoring setup',
    ],
  },
  {
    title: 'API Retainer',
    priceLow: 400, prefix: 'From ', suffix: '/month',
    description: 'Ongoing backend engineering — new endpoints, schema changes, integration maintenance, performance tuning, and security updates for your production API.',
    includes: [
      'Reserved monthly engineering capacity',
      'New endpoint and schema development',
      'Dependency and security patch management',
      'Database query optimisation',
      'On-call incident support',
      'Cancel with 30 days notice',
    ],
  },
];

const automationPricing: PricingItem[] = [
  {
    title: 'Single Workflow Automation',
    priceLow: 800, priceHigh: 2500,
    description: 'Automate one defined business process end-to-end — data sync, document generation, notification workflows, report delivery, or a manual task your team repeats daily.',
    includes: [
      'Process mapping and automation design',
      'Trigger, logic, and action implementation',
      'Error handling and retry policies',
      'Logging and audit trail',
      'Testing with real data',
      'Handover documentation',
    ],
  },
  {
    title: 'Multi-System Automation Platform',
    priceLow: 3000, priceHigh: 9000,
    description: 'A centralised automation layer connecting multiple systems — CRM, ERP, LMS, communication tools, and data warehouses — with orchestration, monitoring, and an admin UI.',
    includes: [
      'Integration architecture design',
      'Multi-system data mapping and transformation',
      'Orchestration engine (n8n, custom, or hybrid)',
      'Admin dashboard for workflow management',
      'Alerting and failure notifications',
      'Full documentation and runbooks',
    ],
  },
  {
    title: 'Process Audit & Automation Roadmap',
    priceLow: 400, priceHigh: 1000,
    description: 'A structured audit of your current manual processes, followed by a prioritised automation roadmap — what to automate first, estimated ROI, and recommended tooling.',
    includes: [
      'Stakeholder interviews and process mapping',
      'Identification of automation candidates',
      'ROI and time-saving estimates per workflow',
      'Tooling recommendations',
      'Prioritised implementation roadmap',
      'Presented report and Q&A session',
    ],
  },
  {
    title: 'Automation Retainer',
    priceLow: 400, prefix: 'From ', suffix: '/month',
    description: 'Ongoing automation development and maintenance — new workflows, integration updates, monitoring, and optimisation of existing automations as your systems evolve.',
    includes: [
      'Reserved monthly engineering hours',
      'New workflow development',
      'Maintenance of existing automations',
      'Integration version updates',
      'Performance monitoring and tuning',
      'Cancel with 30 days notice',
    ],
  },
];

const faqs = [
  {
    q: 'Do you charge for the initial proposal?',
    a: 'No. We provide a full written proposal — including scope, architecture, timeline, and fixed price — at no cost and with no obligation.',
  },
  {
    q: 'What is included in the fixed price?',
    a: 'Everything needed to deliver the agreed scope: design, development, testing, deployment, documentation, and a handover session. Scope changes after sign-off are priced separately.',
  },
  {
    q: 'How are milestone payments structured?',
    a: 'Typically 30% on project kick-off, 40% on delivery of the working system to staging, and 30% on production sign-off. We are flexible for larger projects.',
  },
  {
    q: 'Do prices include VAT?',
    a: 'All prices shown are exclusive of any applicable taxes. Our sales representative will confirm applicable taxes for your location during the proposal stage.',
  },
  {
    q: 'Can I start with hourly and move to fixed-price?',
    a: 'Yes. Many clients use an hourly discovery engagement to fully scope requirements, then transition to a fixed-price build once both sides have full clarity.',
  },
  {
    q: 'What if my project is outside these ranges?',
    a: 'These are typical ranges. Simpler projects cost less; large enterprise builds cost more. Send us your brief and we will give you an accurate quote.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Pricing"
        title="Transparent pricing."
        titleAccent="No surprises."
        subtitle="Fixed-price projects, hourly engagements, and monthly retainers. Every quote is written, itemised, and agreed before we start. You always know what you are paying and what you are getting."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'View All Services', href: '/services' }}
      />

      {/* ── Pricing models ── */}
      <Section
        id="models"
        title="How we work with you"
        subtitle="Three engagement models — choose the one that suits your project and risk appetite."
      >
        <div className="space-y-6 max-w-5xl mx-auto">
          {pricingModels.map((pm) => (
            <div
              key={pm.model}
              className="rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${pm.colour}`}>
                      {pm.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{pm.model}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{pm.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pm.description}</p>
                  <div>
                    <p className="text-2xl font-extrabold text-[#2563EB]">
                      <PriceDisplay low={pm.from.low} prefix={pm.from.prefix} suffix={pm.from.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pm.note}</p>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pm.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                        <span className="text-muted-foreground leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LMS pricing ── */}
      <Section
        id="lms-pricing"
        variant="muted"
        title="LMS development pricing"
        subtitle="Indicative ranges for common LMS engagement types. Exact pricing depends on scope, integrations, and content volume."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {lmsPricing.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">
                  <PriceDisplay low={item.priceLow} high={item.priceHigh} highPlus={item.highPlus} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
          All LMS projects include deployment, documentation, and a handover session. Hosting and infrastructure costs are separate.
        </p>
      </Section>

      {/* ── AI chatbot pricing ── */}
      <Section
        id="chatbot-pricing"
        title="AI chatbot pricing"
        subtitle="Indicative ranges for AI assistant and chatbot builds. Complexity, integrations, and data volume are the main cost drivers."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {chatbotPricing.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">
                  <PriceDisplay low={item.priceLow} high={item.priceHigh} highPlus={item.highPlus} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
          LLM API costs (OpenAI, Anthropic, etc.) are billed separately to you at cost. We help you estimate and optimise ongoing model spend.
        </p>
      </Section>

      {/* ── React pricing ── */}
      <Section
        id="react-pricing"
        variant="muted"
        title="React development pricing"
        subtitle="Indicative ranges for React and Next.js projects. UI complexity, integrations, and state management requirements are the main drivers."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reactPricing.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">
                  <PriceDisplay low={item.priceLow} high={item.priceHigh} highPlus={item.highPlus} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Node.js pricing ── */}
      <Section
        id="node-pricing"
        title="Node.js API pricing"
        subtitle="Indicative ranges for backend API and integration projects. Scope, number of integrations, and data complexity are the primary cost factors."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {nodePricing.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Server className="h-5 w-5" />
                </div>
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">
                  <PriceDisplay low={item.priceLow} high={item.priceHigh} highPlus={item.highPlus} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Automation pricing ── */}
      <Section
        id="automation-pricing"
        variant="muted"
        title="Automation &amp; integration pricing"
        subtitle="Indicative ranges for workflow automation and system integration projects. Number of systems, trigger frequency, and error-handling requirements drive cost."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {automationPricing.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  <Workflow className="h-5 w-5" />
                </div>
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">
                  <PriceDisplay low={item.priceLow} high={item.priceHigh} highPlus={item.highPlus} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── What's always included ── */}
      <Section
        id="always-included"
        variant="muted"
        title="What is always included"
        subtitle="Regardless of project type or size, every engagement includes these as standard."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: <FileText className="h-4 w-4 text-[#2563EB]" />, text: 'Written proposal before commitment' },
            { icon: <ShieldCheck className="h-4 w-4 text-[#2563EB]" />, text: 'TypeScript and code quality standards' },
            { icon: <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />, text: 'Testing against acceptance criteria' },
            { icon: <Zap className="h-4 w-4 text-[#2563EB]" />, text: 'Production deployment' },
            { icon: <FileText className="h-4 w-4 text-[#2563EB]" />, text: 'Full technical documentation' },
            { icon: <MessageSquare className="h-4 w-4 text-[#2563EB]" />, text: 'Handover session with your team' },
            { icon: <ShieldCheck className="h-4 w-4 text-[#2563EB]" />, text: 'Full source code and IP ownership' },
            { icon: <RefreshCw className="h-4 w-4 text-[#2563EB]" />, text: '30-day post-launch support window' },
            { icon: <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />, text: 'Single point of contact throughout' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background p-4">
              <div className="shrink-0">{icon}</div>
              <p className="text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section
        id="faq"
        title="Common questions"
        subtitle="Answers to the questions we get asked most often about pricing and how we work."
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-border/60 bg-background shadow-sm overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-semibold text-sm select-none list-none [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5 pt-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get a fixed-price quote
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us what you need to build. We will come back within one business day with a written
            proposal — scope, architecture, timeline, and a fixed price. No commitment required.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            All prices in GBP · Exclusive of VAT · No obligation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
