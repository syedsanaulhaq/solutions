import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code2,
  Server,
  Bot,
  Workflow,
  Star,
  Users,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Zap,
  TrendingUp,
  Lock,
  LifeBuoy,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HostingOcean Solutions — Custom LMS, AI & Web Development',
  description:
    'UK-based software development company specialising in custom LMS platforms, AI chatbots, React applications, Node.js APIs, and business automation for companies worldwide.',
  alternates: { canonical: 'https://solutions.hostingocean.co.uk' },
};

/* ─────────────────────────── data ─────────────────────────── */

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years of Expertise' },
  { value: '24/7', label: 'Post-Launch Support' },
];

const services = [
  {
    icon: <BookOpen className="h-7 w-7" />,
    title: 'LMS Development',
    tag: 'Popular',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    description:
      'We design and build end-to-end learning management systems tailored to your organisation — from custom React frontends to full Moodle customisation and white-label platforms at any scale.',
    points: [
      'Custom React + Node.js full-stack LMS',
      'Moodle customisation & plugin development',
      'SCORM / xAPI / LTI 1.3 compliance',
      'Multi-tenant & white-label architecture',
      'Learner analytics & progress dashboards',
    ],
    href: '/lms-development',
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: 'AI Chatbot Development',
    tag: 'New',
    tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    description:
      'Harness the power of GPT-4o, Claude, and Gemini to build intelligent chatbots that answer questions, automate support, and integrate directly into your product — backed by a full RAG knowledge base.',
    points: [
      'RAG knowledge-base & document Q&A bots',
      'GPT-4o, Claude 3, Gemini multi-model support',
      'Embedded website chat widgets',
      'Customer support & ticketing automation',
      'Usage analytics & conversation insights',
    ],
    href: '/ai-chatbots',
  },
  {
    icon: <Code2 className="h-7 w-7" />,
    title: 'React & Next.js Development',
    tag: null,
    tagColor: '',
    description:
      'We build fast, accessible, and visually polished React applications — from customer-facing portals to complex internal dashboards — using Next.js 14, TypeScript, and TailwindCSS as our foundation.',
    points: [
      'Next.js 14 App Router & React SPA',
      'Admin panels, dashboards & CRM portals',
      'TypeScript throughout — zero any-type shortcuts',
      'Fully responsive & accessible (WCAG 2.1)',
      'Optimised Core Web Vitals & SEO',
    ],
    href: '/react-development',
  },
  {
    icon: <Server className="h-7 w-7" />,
    title: 'Node.js API Development',
    tag: null,
    tagColor: '',
    description:
      'Scalable, secure, and well-documented REST and GraphQL APIs built with Node.js. We architect for production from day one — with proper auth, rate limiting, logging, and OpenAPI docs.',
    points: [
      'RESTful & GraphQL API design',
      'JWT / OAuth2 / SSO authentication',
      'Third-party & payment gateway integrations',
      'Microservices & serverless architecture',
      'OpenAPI / Swagger documentation',
    ],
    href: '/node-api-development',
  },
  {
    icon: <Workflow className="h-7 w-7" />,
    title: 'Automation & Integrations',
    tag: null,
    tagColor: '',
    description:
      'We automate the repetitive, error-prone parts of your business — connecting your tools, syncing your data, and building workflows that run reliably in the background so your team can focus on what matters.',
    points: [
      'Business process & workflow automation',
      'API, webhook & Zapier-style integrations',
      'CRM, ERP & third-party connectors',
      'Scheduled & event-driven background jobs',
      'Real-time data sync & transformation pipelines',
    ],
    href: '/automation',
  },
];

const whyItems = [
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Senior Engineers Only',
    body: 'Every project is led and delivered by experienced senior developers. No juniors on production code, no offshore handoffs.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'On-Time, Every Time',
    body: 'We use transparent, milestone-based project management with weekly progress updates so you always know where things stand.',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Security-First by Default',
    body: 'Every system ships with OWASP best practices, GDPR compliance, input validation, and production hardening built in from the start.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'UK-Registered Company',
    body: 'Fully registered and operating in the United Kingdom — proper contracts, UK invoicing, and compliant data residency as standard.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Your Dedicated Team',
    body: 'You get a dedicated squad for your project — the same people from kick-off to go-live, not a rotating pool of generalists.',
  },
  {
    icon: <LifeBuoy className="h-6 w-6" />,
    title: 'Post-Launch Support',
    body: 'We do not disappear after delivery. Every engagement includes a structured support and maintenance window — 30, 60, or 90 days.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Built to Scale',
    body: 'Architecture decisions are made with growth in mind. Whether you have 100 users or 100,000, your system handles it without a rewrite.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Honest Partnerships',
    body: 'We tell you what is feasible, what is not, and what the real costs are — before you commit to anything.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Fast Turnaround',
    body: 'Lean processes and no unnecessary overhead mean we move quickly. Most scoping calls turn into proposals within 24 hours.',
  },
];

const techStack = [
  { label: 'React', category: 'Frontend' },
  { label: 'Next.js 14', category: 'Frontend' },
  { label: 'TypeScript', category: 'Frontend' },
  { label: 'TailwindCSS', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Express', category: 'Backend' },
  { label: 'GraphQL', category: 'Backend' },
  { label: 'REST APIs', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'Redis', category: 'Database' },
  { label: 'OpenAI GPT-4o', category: 'AI' },
  { label: 'Claude 3', category: 'AI' },
  { label: 'LangChain', category: 'AI' },
  { label: 'Moodle', category: 'LMS' },
  { label: 'SCORM / xAPI', category: 'LMS' },
  { label: 'Docker', category: 'DevOps' },
  { label: 'AWS', category: 'DevOps' },
  { label: 'PM2', category: 'DevOps' },
  { label: 'GitHub Actions', category: 'DevOps' },
];

const categoryColours: Record<string, string> = {
  Frontend: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  Backend: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
  Database: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  AI: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  LMS: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
  DevOps: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

/* ─────────────────────────── page ─────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="UK-Based Software Development · solutions.hostingocean.co.uk"
        title="We Build Digital Systems That"
        titleAccent="Actually Work"
        subtitle="Custom LMS platforms, AI-powered chatbots, React applications, Node.js APIs, and business automation — engineered to production standard by a dedicated UK team."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'Explore Our Services', href: '/services' }}
      />

      {/* ── Stats / Value Proposition ── */}
      <Section id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
              About Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              A UK software team that delivers what it promises
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              HostingOcean Solutions is the software development arm of HostingOcean — a UK-registered
              technology company. We work with businesses across education, enterprise, and the technology
              sector to design, build, and maintain digital products that scale.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From a custom LMS for a training provider to an AI-powered support bot for a SaaS company,
              every engagement is handled by the same senior engineers from kick-off to post-launch
              support — no handoffs, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline">View All Services</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border border-border/60 bg-muted/30 text-center"
              >
                <span className="text-4xl font-extrabold text-[#2563EB] mb-2">{value}</span>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── LMS Development ── */}
      <Section id="lms" variant="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-[#38BDF8]/10 border border-[#2563EB]/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Our flagship service</p>
                <h3 className="font-bold text-lg">LMS Development</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {services[0].points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/lms-development">
                <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100">
              LMS Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Learning platforms built for the way people actually learn
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Off-the-shelf LMS tools are full of features you do not need and missing the ones you do.
              We build bespoke learning management systems from the ground up — or transform your existing
              Moodle instance into something your learners will actually enjoy using.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a training provider, a university, or an enterprise rolling out internal
              learning programmes, we have the experience to deliver a platform that fits your exact
              requirements — SCORM, xAPI, LTI 1.3, multi-tenancy, white-labelling, and all.
            </p>
          </div>
        </div>
      </Section>

      {/* ── AI Chatbots ── */}
      <Section id="ai-chatbots">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100">
              AI Chatbots
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Intelligent chatbots that know your business inside out
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Generic AI assistants give generic answers. We build chatbots that are trained on your
              documentation, your product, and your processes — so they can answer customer questions
              accurately, handle support requests automatically, and escalate when they should.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Built on GPT-4o, Claude 3, and Gemini with a full Retrieval-Augmented Generation (RAG)
              pipeline, your bot does not hallucinate. It retrieves real answers from real sources.
            </p>
            <Link href="/ai-chatbots">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                Explore AI Chatbots <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">AI-Powered</p>
                <h3 className="font-bold text-lg">AI Chatbot Development</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {services[1].points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── React + Node ── */}
      <Section id="web-dev" variant="muted">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800 hover:bg-violet-100">
            Web Development
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Full-stack React & Node.js development
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From a polished customer portal to a high-throughput GraphQL API, we build the full stack —
            TypeScript from the database layer to the browser, with architecture that stands up to real traffic.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* React card */}
          <div className="rounded-2xl border border-border/60 p-8 bg-background hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] mb-5">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">React & Next.js Applications</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Fast, accessible, production-grade React applications. We use Next.js 14 App Router,
              TailwindCSS, and TypeScript to build UIs that perform brilliantly and score well on
              Core Web Vitals — not just look good in a Figma mockup.
            </p>
            <ul className="space-y-2 mb-6">
              {services[2].points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/react-development" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all">
              View React services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Node card */}
          <div className="rounded-2xl border border-border/60 p-8 bg-background hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Node.js API Development</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Scalable, secure, and thoroughly documented REST and GraphQL APIs. We build for production
              from day one — with proper authentication, rate limiting, structured logging, and
              OpenAPI specs your team can actually use.
            </p>
            <ul className="space-y-2 mb-6">
              {services[3].points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/node-api-development" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all">
              View API services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Automation ── */}
      <Section id="automation">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Workflow className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Save Hours Every Week</p>
                <h3 className="font-bold text-lg">Automation & Integrations</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {services[4].points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/automation">
                <Button variant="outline">
                  Explore Automation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100">
              Automation & Integrations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Stop doing manually what a system can do for you
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Manual data entry, copy-pasting between tools, chasing approvals by email — these are
              not just time-wasters, they are sources of error. We build automation workflows and
              integration layers that connect your systems and keep your data flowing accurately.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you need a simple webhook integration or a fully orchestrated multi-system
              workflow with error handling and alerting, we scope it, build it, and hand it over with
              full documentation.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Why Choose Us ── */}
      <Section
        id="why-us"
        variant="muted"
        title="Why Clients Choose Us"
        subtitle="Technical skill is the baseline. What sets us apart is how we work — transparently, reliably, and with a genuine stake in your project's success."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-5 rounded-xl border border-border/50 bg-background hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Technologies ── */}
      <Section
        id="technologies"
        title="Technologies We Use"
        subtitle="Battle-tested, production-ready, and actively maintained. We choose tools based on the job — not trends."
      >
        <div className="space-y-6">
          {(['Frontend', 'Backend', 'Database', 'AI', 'LMS', 'DevOps'] as const).map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest w-20 shrink-0 text-right hidden sm:block">
                {cat}
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <span
                      key={t.label}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium ${categoryColours[cat]}`}
                    >
                      {t.label}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
            Ready to get started?
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Let&apos;s build something you&apos;re{' '}
            <span className="text-[#38BDF8]">proud of</span>
          </h2>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">
            Tell us about your project. We will respond with a clear, no-obligation proposal within
            one business day — no sales calls, no hard sell, just honest advice on what we can build
            for you and how long it will take.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                Browse All Services
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-slate-500" /> No commitment required</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-500" /> Response within 24 hours</span>
            <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-slate-500" /> UK-registered company</span>
          </div>
        </div>
      </Section>
    </>
  );
}
