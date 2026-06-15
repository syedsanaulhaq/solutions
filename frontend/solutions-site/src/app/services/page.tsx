import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, pageMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code2,
  Server,
  Bot,
  Workflow,
  Cloud,
  LayoutDashboard,
  Package,
  Globe,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  ...pageMetadata.services,
  ogImage: pageMetadata.services.ogImage,
});

/* ─────────────────────────── data ─────────────────────────── */

const services = [
  {
    id: 'lms',
    icon: <BookOpen className="h-7 w-7" />,
    iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    badge: 'Most Popular',
    badgeStyle: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800',
    title: 'LMS Development',
    subtitle: 'Custom learning management systems built for scale',
    description:
      'Off-the-shelf LMS tools are bloated with features you do not need and missing the ones you do. We design and build bespoke learning platforms from scratch — or overhaul your existing Moodle instance — to deliver a seamless learning experience that your users actually enjoy.',
    points: [
      'Custom React frontend + Node.js backend full-stack LMS',
      'Moodle customisation, theme development & plugin builds',
      'SCORM, xAPI, and LTI 1.3 compliance',
      'Multi-tenant architecture for training providers',
      'White-label options with custom branding',
      'Learner progress tracking, reporting & analytics dashboards',
    ],
    href: '/lms-development',
    cta: 'Explore LMS Development',
  },
  {
    id: 'react',
    icon: <Code2 className="h-7 w-7" />,
    iconBg: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    badge: null,
    badgeStyle: '',
    title: 'React & Next.js Development',
    subtitle: 'Fast, accessible, production-grade web applications',
    description:
      'We build modern web applications using Next.js 14, React, TypeScript, and TailwindCSS — from customer-facing portals to complex internal dashboards. Everything we ship scores well on Core Web Vitals, is accessible by default, and is built to grow with your business.',
    points: [
      'Next.js 14 App Router & React single-page applications',
      'Admin panels, customer portals & CRM-style interfaces',
      'TypeScript throughout — no any-type shortcuts',
      'Component libraries and design systems',
      'Fully responsive, WCAG 2.1 AA accessible',
      'SEO-optimised with structured data and Open Graph',
    ],
    href: '/react-development',
    cta: 'Explore React Development',
  },
  {
    id: 'node',
    icon: <Server className="h-7 w-7" />,
    iconBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    badge: null,
    badgeStyle: '',
    title: 'Node.js API Development',
    subtitle: 'Scalable, secure APIs built for production from day one',
    description:
      'We architect and build REST and GraphQL APIs that handle real traffic, have proper security, and come with full OpenAPI documentation. Whether you need a single integration endpoint or a microservices backbone, we design it to scale without a rewrite.',
    points: [
      'RESTful & GraphQL API design and implementation',
      'JWT, OAuth2, and SSO authentication systems',
      'Third-party and payment gateway integrations',
      'Microservices and serverless architecture',
      'Rate limiting, logging, and error handling built in',
      'OpenAPI / Swagger documentation as standard',
    ],
    href: '/node-api-development',
    cta: 'Explore API Development',
  },
  {
    id: 'ai',
    icon: <Bot className="h-7 w-7" />,
    iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    badge: 'New',
    badgeStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800',
    title: 'AI Chatbot Development',
    subtitle: 'Intelligent bots trained on your business, not the internet',
    description:
      'Generic AI assistants give generic answers. We build chatbots grounded in your own documentation, policies, and product knowledge using a full Retrieval-Augmented Generation (RAG) pipeline — so your bot gives accurate, source-backed answers every time.',
    points: [
      'RAG knowledge-base pipelines with GPT-4o, Claude 3 & Gemini',
      'Document ingestion from PDFs, URLs, Notion, Confluence & more',
      'Embeddable website chat widgets',
      'Customer support automation and ticket deflection',
      'Handoff to human agents when confidence is low',
      'Usage analytics, conversation logging & performance reporting',
    ],
    href: '/ai-chatbots',
    cta: 'Explore AI Chatbots',
  },
  {
    id: 'automation',
    icon: <Workflow className="h-7 w-7" />,
    iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    badge: null,
    badgeStyle: '',
    title: 'Automation & Integrations',
    subtitle: 'Connect your tools. Eliminate the manual work.',
    description:
      'Manual processes, copy-paste data transfers, and email-based approvals are slowing your team down. We build automation workflows and integration layers that connect your systems, keep data in sync, and trigger the right actions at the right time — reliably.',
    points: [
      'Business process and workflow automation',
      'API, webhook and event-driven integrations',
      'CRM, ERP and third-party platform connectors',
      'Scheduled, time-based and condition-triggered jobs',
      'Real-time data sync and transformation pipelines',
      'Error handling, retry logic and alerting built in',
    ],
    href: '/automation',
    cta: 'Explore Automation',
  },
  {
    id: 'devops',
    icon: <Cloud className="h-7 w-7" />,
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    badge: null,
    badgeStyle: '',
    title: 'DevOps & Cloud Setup',
    subtitle: 'Infrastructure that is secure, scalable, and hands-off',
    description:
      'Great software running on a poorly configured server is a liability. We set up and harden your cloud infrastructure — CI/CD pipelines, containerisation, monitoring, and backups — so your application stays online and deployments take seconds, not hours.',
    points: [
      'AWS, DigitalOcean, VPS and cPanel/WHM server setup',
      'Docker containerisation and docker-compose orchestration',
      'CI/CD pipelines with GitHub Actions',
      'PM2, NGINX and Apache reverse proxy configuration',
      'SSL, firewall hardening and automated backups',
      'Uptime monitoring, alerting and incident response',
    ],
    href: '/contact',
    cta: 'Get a DevOps Quote',
  },
  {
    id: 'portals',
    icon: <Globe className="h-7 w-7" />,
    iconBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    badge: null,
    badgeStyle: '',
    title: 'Web Portal Development',
    subtitle: 'Secure, login-based systems built for your clients, staff, or students',
    description:
      'We design and build login-based web portals that give your clients, staff, students, or customers a dedicated, secure digital space. Whether you need a client portal for a service business, a school system for educators and students, or an employee intranet — built around your exact workflow and brand.',
    points: [
      'Client portals — invoices, files, project status, messaging',
      'School & student portals — courses, schedules, grades',
      'Employee & staff portals — HR forms, payslips, shift management',
      'Booking portals — scheduling, payments, reminders',
      'Customer portals — order tracking, support tickets',
      'Role-based access — admin, staff, and end-user views',
      'Secure auth — email/password, Google SSO, magic links',
      'Mobile-responsive, works on all devices without an app',
    ],
    href: '/services/web-portals',
    cta: 'Explore Web Portals',
  },
  {
    id: 'dashboards',
    icon: <LayoutDashboard className="h-7 w-7" />,
    iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    badge: null,
    badgeStyle: '',
    title: 'Custom Dashboards',
    subtitle: 'Turn your data into decisions with purpose-built dashboards',
    description:
      'Generic BI tools force you to work with their data model. We build custom dashboards that pull from your exact data sources, display the KPIs your team actually tracks, and update in real time — embedded directly into your product or delivered as a standalone tool.',
    points: [
      'Real-time and historical data visualisation',
      'Multi-source data aggregation (databases, APIs, spreadsheets)',
      'Role-based access — different views for different users',
      'Charts, tables, maps, KPI cards and drill-downs',
      'Export to PDF, CSV and scheduled email reports',
      'Embedded or standalone — white-labelled if required',
    ],
    href: '/contact',
    cta: 'Get a Dashboard Quote',
  },
  {
    id: 'sdk',
    icon: <Package className="h-7 w-7" />,
    iconBg: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
    badge: null,
    badgeStyle: '',
    title: 'SDK Development',
    subtitle: 'Let developers integrate your product in minutes, not days',
    description:
      'If you have an API that other developers consume, a well-built SDK dramatically increases adoption. We design and build TypeScript and JavaScript SDKs that are a pleasure to use — with full type safety, autocompletion, error handling, and clear documentation.',
    points: [
      'TypeScript and JavaScript SDK development',
      'Full type definitions and IntelliSense autocompletion',
      'Automatic retry logic and structured error handling',
      'npm package publishing and versioning',
      'Comprehensive README, usage examples and changelog',
      'Unit and integration test suite included',
    ],
    href: '/contact',
    cta: 'Get an SDK Quote',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="8 Service Lines · Senior Engineers"
        title="Everything We Build"
        titleAccent="For You"
        subtitle="From bespoke LMS platforms to AI chatbots, Node.js APIs to full DevOps setups — one team, one point of contact, delivered to production standard."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'View Pricing', href: '/contact' }}
      />

      {/* ── Intro ── */}
      <Section id="intro">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            The full spectrum of modern software development
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We are not a generalist agency that takes on anything. We specialise in eight clearly
            defined service areas — each staffed by engineers with deep, hands-on experience in
            that domain. Every engagement starts with a free scoping call, and every project is
            delivered by the same dedicated team from start to finish.
          </p>
        </div>
      </Section>

      {/* ── Services Grid ── */}
      <Section id="services" variant="muted">
        <div className="space-y-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                {/* Left — icon + title */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${service.iconBg}`}>
                      {service.icon}
                    </div>
                    <div>
                      {service.badge && (
                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-1.5 ${service.badgeStyle}`}>
                          {service.badge}
                        </span>
                      )}
                      <h3 className="text-xl font-bold leading-tight">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href={service.href}>
                    <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                      {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                {/* Right — bullet points */}
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.points.map((point) => (
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

      {/* ── Not Sure CTA ── */}
      <Section id="not-sure">
        <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-slate-800 p-10 text-center text-white max-w-3xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Not sure which service you need?</h2>
          <p className="text-slate-300 leading-relaxed mb-7 max-w-xl mx-auto">
            That is completely normal — most of the best projects start with a problem, not a brief.
            Tell us what you are trying to achieve and we will advise on the right approach, the right
            technology, and a realistic budget range. No commitment, no sales pressure.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
            >
              Book a Free Scoping Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

