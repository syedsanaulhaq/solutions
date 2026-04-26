import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code2,
  Server,
  Bot,
  Workflow,
  CheckCircle2,
  Star,
  Users,
  Clock,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HostingOcean Solutions — Custom LMS, AI & Web Development',
  description:
    'We build scalable, modern, and intelligent digital systems — LMS platforms, AI chatbots, React apps, and Node.js APIs — for businesses worldwide.',
  alternates: { canonical: 'https://solutions.hostingocean.co.uk' },
};

const services = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'LMS Development',
    description:
      'Custom learning management systems built on React and Node.js, with full Moodle customisation and white-label options for any scale.',
    features: [
      'React + Node.js full-stack',
      'Moodle customisation',
      'Multi-tenant architecture',
      'White-label LMS',
      'SCORM / xAPI / LTI 1.3',
    ],
    href: '/lms-development',
    badge: 'Popular',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'React Development',
    description:
      'Beautiful, performant React applications — from customer-facing portals to complex internal dashboards and admin panels.',
    features: [
      'Next.js & React SPA',
      'Dashboards & portals',
      'Admin panels & CMS',
      'Component libraries',
      'TypeScript throughout',
    ],
    href: '/react-development',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: 'Node.js API Development',
    description:
      'Scalable REST APIs, authentication systems, and microservices built with Node.js, designed for production workloads.',
    features: [
      'RESTful & GraphQL APIs',
      'JWT / OAuth2 / SSO auth',
      'Third-party integrations',
      'Microservices architecture',
      'OpenAPI documentation',
    ],
    href: '/node-api-development',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'AI Chatbot Development',
    description:
      'Intelligent chatbots powered by GPT-4, Claude, and Gemini — from embedded website widgets to full RAG knowledge-base systems.',
    features: [
      'RAG & knowledge-base bots',
      'Customer support automation',
      'Website chat widgets',
      'Multi-model support',
      'Analytics dashboard',
    ],
    href: '/ai-chatbots',
    badge: 'New',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Automation & Integrations',
    description:
      'End-to-end business automation, API integrations, and workflow systems that save time and reduce manual overhead.',
    features: [
      'Business process automation',
      'API & webhook integrations',
      'CRM / ERP connectors',
      'Workflow orchestration',
      'Scheduled & event-driven jobs',
    ],
    href: '/automation',
  },
];

const techItems = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'Redis', 'OpenAI', 'AWS',
  'Docker', 'TailwindCSS', 'Moodle', 'REST / GraphQL',
];

const whyItems = [
  {
    icon: <Star className="h-6 w-6 text-[#2563EB]" />,
    title: 'Senior-only engineers',
    body: 'Every project is handled by experienced senior developers — no juniors, no outsourcing.',
  },
  {
    icon: <Clock className="h-6 w-6 text-[#2563EB]" />,
    title: 'On-time delivery',
    body: 'Transparent project management with clear milestones and weekly progress updates.',
  },
  {
    icon: <Shield className="h-6 w-6 text-[#2563EB]" />,
    title: 'Security-first',
    body: 'Every system is built with OWASP best practices, GDPR compliance, and production hardening baked in.',
  },
  {
    icon: <Globe className="h-6 w-6 text-[#2563EB]" />,
    title: 'UK-registered company',
    body: 'Fully registered in the United Kingdom — contracts, invoicing, and data residency all UK-compliant.',
  },
  {
    icon: <Users className="h-6 w-6 text-[#2563EB]" />,
    title: 'Dedicated team',
    body: 'Your project gets a dedicated team of specialists — not a rotating pool of generalists.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-[#2563EB]" />,
    title: 'Post-launch support',
    body: 'We don\'t disappear after go-live. Every engagement includes a support & maintenance window.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <Hero
        badge="UK Software Development · solutions.hostingocean.co.uk"
        title="Custom LMS, AI, and Web Development"
        titleAccent="Solutions"
        subtitle="We build scalable, modern, and intelligent digital systems for businesses worldwide — from bespoke LMS platforms to AI-powered chatbots."
        cta1={{ label: 'Get a Quote', href: '/contact' }}
        cta2={{ label: 'View Services', href: '/services' }}
      />

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <Section
        id="about"
        title="About HostingOcean Solutions"
        subtitle="We are a UK-registered software development division of HostingOcean, building intelligent and scalable digital systems for clients across education, enterprise, and technology sectors."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { value: '50+', label: 'Projects delivered' },
            { value: '98%', label: 'Client satisfaction' },
            { value: '5+', label: 'Years experience' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center p-8 rounded-xl border border-border/60 bg-muted/30 text-center"
            >
              <span className="text-4xl font-extrabold text-[#2563EB] mb-2">{value}</span>
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <Section
        id="services"
        variant="muted"
        title="Our Core Services"
        subtitle="Five specialised service lines covering the full spectrum of modern software development — all under one roof."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
          {/* All Services CTA card */}
          <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border text-center gap-4">
            <Zap className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Not sure which service fits your project?
            </p>
            <Link href="/services">
              <Button variant="outline" size="sm">
                Browse all services <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Why Choose Us ───────────────────────────────────────────────────── */}
      <Section
        id="why-us"
        title="Why Choose HostingOcean Solutions"
        subtitle="We combine deep technical expertise with transparent delivery — so you always know what's happening with your project."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyItems.map((item) => (
            <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-border/50">
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Technologies ────────────────────────────────────────────────────── */}
      <Section
        id="technologies"
        variant="muted"
        title="Technologies We Use"
        subtitle="We stay current with the tools that matter — battle-tested, production-ready, and actively maintained."
      >
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techItems.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm px-4 py-2 rounded-lg font-medium">
              {tech}
            </Badge>
          ))}
        </div>
      </Section>

      {/* ── Contact CTA ─────────────────────────────────────────────────────── */}
      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build something great?
          </h2>
          <p className="text-slate-300 mb-8 text-lg leading-relaxed">
            Tell us about your project. We&apos;ll come back with a no-obligation proposal within
            one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20"
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
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
