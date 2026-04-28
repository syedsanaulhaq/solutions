import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTASection } from '@/components/CTASection';
import { TestimonialsSection } from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code2,
  Server,
  Bot,
  Workflow,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  DollarSign,
  Layers,
  Cpu,
  LifeBuoy,
  PackageCheck,
  Brain,
  Lock,
  Database,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Plug,
  Cog,
  GitBranch,
  Building2,
  Users,
  LayoutDashboard,
  RefreshCw,
  Blocks,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  ...pageMetadata.home,
  ogImage: pageMetadata.home.ogImage,
});

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
    iconBg: 'bg-blue-600',
    accent: 'text-blue-600 dark:text-blue-400',
    accentBorder: 'border-blue-500/20',
    accentBg: 'from-blue-500/10 to-sky-500/10',
    tag: 'Most Popular',
    tagColor: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800',
    title: 'LMS Development',
    description:
      'We design and build end-to-end learning management systems tailored to your organisation — from custom React frontends to full Moodle customisation and white-label platforms at any scale.',
    points: [
      'Custom React + Node.js full-stack LMS builds',
      'Moodle customisation & plugin development',
      'SCORM / xAPI / LTI 1.3 compliance',
      'Multi-tenant & white-label architecture',
      'Learner analytics & progress dashboards',
    ],
    href: '/lms-development',
  },
  {
    icon: <Bot className="h-7 w-7" />,
    iconBg: 'bg-emerald-600',
    accent: 'text-emerald-600 dark:text-emerald-400',
    accentBorder: 'border-emerald-500/20',
    accentBg: 'from-emerald-500/10 to-teal-500/10',
    tag: 'AI-Powered',
    tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800',
    title: 'AI Chatbot Development',
    description:
      'Harness GPT-4o, Claude, and Gemini to build intelligent chatbots that answer questions accurately, automate support, and integrate directly into your product — backed by a full RAG knowledge base.',
    points: [
      'RAG knowledge-base & document Q&A bots',
      'GPT-4o, Claude 3, Gemini multi-model support',
      'Embedded website chat widgets',
      'Customer support & ticketing automation',
      'Conversation analytics & feedback loops',
    ],
    href: '/ai-chatbots',
  },
  {
    icon: <Code2 className="h-7 w-7" />,
    iconBg: 'bg-violet-600',
    accent: 'text-violet-600 dark:text-violet-400',
    accentBorder: 'border-violet-500/20',
    accentBg: 'from-violet-500/10 to-purple-500/10',
    tag: null,
    tagColor: '',
    title: 'React & Web App Development',
    description:
      'We build fast, accessible, and visually polished React applications — from customer-facing portals to complex internal dashboards — using Next.js 14, TypeScript, and TailwindCSS as our foundation.',
    points: [
      'Next.js 14 App Router & React SPA',
      'Admin panels, dashboards & CRM portals',
      'TypeScript throughout — no shortcuts',
      'Fully responsive & accessible (WCAG 2.1)',
      'Optimised Core Web Vitals & SEO',
    ],
    href: '/react-development',
  },
  {
    icon: <Server className="h-7 w-7" />,
    iconBg: 'bg-sky-600',
    accent: 'text-sky-600 dark:text-sky-400',
    accentBorder: 'border-sky-500/20',
    accentBg: 'from-sky-500/10 to-blue-500/10',
    tag: null,
    tagColor: '',
    title: 'Node.js API Development',
    description:
      'Scalable, secure, and well-documented REST and GraphQL APIs built with Node.js. We architect for production from day one — with proper auth, rate limiting, structured logging, and OpenAPI docs.',
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
    iconBg: 'bg-amber-500',
    accent: 'text-amber-600 dark:text-amber-400',
    accentBorder: 'border-amber-500/20',
    accentBg: 'from-amber-500/10 to-orange-500/10',
    tag: null,
    tagColor: '',
    title: 'Automation & Integrations',
    description:
      'We automate the repetitive, error-prone parts of your business — connecting your tools, syncing your data, and building workflows that run reliably so your team can focus on what matters.',
    points: [
      'Business process & workflow automation',
      'n8n, API & webhook-based integrations',
      'CRM, ERP & third-party connectors',
      'Scheduled & event-driven background jobs',
      'Real-time data sync & transformation pipelines',
    ],
    href: '/automation',
  },
];

const whyItems = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'UK-Registered Company',
    body: 'Fully registered and operating in the United Kingdom — proper contracts, UK invoicing, and GDPR-compliant data handling as standard.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Full-Stack Expertise',
    body: 'We cover the full stack — React frontends, Node.js APIs, databases, DevOps, and cloud infrastructure — so you work with one team, not five.',
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'AI-Powered Engineering',
    body: 'We build AI into products as a first-class feature — RAG pipelines, LLM integrations, and intelligent automation using the latest models.',
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Transparent Pricing',
    body: 'Fixed-price quotes for defined scopes, milestone-based payments, and no hidden charges. You always know what you are paying and what you get.',
  },
  {
    icon: <PackageCheck className="h-6 w-6" />,
    title: 'End-to-End Delivery',
    body: 'From scoping and design through development, testing, deployment, and handover — we take full ownership so nothing falls through the cracks.',
  },
  {
    icon: <LifeBuoy className="h-6 w-6" />,
    title: 'Long-Term Support',
    body: 'We do not disappear after launch. Every engagement includes a structured support window, and long-term maintenance retainers are available.',
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
  { label: 'PostgreSQL', category: 'Databases' },
  { label: 'MongoDB', category: 'Databases' },
  { label: 'Redis', category: 'Databases' },
  { label: 'MySQL', category: 'Databases' },
  { label: 'OpenAI GPT-4o', category: 'AI' },
  { label: 'Claude 3', category: 'AI' },
  { label: 'LangChain', category: 'AI' },
  { label: 'Pinecone / pgvector', category: 'AI' },
  { label: 'Docker', category: 'DevOps' },
  { label: 'GitHub Actions', category: 'DevOps' },
  { label: 'PM2', category: 'DevOps' },
  { label: 'Nginx', category: 'DevOps' },
  { label: 'AWS', category: 'Cloud' },
  { label: 'DigitalOcean', category: 'Cloud' },
  { label: 'Google Cloud', category: 'Cloud' },
  { label: 'Vercel', category: 'Cloud' },
];

const categoryColours: Record<string, string> = {
  Frontend: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  Backend: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
  Databases: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  AI: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  DevOps: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  Cloud: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
};

const aiSpotlight = {
  points: [
    { icon: <Brain className="h-4 w-4" />, label: 'RAG knowledge-base bots trained on your docs' },
    { icon: <MessageSquare className="h-4 w-4" />, label: 'Customer support bots with live escalation' },
    { icon: <Globe className="h-4 w-4" />, label: 'Embeddable website chat widgets (single script tag)' },
    { icon: <Lock className="h-4 w-4" />, label: 'Internal AI assistants with SSO + GDPR compliance' },
    { icon: <Database className="h-4 w-4" />, label: 'Vector database integration (Pinecone / pgvector)' },
    { icon: <RefreshCw className="h-4 w-4" />, label: 'Continuous improvement via conversation analytics' },
  ],
};

const reactSpotlight = {
  points: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Real-time data dashboards with drill-down views' },
    { icon: <ShieldCheck className="h-4 w-4" />, label: 'Admin panels with RBAC and full audit logs' },
    { icon: <Users className="h-4 w-4" />, label: 'Customer & partner portals with self-service UX' },
    { icon: <Blocks className="h-4 w-4" />, label: 'Custom UI component libraries and design systems' },
    { icon: <LayoutDashboard className="h-4 w-4" />, label: 'Next.js 14 App Router — fast, SEO-optimised' },
    { icon: <Zap className="h-4 w-4" />, label: 'TypeScript throughout — no shortcuts, ever' },
  ],
};

const nodeSpotlight = {
  points: [
    { icon: <Server className="h-4 w-4" />, label: 'RESTful & GraphQL API design with OpenAPI docs' },
    { icon: <Lock className="h-4 w-4" />, label: 'JWT, OAuth 2.0, and SSO/SAML authentication' },
    { icon: <Plug className="h-4 w-4" />, label: 'Payment gateways, CRM, and third-party connectors' },
    { icon: <Layers className="h-4 w-4" />, label: 'Microservices and serverless architecture' },
    { icon: <ShieldCheck className="h-4 w-4" />, label: 'Rate limiting, structured logging, and monitoring' },
    { icon: <Database className="h-4 w-4" />, label: 'PostgreSQL, MongoDB, Redis — optimised for scale' },
  ],
};

const automationSpotlight = {
  points: [
    { icon: <Cog className="h-4 w-4" />, label: 'Business process automation — eliminate manual steps' },
    { icon: <GitBranch className="h-4 w-4" />, label: 'Multi-step conditional workflow engines' },
    { icon: <Plug className="h-4 w-4" />, label: 'REST, GraphQL, and webhook API integrations' },
    { icon: <Building2 className="h-4 w-4" />, label: 'CRM & ERP connectors (Salesforce, HubSpot, SAP)' },
    { icon: <RefreshCw className="h-4 w-4" />, label: 'Real-time data sync with retry and error handling' },
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Monitoring dashboards and alerting for every pipeline' },
  ],
};

/* ─────────────────────────── page ─────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <Hero
        badge="UK-Registered Software Development Company"
        title="Custom LMS, AI &"
        titleAccent="Web Development Solutions"
        subtitle="We build scalable, modern and intelligent digital systems for businesses worldwide. From LMS platforms to AI chatbots, dashboards, APIs and automation — we deliver solutions that help you grow."
        cta1={{ label: 'Get a Quote', href: '/get-a-quote' }}
        cta2={{ label: 'View Services', href: '/services' }}
      />

      {/* ── 2. Value Proposition ── */}
      <Section id="value-prop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: heading + copy */}
          <div>
            <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
              Who We Are
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Smart.{' '}
              <span className="text-[#2563EB]">Scalable.</span>{' '}
              Future&#8209;Ready.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-base">
              HostingOcean Solutions is the software&#8209;development division of HostingOcean — a
              UK&#8209;registered technology company. We specialise in building custom LMS platforms,
              AI&#8209;powered systems, modern web applications and automation tools tailored to your
              business needs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Every project is handled by the same senior engineers from kick&#8209;off to post&#8209;launch
              support — no handoffs, no juniors on production code, no surprises on your invoice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <Button variant="outline">About Us <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <Link href="/services">
                <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">Our Services <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
          {/* Right: stats grid */}
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

      {/* ── 3. Core Services ── */}
      <Section
        id="services"
        variant="muted"
        title="Core Services"
        subtitle="Everything your business needs to build, launch, and grow digital products — delivered by one expert team."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className={`relative rounded-2xl border ${svc.accentBorder} bg-gradient-to-br ${svc.accentBg} p-7 flex flex-col hover:shadow-lg transition-shadow`}
            >
              {/* Tag */}
              {svc.tag && (
                <span
                  className={`absolute top-5 right-5 text-xs font-semibold px-2.5 py-1 rounded-full border ${svc.tagColor}`}
                >
                  {svc.tag}
                </span>
              )}
              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${svc.iconBg} text-white mb-5`}
              >
                {svc.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {svc.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {svc.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className={`h-4 w-4 ${svc.accent} mt-0.5 shrink-0`} />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={svc.href}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${svc.accent} hover:gap-3 transition-all mt-auto`}
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services">
            <Button size="lg" className="bg-[#2563EB] hover:bg-[#1d4ed8] px-10">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── 4. AI Chatbot Development ── */}
      <Section id="ai-chatbots">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/20">
              AI Chatbot Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Intelligent chatbots powered by{' '}
              <span className="text-emerald-600 dark:text-emerald-400">GPT-4o, Claude & Gemini</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              We build AI chatbots that actually work — grounded in your data, not the model&apos;s general knowledge. Using Retrieval-Augmented Generation (RAG), every response is backed by your documentation, support articles, or internal knowledge base. No hallucinations. No confident wrong answers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Whether you need a 24/7 support bot that deflects 60% of tickets, an embeddable website widget, or a private internal assistant for your team — we build it to production standard with full GDPR compliance, monitoring, and a continuous improvement loop.
            </p>
            <Link href="/ai-chatbots">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Explore AI Chatbots <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiSpotlight.points.map((p) => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800/40">
                <span className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">{p.icon}</span>
                <span className="text-sm font-medium leading-snug">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 5. React Development ── */}
      <Section id="react-development" variant="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reactSpotlight.points.map((p) => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-xl border border-violet-200/60 bg-violet-50/50 dark:bg-violet-900/10 dark:border-violet-800/40">
                <span className="shrink-0 mt-0.5 text-violet-600 dark:text-violet-400">{p.icon}</span>
                <span className="text-sm font-medium leading-snug">{p.label}</span>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <Badge className="mb-4 bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-400 hover:bg-violet-500/20">
              React &amp; Next.js Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Fast, accessible web applications built with{' '}
              <span className="text-violet-600 dark:text-violet-400">React &amp; TypeScript</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              We build complex React applications that go beyond a simple website. From multi-source analytics dashboards to full RBAC admin panels, customer self-service portals, and reusable UI component libraries — we handle the full breadth of the React ecosystem.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              TypeScript is non-negotiable. Next.js 14 App Router throughout. Optimised Core Web Vitals, accessible by default (WCAG 2.1), and responsive on every device.
            </p>
            <Link href="/react-development">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                Explore React Development <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 6. Node.js API Development ── */}
      <Section id="node-api">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-400 hover:bg-sky-500/20">
              Node.js API Development
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Scalable, secure APIs built for{' '}
              <span className="text-sky-600 dark:text-sky-400">production from day one</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              We design and build RESTful and GraphQL APIs that are performant, secure, and maintainable. Proper authentication, rate limiting, structured logging, and full OpenAPI documentation are included as standard — not bolted on later.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Whether you need a standalone backend, a microservices layer, or a tightly integrated Node.js API behind your React app, we architect it correctly and document every endpoint so your team can own it after handover.
            </p>
            <Link href="/node-api-development">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                Explore Node.js APIs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodeSpotlight.points.map((p) => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-xl border border-sky-200/60 bg-sky-50/50 dark:bg-sky-900/10 dark:border-sky-800/40">
                <span className="shrink-0 mt-0.5 text-sky-600 dark:text-sky-400">{p.icon}</span>
                <span className="text-sm font-medium leading-snug">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 7. Automation & Integrations ── */}
      <Section id="automation" variant="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {automationSpotlight.points.map((p) => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-xl border border-amber-200/60 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800/40">
                <span className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400">{p.icon}</span>
                <span className="text-sm font-medium leading-snug">{p.label}</span>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <Badge className="mb-4 bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 hover:bg-amber-500/20">
              Automation &amp; Integrations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Automate the repetitive. Connect{' '}
              <span className="text-amber-600 dark:text-amber-400">every system you use.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              Manual data entry, approval chains over email, end-of-month reports built by hand — these are processes your team has normalised but shouldn&apos;t have to. We audit your workflows, identify the highest-ROI automation targets, and build robust pipelines that run reliably at scale.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              From simple webhook connectors to full multi-step workflow engines with error handling, retry logic, and dead-letter queues — we build automation that your operations team can trust.
            </p>
            <Link href="/automation">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Explore Automation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 8. Why Choose Us ── */}
      <Section
        id="why-us"
        title="Why Choose Us"
        subtitle="Technical skill is the baseline. What sets us apart is how we work — transparently, reliably, and with a genuine stake in your project's success."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="shrink-0 mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1.5 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 9. Technologies We Use ── */}
      <Section
        id="technologies"
        variant="muted"
        title="Technologies We Use"
        subtitle="Battle-tested, production-ready, and actively maintained. We choose tools based on what the job demands — not trends."
      >
        <div className="space-y-5 max-w-4xl mx-auto">
          {(['Frontend', 'Backend', 'Databases', 'AI', 'DevOps', 'Cloud'] as const).map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest w-20 shrink-0 text-right hidden sm:block">
                {cat}
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest sm:hidden">
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

      {/* ── 10. About HostingOcean Solutions ── */}
      <Section id="about">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-5 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            About HostingOcean Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            The software&#8209;development division of{' '}
            <span className="text-[#2563EB]">HostingOcean</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-5">
            HostingOcean Solutions was established to serve businesses that need more than off&#8209;the&#8209;shelf
            software. As the development arm of HostingOcean — a UK&#8209;registered technology company — we
            bring enterprise&#8209;level engineering to organisations of every size, from fast&#8209;growing
            startups to established enterprises.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Our work spans custom learning management systems, AI&#8209;integrated web applications, data
            automation pipelines, and cloud&#8209;hosted infrastructure. Every project is built to last —
            with clean architecture, full documentation, and a handover process that leaves your team
            in complete control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More About Us</Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                View Our Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 11. Testimonials ── */}
      <TestimonialsSection />

      {/* ── 12. Final CTA ── */}
      <CTASection
        badge="Let's Build Together"
        title="Ready to build"
        titleAccent="something great?"
        subtitle="Tell us about your project and we will respond with a clear, no-obligation proposal within one business day — no sales calls, no hard sell, just honest advice."
        primary={{ label: 'Get a Free Quote', href: '/get-a-quote' }}
        secondary={{ label: 'Contact Us', href: '/contact' }}
        trustItems={['No commitment required', 'Response within 24 hours', 'UK-registered company']}
      />
    </>
  );
}
