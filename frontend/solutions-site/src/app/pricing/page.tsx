import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  FileText,
  RefreshCw,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  Zap,
  ShieldCheck,
} from 'lucide-react';

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
    from: 'From £5,000',
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
    from: '£95/hr',
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
    from: 'From £1,500/month',
    note: 'Minimum 10 hours/month. Volume discounts apply.',
  },
];

const lmsPricing = [
  {
    title: 'Moodle Setup & Configuration',
    range: '£2,500 – £6,000',
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
    range: '£15,000 – £60,000+',
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
    range: '£5,000 – £18,000',
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
    range: 'From £1,500/month',
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

const chatbotPricing = [
  {
    title: 'Knowledge-Base Chatbot',
    range: '£5,000 – £12,000',
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
    range: '£10,000 – £28,000',
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
    range: '£8,000 – £22,000',
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
    range: '£15,000+',
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
    a: 'All prices shown are exclusive of VAT. VAT at the current UK rate is added to invoices for UK clients.',
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
                    <p className="text-2xl font-extrabold text-[#2563EB]">{pm.from}</p>
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
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">{item.range}</span>
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
                <span className="text-lg font-extrabold text-[#2563EB] whitespace-nowrap">{item.range}</span>
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
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border/60 bg-background p-5">
              <div className="flex gap-3.5">
                <div className="shrink-0 mt-0.5">
                  <HelpCircle className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="font-semibold mb-1.5 text-sm">{faq.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
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
