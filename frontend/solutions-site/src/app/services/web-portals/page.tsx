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
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Clock,
  Puzzle,
  Brain,
  DollarSign,
  Star,
  Search,
  FileText,
  Hammer,
  FlaskConical,
  Rocket,
  LifeBuoy,
  ChevronDown,
  LayoutDashboard,
  Globe,
  KeyRound,
  CalendarCheck,
  ShoppingCart,
  UserCog,
  Smartphone,
} from 'lucide-react';
import { PriceDisplay } from '@/components/PriceDisplay';

export const metadata: Metadata = buildMetadata({
  title: 'Web Portal Development',
  description:
    'Custom web portals built for clients, staff, students, and customers. Login-based systems with role-based access, secure authentication, admin dashboards, and mobile-responsive design.',
  path: '/services/web-portals',
  keywords: [
    'web portal development',
    'client portal',
    'employee portal',
    'student portal',
    'customer portal',
    'booking portal',
    'role-based access control',
    'custom portal development',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const features = [
  {
    icon: <Briefcase className="h-5 w-5 text-[#2563EB]" />,
    title: 'Client Portals',
    description:
      'Give your clients a dedicated, secure space to view invoices, download shared files, track project status, and communicate with your team — all under your brand.',
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-[#2563EB]" />,
    title: 'School & Student Portals',
    description:
      'Academic portals with timetables, course materials, grade books, notice boards, and assignment submission — accessible to students, teachers, and parents with appropriate permissions.',
  },
  {
    icon: <Users className="h-5 w-5 text-[#2563EB]" />,
    title: 'Employee & Staff Portals',
    description:
      'Internal HR portals for payslips, shift scheduling, leave requests, HR forms, staff directories, and company announcements — reducing admin load and centralising workforce data.',
  },
  {
    icon: <CalendarCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'Booking Portals',
    description:
      'Self-service appointment scheduling with real-time availability, integrated payments, automated reminders, and cancellation management — for service businesses of any size.',
  },
  {
    icon: <ShoppingCart className="h-5 w-5 text-[#2563EB]" />,
    title: 'Customer Portals',
    description:
      'Let customers track orders, raise support tickets, manage their account, download documents, and access self-service tools — reducing support volume while improving satisfaction.',
  },
  {
    icon: <UserCog className="h-5 w-5 text-[#2563EB]" />,
    title: 'Role-Based Access Control',
    description:
      'Fine-grained permissions so every user sees exactly what they need — admins get full control, staff get their tools, and customers or students get their own clean view.',
  },
  {
    icon: <KeyRound className="h-5 w-5 text-[#2563EB]" />,
    title: 'Secure Authentication',
    description:
      'Email/password login, Google SSO, magic links, and two-factor authentication — with rate limiting, session management, and audit logging built in from day one.',
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-[#2563EB]" />,
    title: 'Admin Dashboards',
    description:
      'Powerful admin interfaces to manage users, content, permissions, and activity logs — with exportable reports, bulk actions, and configurable notifications.',
  },
  {
    icon: <Smartphone className="h-5 w-5 text-[#2563EB]" />,
    title: 'Mobile-Responsive Design',
    description:
      'Every portal we build works beautifully on mobile, tablet, and desktop — no separate app required. Fast, accessible, and optimised for real-world usage patterns.',
  },
];

const techStack = [
  { label: 'React 18', category: 'Frontend' },
  { label: 'Next.js 14', category: 'Frontend' },
  { label: 'TypeScript', category: 'Frontend' },
  { label: 'TailwindCSS', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Express / Fastify', category: 'Backend' },
  { label: 'PHP 8', category: 'Backend' },
  { label: 'REST API', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'Redis', category: 'Database' },
  { label: 'AWS S3', category: 'Storage' },
  { label: 'Cloudflare R2', category: 'Storage' },
  { label: 'Docker', category: 'Infra' },
  { label: 'Nginx', category: 'Infra' },
  { label: 'JWT', category: 'Auth' },
  { label: 'OAuth 2.0 / OIDC', category: 'Auth' },
  { label: 'SAML 2.0', category: 'Auth' },
  { label: 'Magic Links', category: 'Auth' },
];

const categoryColours: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Backend: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Database: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Storage: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Infra: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Auth: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const useCases = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Service Businesses — Client Portals',
    description:
      'Agencies, consultancies, accountants, and law firms use client portals to share documents, invoices, and project updates securely — replacing email threads and shared drives.',
    points: [
      'Branded client login with unique workspace per client',
      'Document sharing, e-signatures, and version history',
      'Project status tracking and milestone updates',
      'Secure messaging between clients and your team',
    ],
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Schools & Training Providers',
    description:
      'Educational portals that give students, teachers, and parents their own dedicated views — course materials, timetables, grades, notices, and communication tools in one place.',
    points: [
      'Separate login portals for students, staff, and parents',
      'Course materials, assignments, and grade tracking',
      'Timetable display and event notifications',
      'Secure messaging and announcement boards',
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Businesses — Employee & HR Portals',
    description:
      'Internal workforce portals that centralise HR processes — payslips, leave requests, shift schedules, onboarding documents, and staff directories — accessible from any device.',
    points: [
      'Self-service payslip downloads and tax documents',
      'Leave requests and approval workflows',
      'Shift scheduling and swap management',
      'Onboarding checklists and company handbook',
    ],
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: 'eCommerce & SaaS — Customer Portals',
    description:
      'Customer-facing portals that reduce support load and improve retention — order tracking, subscription management, invoices, support ticket history, and account self-service.',
    points: [
      'Order history, tracking, and return requests',
      'Subscription and billing management',
      'Support ticket creation and status tracking',
      'Account settings, preferences, and data exports',
    ],
  },
];

const whyPoints = [
  {
    icon: <Brain className="h-5 w-5 text-[#2563EB]" />,
    title: 'Senior engineers only',
    description: 'Every portal project is led by experienced full-stack engineers — not junior developers learning on your project.',
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    title: 'On-time delivery',
    description: 'We plan milestones conservatively and hit them. You get a deployment calendar with every proposal and weekly progress updates throughout.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'Security by default',
    description: 'OWASP Top 10 controls, secure session management, encrypted data at rest and in transit, and full audit logging — built in from day one.',
  },
  {
    icon: <LifeBuoy className="h-5 w-5 text-[#2563EB]" />,
    title: 'Post-launch support',
    description: 'Every project includes a 30-day hypercare window and the option for an ongoing monthly support retainer.',
  },
  {
    icon: <Puzzle className="h-5 w-5 text-[#2563EB]" />,
    title: 'Built around your workflow',
    description: 'We design the portal around how your users actually work — not a template. Every permission, view, and flow is tailored to your specific needs.',
  },
  {
    icon: <DollarSign className="h-5 w-5 text-[#2563EB]" />,
    title: 'Transparent, fixed pricing',
    description: 'Fixed-price proposals with no hidden costs. We define deliverables clearly before we start — and we stick to them.',
  },
  {
    icon: <Globe className="h-5 w-5 text-[#2563EB]" />,
    title: 'Registered company',
    description: 'HostingOcean Solutions is a registered company. Professional contracts, GDPR data processing agreements, and a team available during your working hours.',
  },
  {
    icon: <Star className="h-5 w-5 text-[#2563EB]" />,
    title: 'End-to-end ownership',
    description: 'One team, one point of contact. We handle architecture, build, testing, deployment, and ongoing support — no handoff gaps.',
  },
];

const process = [
  {
    step: '01',
    icon: <Search className="h-5 w-5" />,
    title: 'Discovery & Scoping',
    description:
      'We start with a structured discovery session to understand your users, their roles, the workflows they need to complete, and the integrations required. Everything is documented in a detailed scope before development begins.',
  },
  {
    step: '02',
    icon: <FileText className="h-5 w-5" />,
    title: 'Architecture & Proposal',
    description:
      'Based on discovery, we produce a technical architecture document and a fixed-price proposal covering database design, API structure, user roles, and hosting. You see the full plan before you commit.',
  },
  {
    step: '03',
    icon: <Hammer className="h-5 w-5" />,
    title: 'Agile Build',
    description:
      'Development runs in two-week sprints with working demos at the end of each. You test real features throughout the build — not just at handover. Every sprint ends with a review call and updated delivery plan.',
  },
  {
    step: '04',
    icon: <FlaskConical className="h-5 w-5" />,
    title: 'QA & Acceptance Testing',
    description:
      'Every feature goes through functional testing, security review, mobile responsiveness checks, and accessibility audit before release. You carry out user acceptance testing with real users before go-live.',
  },
  {
    step: '05',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Go-Live & Onboarding',
    description:
      'We manage the full production deployment — infrastructure setup, SSL, DNS, user import, and a staged rollout if your user base warrants it. We also provide admin training and user documentation.',
  },
  {
    step: '06',
    icon: <LifeBuoy className="h-5 w-5" />,
    title: 'Support & Iteration',
    description:
      'Every project includes a post-launch support window. We monitor for issues, fix anything that arises, and are ready to start the next phase — new features, integrations, or performance improvements.',
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
    title: 'Starter Portal',
    priceLow: 800,
    priceHigh: 2500,
    description:
      'Ideal for small businesses needing a simple, branded portal for clients or customers — document sharing, login, and basic account management.',
    includes: [
      'User authentication & role management',
      'Up to 3 portal views/sections',
      'File upload & download',
      'Admin panel',
      'Mobile-responsive design',
      '30-day post-launch support',
    ],
  },
  {
    title: 'Business Portal',
    priceLow: 3000,
    priceHigh: 8000,
    highPlus: true,
    description:
      'A fully custom portal built around your specific workflows — multi-role access, integrations with existing systems, and a polished user experience for your team or clients.',
    includes: [
      'Multi-role access control (admin, staff, client)',
      'Custom workflows & notifications',
      'Third-party API integrations',
      'Reporting & export tools',
      'SSO / Google login',
      'Full test suite & QA',
    ],
    highlighted: true,
  },
  {
    title: 'Portal Retainer & Growth',
    priceLow: 350,
    prefix: 'From ',
    suffix: ' / month',
    description:
      'Ongoing development, maintenance, and hosting management for portals that need continuous improvement without an in-house team.',
    includes: [
      'Dedicated development hours monthly',
      'Platform monitoring & updates',
      'Feature development & iteration',
      'Security & performance reviews',
      'Priority support SLA',
    ],
  },
];

const faqs = [
  {
    question: 'How long does a web portal take to build?',
    answer:
      'A starter portal typically takes 4–8 weeks. A more complex business portal with multiple roles, integrations, and custom workflows takes 10–20 weeks. We provide a detailed milestone plan with every proposal so you know exactly when each deliverable lands.',
  },
  {
    question: 'What authentication methods do you support?',
    answer:
      'We support email/password, Google OAuth, Microsoft SSO, magic link (passwordless), and SAML 2.0 for enterprise single sign-on. Two-factor authentication (TOTP or SMS) is available as an add-on. We use secure session management with JWTs and handle token rotation, expiry, and revocation properly.',
  },
  {
    question: 'Can the portal integrate with our existing tools?',
    answer:
      'Yes — this is standard on almost every portal project. Common integrations include Stripe for payments, HubSpot or Salesforce for CRM data, Xero or QuickBooks for invoicing, Slack or email for notifications, and custom internal APIs. If your system has a REST API or webhooks, we can integrate with it.',
  },
  {
    question: 'Can we add features after launch?',
    answer:
      'Absolutely. We build every portal with extensibility in mind — clean API boundaries, modular components, and documented data models. Most clients start with a focused MVP and add features in phases. Our retainer option is designed exactly for this.',
  },
  {
    question: 'How do you handle data security?',
    answer:
      'Security is built into the architecture from day one — not bolted on. We implement OWASP Top 10 controls, encrypt data at rest and in transit, enforce proper input validation, use parameterised queries to prevent SQL injection, and set strict CORS and CSP headers. Every project includes a security review before go-live.',
  },
  {
    question: 'Do you offer hosting and ongoing maintenance?',
    answer:
      'Yes. We can manage hosting on AWS, DigitalOcean, or a private VPS — with SSL, automated backups, uptime monitoring, and security patches. Hosting management is included in our retainer or available as a standalone add-on.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function WebPortalsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Web Portal Development · Senior Engineers"
        title="Web Portals Built For"
        titleAccent="Your Users"
        subtitle="Login-based systems designed around your clients, staff, students, or customers — with role-based access, secure authentication, and admin dashboards. Built custom to your workflows, not off a template."
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
            A portal that works the way your business works
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Generic SaaS portals force your business into their structure. You end up paying for
            features you never use, working around limitations that should not exist, and explaining
            to clients why their experience looks the same as everyone else&apos;s.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We build custom web portals from the ground up — designed around your exact workflows,
            your brand, and the people who will use them every day. Whether you need a client portal
            for a consultancy, a student portal for a school, an employee intranet for a growing
            team, or a customer self-service hub for an eCommerce business — we deliver a system
            that fits, works, and scales.
          </p>
        </div>
      </Section>

      {/* ── Features ── */}
      <Section
        id="features"
        variant="muted"
        title="What We Deliver"
        subtitle="Every capability below is built and owned by our team — no third-party plug-and-pray integrations."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-5 rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1.5 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section
        id="tech-stack"
        title="Technologies We Use"
        subtitle="Modern, battle-tested tools — chosen for your project's specific needs, not our preference."
      >
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Frontend', 'Backend', 'Database', 'Storage', 'Infra', 'Auth'].map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
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

      {/* ── Use Cases ── */}
      <Section
        id="use-cases"
        variant="muted"
        title="Who We Build For"
        subtitle="We have delivered portal systems across four main verticals — each with different requirements that we know inside out."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="rounded-2xl border border-border/60 bg-background p-7 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                  {uc.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{uc.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{uc.description}</p>
              <ul className="space-y-2">
                {uc.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Why HostingOcean Solutions ── */}
      <Section
        id="why-us"
        title="Why HostingOcean Solutions"
        subtitle="There are many agencies that will take your portal project. Here is why the ones who care about quality choose us."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {whyPoints.map((item) => (
            <div
              key={item.title}
              className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm"
            >
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Delivery Process ── */}
      <Section
        id="process"
        variant="muted"
        title="How a Portal Project Works"
        subtitle="A clear, structured delivery process — so you always know what is happening and when."
      >
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-[#2563EB]/20 hidden md:block" />
          <div className="space-y-6">
            {process.map((step) => (
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
        title="Web Portal Pricing Guide"
        subtitle="Every project is quoted individually — but here is a realistic guide to what portal development costs so you can plan your budget."
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
                <DollarSign
                  className={`h-6 w-6 mb-3 ${
                    tier.highlighted ? 'text-[#2563EB]' : 'text-muted-foreground'
                  }`}
                />
                <h3 className="font-bold text-lg mb-1">{tier.title}</h3>
                <p
                  className={`text-2xl font-extrabold ${
                    tier.highlighted ? 'text-[#2563EB]' : 'text-foreground'
                  }`}
                >
                  <PriceDisplay
                    low={tier.priceLow}
                    high={tier.priceHigh}
                    highPlus={tier.highPlus}
                    prefix={tier.prefix}
                    suffix={tier.suffix}
                  />
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {tier.description}
              </p>
              <ul className="space-y-2.5 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 mt-0.5 ${
                        tier.highlighted ? 'text-[#2563EB]' : 'text-emerald-600'
                      }`}
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/contact">
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? 'bg-[#2563EB] hover:bg-[#1d4ed8]'
                        : 'bg-transparent border border-border hover:bg-muted text-foreground'
                    }`}
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
          All prices are estimates — final costs depend on scope, integrations, and complexity.{' '}
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
        subtitle="Honest answers to the questions every portal buyer asks us."
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
            <LayoutDashboard className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build your portal?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project — the users, the workflows, the integrations, and the scale.
            We will come back with a detailed proposal including architecture, timeline, and a
            fixed-price quote within one business day.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free scoping call · No commitment · Senior engineers
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
