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
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Automation & Integrations',
  description:
    'Business process automation, API integrations, workflow orchestration, and CRM/ERP connectors. Custom-built automation that is reliable, monitored, and maintainable.',
  path: '/automation',
  keywords: [
    'business automation',
    'API integration',
    'workflow automation',
    'process automation UK',
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
            Free process audit · No commitment · UK-based team
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


export const metadata: Metadata = buildMetadata({
  title: 'Automation & Integrations',
  description:
    'Business process automation, API integrations, and workflow systems. Connect your tools and eliminate manual work.',
  path: '/automation',
  keywords: ['business automation', 'API integration', 'workflow automation', 'process automation UK', 'Zapier alternative'],
});

export default function AutomationPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'Automation & Integrations',
        title: 'Automate Your',
        titleAccent: 'Business Processes',
        subtitle:
          'We connect your systems, eliminate repetitive manual work, and build intelligent workflows that run automatically — so your team can focus on what matters.',
      }}
      overview="From simple webhook integrations between two SaaS tools to complex event-driven automation architectures, we design and build systems that make your business run more efficiently. We start with a process audit to understand where time is being lost, then design and implement automation that actually sticks — not brittle no-code flows that break when a vendor updates their API."
      features={[
        {
          title: 'Business Process Automation',
          description:
            'Audit, redesign, and automate your manual workflows — approvals, notifications, data syncs, report generation, and more.',
        },
        {
          title: 'API Integrations',
          description:
            'Connect any two systems via REST, GraphQL, or webhooks — CRM, ERP, accounting, HR, e-commerce, and beyond.',
        },
        {
          title: 'CRM & ERP Connectors',
          description:
            'Custom integrations with Salesforce, HubSpot, Pipedrive, SAP, and other enterprise platforms.',
        },
        {
          title: 'Workflow Orchestration',
          description:
            'Multi-step, conditional workflow engines with retries, error handling, and audit logs — built to be reliable.',
        },
        {
          title: 'Scheduled & Event-Driven Jobs',
          description:
            'Cron-based batch jobs, webhook listeners, and event-driven pipelines that run on schedule or on trigger.',
        },
        {
          title: 'Data Pipelines & ETL',
          description:
            'Extract, transform, and load data between systems — warehouses, CRMs, analytics platforms, and reporting tools.',
        },
        {
          title: 'Notification & Alerting Systems',
          description:
            'Automated email, SMS, Slack, and Teams notifications triggered by business events and thresholds.',
        },
        {
          title: 'Document Generation',
          description:
            'Automated generation of PDFs, invoices, contracts, and reports from templates and live data.',
        },
        {
          title: 'Monitoring & Alerting',
          description:
            'Every automation includes health monitoring, failure alerts, and a dashboard showing run history and error logs.',
        },
      ]}
      techStack={[
        'Node.js', 'TypeScript', 'BullMQ', 'RabbitMQ',
        'AWS SQS / Lambda', 'PostgreSQL', 'Redis',
        'REST / GraphQL', 'Webhooks', 'n8n',
        'Stripe', 'SendGrid', 'Twilio', 'Slack API',
        'HubSpot', 'Salesforce', 'Docker', 'Terraform',
      ]}
      cta={{
        title: 'Stop doing things manually',
        subtitle:
          "Tell us which processes are eating your team's time. We'll identify the highest-impact automation opportunities and deliver a solution with measurable ROI.",
      }}
    />
  );
}
