import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Workflow,
  CheckCircle2,
  ArrowRight,
  Cog,
  GitBranch,
  Plug,
  Building2,
  ShieldCheck,
  Bell,
  FileText,
  BarChart3,
  Zap,
  RefreshCw,
  Clock,
  AlertCircle,
  Database,
  Search,
  Hammer,
  Rocket,
  ChevronDown,
  DollarSign,
  Lightbulb,
} from 'lucide-react';
import { PriceDisplay } from '@/components/PriceDisplay';

export const metadata: Metadata = buildMetadata({
  title: 'Automation & Integrations',
  description:
    'Business process automation, API integrations, workflow orchestration, and CRM/ERP connectors. Custom-built automation that is reliable, monitored, and maintainable.',
  path: '/automation',
  keywords: [
    'business automation',
    'API integration',
    'workflow automation',
    'process automation',
    'CRM integration',
    'ERP integration',
    'event-driven automation',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const automationTypes = [
  {
    icon: <Cog className="h-6 w-6" />,
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    title: 'Business Process Automation',
    subtitle: 'Eliminate the manual steps your team has normalised',
    description:
      'Most teams have processes that everyone knows are wasteful but nobody has time to fix — manual data entry, copy-paste between systems, approval chains over email, end-of-month reports built by hand. We audit, redesign, and automate these processes so your team stops losing hours to work that should not require a human.',
    points: [
      'Process audit to identify the highest-ROI automation targets',
      'Approval workflows with conditional routing and escalation',
      'Automated document generation — invoices, contracts, reports',
      'Data entry elimination via direct system-to-system sync',
      'End-of-period reporting automated to schedule',
      'Onboarding and offboarding workflow automation',
    ],
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    title: 'Workflow Automation',
    subtitle: 'Multi-step, conditional workflows that run reliably at scale',
    description:
      'No-code workflow tools like Zapier and Make are fine for simple two-step automations. When your workflow has branches, error handling, retries, long-running jobs, or needs to process thousands of events per day, you need a properly built workflow engine — not a fragile chain of SaaS glue.',
    points: [
      'Custom workflow engine with conditional branching logic',
      'Retry logic with exponential backoff for transient failures',
      'Dead-letter queues for jobs that exhaust retries',
      'Long-running job support — minutes to hours',
      'Parallel and sequential step execution',
      'Full audit trail of every workflow run and step result',
    ],
  },
  {
    icon: <Plug className="h-6 w-6" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: 'API Integrations',
    subtitle: 'Connect any two systems that have an API or a webhook',
    description:
      'If a system has a REST API, a GraphQL API, or a webhook — we can integrate it. We build the integration layer between your systems, handle authentication, rate limiting, payload transformation, and ensure data stays consistent across platforms even when one side is temporarily unavailable.',
    points: [
      'REST, GraphQL, and SOAP API integrations',
      'Webhook ingestion with signature verification',
      'OAuth 2.0 token management and refresh automation',
      'Payload transformation and data mapping',
      'Rate limit handling with automatic throttling',
      'Idempotency to prevent duplicate processing',
    ],
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    title: 'CRM & ERP Integrations',
    subtitle: 'Keep your customer and operations data in sync automatically',
    description:
      'CRM and ERP systems are the source of truth for your business — but they only work if the data inside them is accurate and current. We build the integration layer that keeps your CRM, ERP, accounting, and operational systems in sync, so your team always works from a single version of the truth.',
    points: [
      'Salesforce, HubSpot, Pipedrive, and Zoho CRM',
      'SAP, NetSuite, Microsoft Dynamics ERP',
      'Xero, QuickBooks, and Sage accounting',
      'Bi-directional sync with conflict resolution',
      'Field mapping, transformation, and normalisation',
      'New record, update, and deletion propagation',
    ],
  },
];

const techStack = [
  { label: 'Node.js', category: 'Runtime' },
  { label: 'TypeScript', category: 'Runtime' },
  { label: 'BullMQ', category: 'Queues' },
  { label: 'RabbitMQ', category: 'Queues' },
  { label: 'AWS SQS', category: 'Queues' },
  { label: 'AWS Lambda', category: 'Queues' },
  { label: 'PostgreSQL', category: 'Storage' },
  { label: 'Redis', category: 'Storage' },
  { label: 'Webhooks', category: 'Integration' },
  { label: 'REST / GraphQL', category: 'Integration' },
  { label: 'n8n', category: 'Integration' },
  { label: 'HubSpot API', category: 'CRM/ERP' },
  { label: 'Salesforce API', category: 'CRM/ERP' },
  { label: 'Xero API', category: 'CRM/ERP' },
  { label: 'Stripe', category: 'Payments' },
  { label: 'SendGrid', category: 'Comms' },
  { label: 'Twilio', category: 'Comms' },
  { label: 'Slack API', category: 'Comms' },
];

const categoryColours: Record<string, string> = {
  Runtime: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Queues: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Storage: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Integration: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'CRM/ERP': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Payments: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Comms: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
};

const principles = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'Reliability over speed',
    description: 'Every automation includes retry logic, error handling, and dead-letter queues. We build for the failure cases, not just the happy path.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-[#2563EB]" />,
    title: 'Monitoring included',
    description: 'Every automation ships with a dashboard showing run history, success rates, failure reasons, and processing volume over time.',
  },
  {
    icon: <Bell className="h-5 w-5 text-[#2563EB]" />,
    title: 'Alerting on failure',
    description: 'Slack or email alerts when automations fail, when error rates spike, or when queues back up — so you know before your team does.',
  },
  {
    icon: <FileText className="h-5 w-5 text-[#2563EB]" />,
    title: 'Full audit trail',
    description: 'Every job run, every step, every payload — logged and queryable. Essential for debugging, compliance, and business continuity.',
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-[#2563EB]" />,
    title: 'Idempotent by design',
    description: 'Automations that can safely re-run without side effects — critical for webhook-based integrations and at-least-once delivery systems.',
  },
  {
    icon: <Database className="h-5 w-5 text-[#2563EB]" />,
    title: 'No vendor lock-in',
    description: 'We build custom automation code, not Zapier flows. You own the code, it runs in your infrastructure, and it is not at the mercy of a SaaS pricing change.',
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    title: 'Scheduled and event-driven',
    description: 'Cron-based batch jobs, real-time webhook triggers, and polling-based integrations — whichever the use case demands.',
  },
  {
    icon: <AlertCircle className="h-5 w-5 text-[#2563EB]" />,
    title: 'Graceful degradation',
    description: 'When a downstream system is unavailable, jobs queue rather than fail. Processing resumes automatically when the system recovers.',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#2563EB]" />,
    title: 'Scales with your volume',
    description: 'Queue-based architectures that process ten events or ten million without code changes — workers scale horizontally as demand grows.',
  },
];

const deliveryProcess = [
  {
    step: '01',
    icon: <Search className="h-5 w-5" />,
    title: 'Process Discovery & Audit',
    description:
      'We start by mapping the processes your team currently handles manually — data entry, approval chains, cross-system transfers, scheduled reports, and recurring operational tasks. We interview stakeholders, document the current state, and quantify the time cost. You receive a prioritised list of automation opportunities ranked by ROI before we agree on scope.',
  },
  {
    step: '02',
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Automation Design & Data Mapping',
    description:
      'We design the automation architecture — trigger model (webhook, polling, schedule, or event), data transformation rules, conditional logic, error handling strategy, retry policy, and monitoring approach. Every field mapping and transformation is documented before development begins. You see and approve the design before we write code.',
  },
  {
    step: '03',
    icon: <FileText className="h-5 w-5" />,
    title: 'Environment & Integration Setup',
    description:
      'We configure the development and staging environments, establish API credentials and OAuth flows for each integrated system, set up the queue infrastructure, and wire up the observability stack — structured logging, job monitoring, and alerting. Everything is validated against test accounts before feature development starts.',
  },
  {
    step: '04',
    icon: <Hammer className="h-5 w-5" />,
    title: 'Build & Sprint Delivery',
    description:
      'Development runs in two-week sprints. Each sprint delivers a working automation flow that you can test end-to-end on staging. We walk you through the monitoring dashboard, show you the audit trail, and confirm the edge cases are handled before moving to the next workflow. No big-bang delivery at the end.',
  },
  {
    step: '05',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'UAT, Load Testing & Monitoring',
    description:
      'Before go-live, we run user acceptance testing with your operations team, stress-test the system at expected peak volumes, verify retry and failure behaviour deliberately, and confirm that alerts fire correctly. The monitoring dashboard is live and your team has been walked through it before we switch production traffic on.',
  },
  {
    step: '06',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Go-Live & Handover',
    description:
      'We manage the cutover — disabling the old manual process, enabling the automation, and monitoring closely for the first 48 hours. You receive full source code, architecture documentation, runbook for common failure scenarios, and a handover session with whoever is responsible for operations.',
  },
];

interface PricingTier {
  title: string;
  priceLow: number;
  priceHigh?: number;
  highPlus?: boolean;
  prefix?: string;
  suffix?: string;
  description: string;
  includes: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    title: 'Single Integration or Automation',
    priceLow: 800, priceHigh: 2500,
    description:
      'A focused automation project — connecting two systems via API, automating a single business process, or replacing a manual data transfer with a reliable scheduled job.',
    includes: [
      'Single workflow or integration',
      'Error handling and retry logic',
      'Job monitoring dashboard',
      'Failure alerting (Slack/email)',
      'Full audit trail',
      'Source code and documentation',
    ],
  },
  {
    title: 'Multi-System Automation Suite',
    priceLow: 3000, priceHigh: 9000,
    description:
      'A comprehensive automation programme — multiple connected workflows, CRM/ERP integrations, event-driven pipelines, and a centralised monitoring layer across all automations.',
    includes: [
      'Multiple workflows and integrations',
      'CRM, ERP, or accounting connectors',
      'Queue-based architecture',
      'Centralised monitoring dashboard',
      'Bi-directional sync with conflict resolution',
      'Full test suite + handover training',
    ],
    highlighted: true,
  },
  {
    title: 'Automation Retainer',
    priceLow: 400, prefix: 'From ', suffix: '/month',
    description:
      'Ongoing automation development — new workflow builds, integration expansions, API version upgrades, monitoring, and on-call support on a rolling monthly contract.',
    includes: [
      'Agreed monthly deliverables',
      'New integration builds on demand',
      'API version upgrade management',
      'Priority incident response',
      'Monthly health report',
      'Cancel with 30 days notice',
    ],
  },
];

const faqs = [
  {
    question: 'Should we use n8n, Zapier, or Make instead of custom code?',
    answer:
      'No-code tools are the right answer for simple, low-volume automations that do not need complex error handling or high reliability. Zapier is fine for sending a Slack message when a form is submitted. The problems start when you add conditions, need retries, process hundreds of events per hour, or integrate with systems that have complex auth flows. At that point, you are fighting the tool rather than using it. We use n8n for the right use cases and custom code when the requirements outgrow a no-code approach — we will tell you honestly which is appropriate during the discovery phase.',
  },
  {
    question: 'How do you handle failures and retries?',
    answer:
      'Every job enters a queue before processing. If it fails, it is retried with exponential backoff — initially after seconds, then minutes, then hours. After a configurable number of retries, it moves to a dead-letter queue where it is preserved for inspection and manual replay. Every failure is logged with the full payload, error message, stack trace, and attempt number. Alerts fire immediately on first failure for critical workflows. The audit trail means you can diagnose exactly what went wrong and replay the job once the issue is resolved.',
  },
  {
    question: 'How long does an automation project take?',
    answer:
      'A single integration or focused automation typically takes 3–6 weeks. A multi-system automation suite with CRM/ERP connectors, custom workflows, and a full monitoring layer runs 8–16 weeks. The discovery and design phase takes 1–2 weeks and produces a scope document and fixed-price quote before development starts. We do not begin building until you have approved both the design and the commercial terms.',
  },
  {
    question: 'Can you migrate automations we already have running in Zapier or Make?',
    answer:
      'Yes — this is a common engagement. We audit your existing Zapier/Make workflows, identify which ones are candidates for consolidation or hardening, and rebuild them as maintainable code. We run both in parallel during the transition period so there is no service interruption. Many clients find the migration also resolves reliability issues they had accepted as normal — failed zaps, duplicate records, and silent data loss are all common in complex no-code setups.',
  },
  {
    question: 'What happens when an integrated platform changes its API?',
    answer:
      'API changes are a reality — and they are handled differently depending on whether you are on a retainer or a fixed-price project. For retainer clients, API version upgrades are covered as part of the monthly scope. For fixed-price projects, we build the integration layer with API versioning and abstraction in mind so that changes are isolated and the upgrade cost is minimised. We also document all integration points so you know exactly which version of each API is in use at any point.',
  },
  {
    question: 'How do we know the automation is working correctly after go-live?',
    answer:
      'Every automation ships with a monitoring dashboard showing real-time job status, processing volume, success/failure rates, and average processing time. Alerts are configured to notify your team via Slack or email when failure rates exceed a threshold or when a queue starts backing up. The full audit trail means you can inspect any individual job run — what triggered it, what data it processed, what it produced, and how long each step took. You are never flying blind.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function AutomationPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Automation & Integrations"
        title="Connect Your Tools."
        titleAccent="Eliminate the Manual Work."
        subtitle="Custom automation workflows and integration layers that connect your systems, keep data in sync, and trigger the right actions at the right time — reliably."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'View All Services', href: '/services' }}
      />

      {/* ── Overview ── */}
      <Section id="overview">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Overview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Automation that actually holds up in production
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            No-code automation tools have a place — but they have a ceiling. When your workflows
            need conditional logic, error recovery, high volume, or tight integration with
            enterprise systems, stitching together Zapier flows creates a maintenance liability
            that compounds over time.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We build custom automation systems — proper code, proper architecture, proper
            monitoring. We start with a process audit to identify where your team is losing the
            most time, then design and implement automation that solves the root cause. Every
            system includes retry logic, alerting, a full audit trail, and a monitoring
            dashboard — so your automations keep running without anyone babysitting them.
          </p>
        </div>
      </Section>

      {/* ── Automation Types ── */}
      <Section id="what-we-build" variant="muted" title="What We Build" subtitle="Four categories of automation and integration work — from internal process automation to enterprise system connectors.">
        <div className="space-y-6">
          {automationTypes.map((at) => (
            <div
              key={at.title}
              className="rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${at.colour}`}>
                      {at.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{at.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{at.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{at.description}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {at.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                        <span className="text-muted-foreground leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Principles ── */}
      <Section id="principles" title="How We Build Automation" subtitle="Every automation system we deliver meets these engineering standards — not just when we hand it over, but six months later too.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {principles.map((p) => (
            <div key={p.title} className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 mt-0.5">{p.icon}</div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section id="tech-stack" variant="muted" title="Technologies We Use" subtitle="Battle-tested tools chosen for reliability, observability, and long-term maintainability.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Runtime', 'Queues', 'Storage', 'Integration', 'CRM/ERP', 'Payments', 'Comms'].map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {cat}
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <span
                      key={t.label}
                      className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColours[cat]}`}
                    >
                      {t.label}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Delivery Process ── */}
      <Section
        id="process"
        variant="muted"
        title="How an Automation Project Works"
        subtitle="A structured delivery process — from process discovery to a go-live you can monitor and trust."
      >
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-[#2563EB]/20 hidden md:block" />
          <div className="space-y-6">
            {deliveryProcess.map((step) => (
              <div key={step.step} className="relative flex gap-6 md:gap-8">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1 pb-6 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#2563EB] tracking-widest uppercase">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Pricing Guidance ── */}
      <Section
        id="pricing"
        title="Automation Pricing Guide"
        subtitle="Fixed-price projects with clear scopes — here is what automation and integration work typically costs."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                tier.highlighted
                  ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-lg shadow-blue-500/10'
                  : 'border-border/60 bg-background'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-4">
                <DollarSign className={`h-6 w-6 mb-3 ${tier.highlighted ? 'text-[#2563EB]' : 'text-muted-foreground'}`} />
                <h3 className="font-bold text-lg mb-1">{tier.title}</h3>
                <p className={`text-2xl font-extrabold ${tier.highlighted ? 'text-[#2563EB]' : 'text-foreground'}`}>
                  <PriceDisplay low={tier.priceLow} high={tier.priceHigh} prefix={tier.prefix} suffix={tier.suffix} />
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tier.description}</p>
              <ul className="space-y-2.5 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${tier.highlighted ? 'text-[#2563EB]' : 'text-emerald-600'}`} />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/contact">
                  <Button
                    className={`w-full ${tier.highlighted ? 'bg-[#2563EB] hover:bg-[#1d4ed8]' : 'bg-transparent border border-border hover:bg-muted text-foreground'}`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          All prices are estimates — final costs depend on scope and number of integrations.{' '}
          <Link href="/pricing" className="text-[#2563EB] hover:underline font-medium">
            View full pricing guide →
          </Link>
        </p>
      </Section>

      {/* ── FAQ ── */}
      <Section
        id="faq"
        variant="muted"
        title="Frequently Asked Questions"
        subtitle="Straight answers to the questions every automation buyer asks."
        align="left"
      >
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border/60 bg-background overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-foreground list-none hover:bg-muted/40 transition-colors">
                {faq.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <Workflow className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop doing things manually
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us which processes are eating your team&apos;s time — even if you are not sure
            whether they can be automated. We will identify the highest-impact opportunities,
            design the right approach, and deliver automation with measurable ROI and a
            fixed-price quote.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free process audit · No commitment · Senior engineers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
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



