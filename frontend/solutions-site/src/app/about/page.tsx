import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Heart,
  Lightbulb,
  ShieldCheck,
  Users,
  Layers,
  Code2,
  Zap,
  MessageSquare,
  TrendingUp,
  Clock,
  Globe,
  GraduationCap,
  Building2,
  ShoppingBag,
  Briefcase,
  Cpu,
  Stethoscope,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'HostingOcean Solutions is a global software development company. Learn about our mission, values, approach, and the team behind our custom LMS, AI chatbot, and web development work.',
  path: '/about',
  keywords: [
    'about HostingOcean Solutions',
    'global software development team',
    'custom web development company',
    'software agency',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const values = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'Reliability over promises',
    description:
      'We say what we will do and then do it. Fixed-price quotes, honest timelines, and no surprises at handover.',
  },
  {
    icon: <Code2 className="h-5 w-5 text-[#2563EB]" />,
    title: 'Code quality is non-negotiable',
    description:
      'TypeScript throughout, test coverage, clean architecture, and documented APIs. Code you can maintain after we have gone.',
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-[#2563EB]" />,
    title: 'Communication as a feature',
    description:
      'A dedicated point of contact, weekly progress updates, and async availability. You always know where your project stands.',
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-[#2563EB]" />,
    title: 'We solve the real problem',
    description:
      'We ask why before we ask how. Understanding your business goal means we build the right thing — not just what was specified.',
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#2563EB]" />,
    title: 'Long-term thinking',
    description:
      'We build systems designed to last. Scalable architectures, sensible dependencies, and no vendor lock-in by default.',
  },
  {
    icon: <Heart className="h-5 w-5 text-[#2563EB]" />,
    title: 'We care about outcomes',
    description:
      'We measure success by whether the software actually moves the needle for your business — not by whether we shipped on time.',
  },
];

const differentiators = [
  {
    icon: <Target className="h-6 w-6 text-[#2563EB]" />,
    title: 'Fixed-price delivery',
    description:
      'Every project is scoped and priced upfront. No day-rate billing, no scope-creep invoices. You know the cost before we start.',
  },
  {
    icon: <Users className="h-6 w-6 text-[#2563EB]" />,
    title: 'Senior-level engineers only',
    description:
      'Your project is not handed to juniors after the sales call. The engineers who scoped your project build it.',
  },
  {
    icon: <Globe className="h-6 w-6 text-[#2563EB]" />,
    title: 'Globally experienced',
    description:
      'We have delivered projects for clients across the Middle East, Europe, North America, and South Asia. We work with businesses worldwide.',
  },
  {
    icon: <Layers className="h-6 w-6 text-[#2563EB]" />,
    title: 'Full-stack specialists',
    description:
      'From database schema to React component — we own the full stack. No coordination overhead between frontend and backend teams.',
  },
  {
    icon: <Clock className="h-6 w-6 text-[#2563EB]" />,
    title: 'Structured delivery process',
    description:
      'Discovery → Architecture → Build → Review → Handover. Each stage has defined deliverables so there are no grey areas.',
  },
  {
    icon: <Zap className="h-6 w-6 text-[#2563EB]" />,
    title: 'No bloated agency overhead',
    description:
      'We operate lean. No account managers, no unnecessary meetings, no inflated day rates to cover a large office. The budget goes into the build.',
  },
];

const approachSteps = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We start with a structured discovery call to understand your business, your users, and the problem you need solved. We ask the uncomfortable questions early so they do not surface mid-build.',
  },
  {
    step: '02',
    title: 'Proposal & architecture',
    description:
      'We produce a written proposal covering scope, technical architecture, third-party integrations, timeline, and a fixed price. No vague estimates.',
  },
  {
    step: '03',
    title: 'Build & review cycles',
    description:
      'Development in two-week cycles with a review at the end of each. You see real, working software — not slides. Feedback is incorporated before the next cycle starts.',
  },
  {
    step: '04',
    title: 'Testing & QA',
    description:
      'Automated test suite, manual QA against the agreed acceptance criteria, and performance testing before any production deployment.',
  },
  {
    step: '05',
    title: 'Deployment & handover',
    description:
      'We deploy to production, provide full documentation, and run a handover session with your team. You leave with code you own and understand.',
  },
  {
    step: '06',
    title: 'Support & iteration',
    description:
      'Post-launch support included as standard. Ongoing maintenance and feature iteration available — on retainer or project-by-project.',
  },
];

const techCategories = [
  {
    category: 'Frontend',
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    tools: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'],
  },
  {
    category: 'Backend',
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    tools: ['Node.js', 'Express', 'Fastify', 'REST', 'GraphQL'],
  },
  {
    category: 'LMS',
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    tools: ['Moodle', 'SCORM', 'xAPI', 'H5P', 'Custom LMS'],
  },
  {
    category: 'AI',
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    tools: ['OpenAI', 'LangChain', 'RAG', 'Pinecone', 'pgvector'],
  },
  {
    category: 'Database',
    colour: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    tools: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
  },
  {
    category: 'Infrastructure',
    colour: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    tools: ['AWS', 'Docker', 'PM2', 'GitHub Actions', 'Terraform'],
  },
];

const services = [
  { label: 'LMS Development', href: '/lms-development' },
  { label: 'AI Chatbots', href: '/ai-chatbots' },
  { label: 'React Development', href: '/react-development' },
  { label: 'Node.js API Development', href: '/node-api-development' },
  { label: 'Automation & Integrations', href: '/automation' },
];

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '30+', label: 'Satisfied clients' },
  { value: '5+', label: 'Years experience' },
  { value: '100%', label: 'Source code ownership' },
];

const industries = [
  {
    icon: <GraduationCap className="h-6 w-6 text-[#2563EB]" />,
    title: 'Education & EdTech',
    description: 'Custom LMS platforms, SCORM-compliant course builders, and learner analytics dashboards for training providers, universities, and corporate L&D teams.',
  },
  {
    icon: <Building2 className="h-6 w-6 text-[#2563EB]" />,
    title: 'Finance & FinTech',
    description: 'Secure REST APIs, compliance-aware data pipelines, and client-facing portals for financial services companies requiring robust audit trails.',
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-[#2563EB]" />,
    title: 'Healthcare & MedTech',
    description: 'Patient-facing React applications, clinical data integrations, and automation workflows built with data privacy and regulatory requirements in mind.',
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-[#2563EB]" />,
    title: 'E-commerce & Retail',
    description: 'Storefront customisations, inventory automation, ERP integrations, and AI-powered product recommendation and support chatbots.',
  },
  {
    icon: <Cpu className="h-6 w-6 text-[#2563EB]" />,
    title: 'SaaS & Startups',
    description: 'Full-stack product builds from MVP to scale — multi-tenant architecture, subscription billing integration, and self-serve onboarding flows.',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-[#2563EB]" />,
    title: 'Professional Services',
    description: 'Client portal development, document automation, CRM integrations, and internal tooling for law firms, consultancies, and accountancy practices.',
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A focused MVP or a single-service integration typically takes 4–8 weeks. A full custom LMS platform or multi-service API backend is usually 10–20 weeks. We always give you a milestone-based timeline in the proposal so you can plan around it.',
  },
  {
    q: 'What exactly is in a fixed-price quote?',
    a: 'The quote covers the full agreed scope: all development work, code review, automated testing, deployment to your environment, documentation, and a post-launch support window. If the scope changes, we raise a change request with a revised price before doing the additional work — no surprise invoices.',
  },
  {
    q: 'Do you work with non-technical founders?',
    a: 'Yes, and we enjoy it. We will translate your business problem into a technical approach and explain every decision in plain English. You do not need to know what a REST API is to work effectively with us.',
  },
  {
    q: 'Who owns the code and intellectual property?',
    a: 'You do. Upon project completion and final payment, all source code, assets, and IP transfer to you in full. We do not retain licences, backdoors, or ongoing dependencies on our infrastructure.',
  },
  {
    q: 'Can you join our existing development team?',
    a: 'Yes. We offer both standalone project delivery and embedded team augmentation. If you have in-house developers, we can work alongside them — contributing to your repository, following your standards, and handing off cleanly.',
  },
  {
    q: 'What post-launch support do you offer?',
    a: 'Every project includes a 30-day post-launch support window at no extra charge. After that, we offer a monthly maintenance retainer covering bug fixes, dependency updates, and minor feature additions. Larger changes are quoted as separate projects.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="About Us"
        title="Expert engineers who"
        titleAccent="build software that lasts."
        subtitle="HostingOcean Solutions is a software development company specialising in LMS platforms, AI chatbots, React applications, Node.js APIs, and automation systems — all delivered with fixed-price quotes, senior engineers, and full source ownership."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'View Our Services', href: '/services' }}
      />

      {/* ── Stats ── */}
      <div className="bg-[#0F172A] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <Section id="mission">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Our Mission
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Software that actually works for your business
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            We started HostingOcean Solutions because we kept seeing the same pattern: businesses
            paying significant sums for bespoke software that arrived late, went over budget, and
            needed a full rewrite within two years. The problem was not the technology — it was the
            process, the incentives, and who was actually doing the work.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Our mission is straightforward: deliver software that solves the problem it was built
            for, on time, at the agreed price, written to a standard that means it can be maintained
            and extended without us. We measure success by whether your business is in a better
            position after working with us — not by whether we shipped something and invoiced.
          </p>
        </div>
      </Section>

      {/* ── Values ── */}
      <Section
        id="values"
        variant="muted"
        title="What we stand for"
        subtitle="The principles that shape how we work, how we communicate, and what we ship."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/10">
                {v.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground text-sm">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── What makes us different ── */}
      <Section
        id="difference"
        title="What makes us different"
        subtitle="We are not a traditional agency. Here is what that means in practice."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 mb-4">
                {d.icon}
              </div>
              <h3 className="font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Our approach ── */}
      <Section
        id="approach"
        variant="muted"
        title="Our approach"
        subtitle="A structured process that eliminates the most common causes of project failure."
      >
        <div className="max-w-3xl mx-auto space-y-0">
          {approachSteps.map((s, i) => (
            <div key={s.step} className="flex gap-5">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white text-xs font-bold">
                  {s.step}
                </div>
                {i < approachSteps.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" />
                )}
              </div>
              {/* Content */}
              <div className={`pb-8 ${i === approachSteps.length - 1 ? 'pb-0' : ''}`}>
                <h3 className="font-semibold mb-1.5 mt-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section
        id="experience"
        title="Our experience"
        subtitle="The domains and project types we have delivered across multiple industries."
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">View service page →</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}

            {/* Catch-all card */}
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border/60 bg-muted/30 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Layers className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold">Something else?</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  If it runs on Node, React, or a browser — we can build it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Industries ── */}
      <Section
        id="industries"
        title="Industries we serve"
        subtitle="We bring specialist knowledge across a wide range of verticals — not just technical expertise."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 mb-4">
                {ind.icon}
              </div>
              <h3 className="font-semibold mb-2">{ind.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{ind.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech stack ── */}
      <Section
        id="tech-stack"
        variant="muted"
        title="Our technology stack"
        subtitle="Battle-tested tools chosen for stability, performance, and long-term maintainability."
      >
        <div className="space-y-5 max-w-4xl mx-auto">
          {techCategories.map(({ category, colour, tools }) => (
            <div key={category} className="flex flex-wrap items-center gap-3">
              <span className="w-28 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${colour}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section
        id="faq"
        title="Common questions"
        subtitle="Everything you need to know before starting a project with us."
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
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project. We will review it, ask the right questions, and come back
            with a clear proposal — scope, architecture, timeline, and a fixed price — within one
            business day.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            No commitment · Fixed-price quotes · Senior engineers
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
