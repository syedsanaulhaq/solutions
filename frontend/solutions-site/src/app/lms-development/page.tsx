import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  ShieldCheck,
  Clock,
  Layers,
  BarChart3,
  Lock,
  Puzzle,
  Award,
  Headphones,
  Zap,
  Code2,
  Search,
  FileText,
  Hammer,
  FlaskConical,
  Rocket,
  LifeBuoy,
  ChevronDown,
  PoundSterling,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'LMS Development',
  description:
    'Custom learning management systems built with React, Node.js, and Moodle. Multi-tenant, white-label, SCORM-compliant LMS platforms for education and enterprise.',
  path: '/lms-development',
  keywords: [
    'LMS development',
    'Moodle customisation',
    'custom LMS',
    'multi-tenant LMS',
    'white-label LMS',
    'SCORM compliant LMS',
    'e-learning platform development UK',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const features = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Custom React & Next.js Frontend',
    description:
      'A fully bespoke UI tailored to your brand — fast, accessible, and optimised for learners on desktop and mobile. No template constraints.',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Scalable Node.js Backend',
    description:
      'A RESTful or GraphQL API built on Node.js handling enrolments, content delivery, user management, and progress tracking at scale.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Moodle Customisation & Plugins',
    description:
      'Full Moodle theme development, bespoke plugin creation, API integrations, and performance tuning for existing Moodle installations.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Multi-Tenant Architecture',
    description:
      'One platform, many clients. Each tenant gets isolated data, a custom domain, their own branding, and a separate user base.',
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'White-Label & Rebranding',
    description:
      'Deploy to your clients under your own brand. Custom logo, colours, domain, email notifications, and feature set — fully white-labelled.',
  },
  {
    icon: <Puzzle className="h-5 w-5" />,
    title: 'SCORM, xAPI & LTI 1.3',
    description:
      'Full compliance with industry e-learning standards — import any SCORM package, capture xAPI statements, and connect via LTI 1.3.',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'SSO, LDAP & Active Directory',
    description:
      'Seamless single sign-on via SAML 2.0, OAuth 2.0, LDAP, or Active Directory — learners log in once and never see another password prompt.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Analytics & Reporting Dashboards',
    description:
      'Real-time dashboards showing completion rates, learner progress, assessment scores, time-on-course, and engagement metrics.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'GDPR & Data Compliance',
    description:
      'Built-in data export, right-to-erasure workflows, consent management, and UK/EU data residency options — compliance by design.',
  },
];

const techStack = [
  { label: 'React', category: 'Frontend' },
  { label: 'Next.js', category: 'Frontend' },
  { label: 'TypeScript', category: 'Frontend' },
  { label: 'TailwindCSS', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Express', category: 'Backend' },
  { label: 'PHP', category: 'Backend' },
  { label: 'Moodle', category: 'LMS' },
  { label: 'SCORM', category: 'LMS' },
  { label: 'xAPI', category: 'LMS' },
  { label: 'LTI 1.3', category: 'LMS' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'Redis', category: 'Database' },
  { label: 'AWS S3', category: 'Infra' },
  { label: 'Docker', category: 'Infra' },
  { label: 'SAML 2.0', category: 'Auth' },
  { label: 'OAuth 2.0', category: 'Auth' },
];

const categoryColours: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Backend: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  LMS: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Database: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Infra: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Auth: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const useCases = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Corporate Training Portals',
    description:
      'Onboarding, compliance, and skills development platforms for HR and L&D teams. Branded per department or business unit, with line-manager reporting.',
    points: ['Employee onboarding modules', 'Mandatory compliance tracking', 'Manager dashboards', 'Certificate generation'],
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Schools & Universities',
    description:
      'VLE and LMS replacements or upgrades for educational institutions needing modern UX, accessibility compliance, and deep integration with existing systems.',
    points: ['Virtual learning environments', 'Student progress tracking', 'Assignment & grade management', 'Parent/guardian portals'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Training Providers & Academies',
    description:
      'Multi-tenant platforms for training companies that need to run hundreds of courses across thousands of learners under a single codebase.',
    points: ['Multi-organisation tenancy', 'Enrolment & payment flows', 'Instructor portals', 'Automated certification'],
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Professional Certification Bodies',
    description:
      'Assessment-heavy platforms for organisations that issue professional qualifications — built around exam security, proctoring, and audit trails.',
    points: ['Secure online assessments', 'Proctoring integrations', 'Verifiable digital certificates', 'CPD hour tracking'],
  },
];

const whyUs = [
  {
    icon: <Award className="h-5 w-5 text-[#2563EB]" />,
    title: 'Senior engineers only',
    description: 'No juniors on your LMS build. Every developer on your project has shipped production LMS platforms before.',
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    title: 'On-time delivery',
    description: 'We use fixed-scope sprints with clear milestones. You see working software every two weeks — not at the end.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'Security & compliance first',
    description: 'GDPR, WCAG 2.1 AA, and Cyber Essentials-aligned practices baked in from day one — not bolted on at the end.',
  },
  {
    icon: <Headphones className="h-5 w-5 text-[#2563EB]" />,
    title: 'Post-launch support',
    description: 'We do not disappear after go-live. Ongoing support, feature development, and hosting management available.',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#2563EB]" />,
    title: 'Purpose-built, not adapted',
    description: 'We build your LMS around your workflows — not the other way around. Off-the-shelf limitations do not apply.',
  },
  {
    icon: <Globe className="h-5 w-5 text-[#2563EB]" />,
    title: 'UK-registered & accountable',
    description: 'HostingOcean Solutions is UK-registered with a real team, real contracts, and real accountability.',
  },
];

const process = [
  {
    step: '01',
    icon: <Search className="h-5 w-5" />,
    title: 'Discovery & Scoping',
    description:
      'We run a structured discovery workshop — typically 2–4 hours — to understand your learners, your content, your integrations, and your growth plans. We document everything in a detailed scope specification before a single line of code is written.',
  },
  {
    step: '02',
    icon: <FileText className="h-5 w-5" />,
    title: 'Architecture & Proposal',
    description:
      'Based on discovery, we produce a technical architecture document and a fixed-price proposal. You see the full plan — database schema, API design, infrastructure choices, third-party services — before you commit.',
  },
  {
    step: '03',
    icon: <Hammer className="h-5 w-5" />,
    title: 'Agile Build',
    description:
      'Development runs in two-week sprints with a working demo at the end of each. You test real features throughout the build — not just at the end. Every sprint ends with a review call and an updated delivery plan.',
  },
  {
    step: '04',
    icon: <FlaskConical className="h-5 w-5" />,
    title: 'QA & Acceptance Testing',
    description:
      'Before any release, every feature goes through our QA checklist — functional testing, accessibility audit (WCAG 2.1 AA), performance profiling, and security review. You also carry out your own user acceptance testing with real learners.',
  },
  {
    step: '05',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Go-Live & Migration',
    description:
      'We manage the full production deployment — infrastructure setup, SSL, DNS, data migration from any existing platform, and a staged rollout if your learner volume warrants it. Go-live day is planned, not improvised.',
  },
  {
    step: '06',
    icon: <LifeBuoy className="h-5 w-5" />,
    title: 'Support & Iteration',
    description:
      'Every project includes a support window post-launch. We monitor for issues, fix anything that arises, and are ready to start the next phase of development — whether that is new features, additional integrations, or performance scaling.',
  },
];

const pricingTiers = [
  {
    title: 'Moodle Setup & Customisation',
    range: '£2,500 – £6,000',
    description:
      'Ideal for organisations that want the power of Moodle with a polished, on-brand experience. Includes installation, custom theme, essential plugins, and user onboarding.',
    includes: [
      'Managed Moodle installation',
      'Custom brand theme (logo, colours, fonts)',
      'Up to 5 plugin configurations',
      'Admin training session',
      'Post-launch support (30 days)',
    ],
  },
  {
    title: 'Custom LMS Build',
    range: '£15,000 – £60,000+',
    description:
      'A fully bespoke LMS built on React and Node.js, designed around your exact workflows. Suitable for training providers, commercial platforms, and enterprise deployments.',
    includes: [
      'Full-stack React + Node.js build',
      'Custom course & content management',
      'Multi-tenant or single-tenant options',
      'SCORM / xAPI / LTI integration',
      'Analytics dashboard',
      'SSO / third-party integrations',
    ],
    highlighted: true,
  },
  {
    title: 'LMS Retainer & Managed Growth',
    range: 'From £1,500 / month',
    description:
      'Ongoing development, maintenance, and hosting management for organisations that want to continuously improve their platform without managing an in-house team.',
    includes: [
      'Dedicated development hours monthly',
      'Platform monitoring & updates',
      'Feature development & iteration',
      'Performance & security reviews',
      'Priority support SLA',
    ],
  },
];

const faqs = [
  {
    question: 'Should I use Moodle or build a custom LMS?',
    answer:
      'Moodle is the right choice for most organisations — it covers the majority of e-learning use cases, has a huge plugin ecosystem, and is far more cost-effective than a custom build. We recommend a custom LMS when your learning model is genuinely novel, when you are building a commercial product where the platform itself is your proposition, or when the total cost of Moodle customisation over five years exceeds what a bespoke build would cost. We will give you an honest recommendation during discovery.',
  },
  {
    question: 'How long does an LMS project take?',
    answer:
      'A Moodle setup and customisation project typically takes 4–8 weeks. A custom LMS build ranges from 10 to 24 weeks depending on complexity. We provide a detailed milestone plan with every fixed-price proposal so you know exactly when each deliverable lands.',
  },
  {
    question: 'Can you migrate our existing LMS to a new platform?',
    answer:
      'Yes. We have migrated content and learner data from Moodle, TalentLMS, Canvas, LearnDash, and bespoke legacy platforms. Migration involves a data audit, a mapping exercise, a test migration on a staging environment, and a final cut-over window. We handle the full process and ensure zero data loss.',
  },
  {
    question: 'Do you offer hosting and infrastructure management?',
    answer:
      'Yes. We can manage hosting on AWS, DigitalOcean, or a private VPS — with SSL, backups, monitoring, and uptime SLAs. Hosting management is included in our retainer option or available as a standalone add-on.',
  },
  {
    question: 'What SCORM and standards support do you provide?',
    answer:
      'We support SCORM 1.2 and SCORM 2004 (all editions), xAPI (Tin Can), and LTI 1.3. If you have existing course content, we will test it against your specific packages before go-live. We can also help you convert legacy SCORM content to modern xAPI-compliant formats.',
  },
  {
    question: 'Can the LMS integrate with our existing HR or CRM system?',
    answer:
      'Yes — this is something we handle on almost every enterprise LMS project. Common integrations include Salesforce, HubSpot, BambooHR, Workday, Active Directory, and custom internal APIs. If your system has a REST API or supports webhooks, we can integrate with it.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function LmsDevelopmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="LMS Development"
        title="Learning Management Systems"
        titleAccent="Built For You"
        subtitle="Bespoke LMS platforms for schools, universities, corporate training teams, and e-learning businesses — from Moodle customisation to fully custom React + Node.js builds."
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
            An LMS that fits your organisation — not the other way around
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Off-the-shelf learning platforms are built for the average use case. They ship with
            features you will never use, lack the ones you actually need, and charge per-seat
            pricing that scales painfully as your learner base grows.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We build bespoke LMS platforms — from the ground up or on top of Moodle — designed
            around your exact workflows, your brand, and your learners. Our projects span
            SCORM-compliant corporate training portals, government-funded education platforms,
            multi-tenant SaaS LMS products, and AI-enhanced learning tools. Every system is
            built for scalability, standards compliance, and the learner experience.
          </p>
        </div>
      </Section>

      {/* ── Features ── */}
      <Section id="features" variant="muted" title="What We Deliver" subtitle="Every capability below is built and owned by our team — no third-party plug-and-pray integrations.">
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
      <Section id="tech-stack" title="Technologies We Use" subtitle="Modern, battle-tested tools — chosen for your project's specific needs, not our preference.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Frontend', 'Backend', 'LMS', 'Database', 'Infra', 'Auth'].map((cat) => (
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
      <Section id="use-cases" variant="muted" title="Who We Build For" subtitle="We have delivered LMS platforms across four main verticals — each with different requirements that we know inside out.">
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
      <Section id="why-us" title="Why HostingOcean Solutions" subtitle="There are many agencies that will take your LMS project. Here is why the ones who care about quality choose us.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {whyUs.map((item) => (
            <div key={item.title} className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm">
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
        title="How an LMS Project Works"
        subtitle="A clear, structured delivery process — so you always know what is happening and when."
      >
        <div className="relative max-w-4xl mx-auto">
          {/* vertical line */}
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
        title="LMS Pricing Guide"
        subtitle="Every project is quoted individually — but here is a realistic guide to what LMS work costs so you can plan your budget."
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
                <PoundSterling className={`h-6 w-6 mb-3 ${tier.highlighted ? 'text-[#2563EB]' : 'text-muted-foreground'}`} />
                <h3 className="font-bold text-lg mb-1">{tier.title}</h3>
                <p className={`text-2xl font-extrabold ${tier.highlighted ? 'text-[#2563EB]' : 'text-foreground'}`}>
                  {tier.range}
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
        subtitle="Honest answers to the questions every LMS buyer asks us."
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
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build your LMS?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project — the audience, the content, the integrations, and the
            scale. We will come back with a detailed proposal including architecture, timeline,
            and a fixed-price quote within one business day.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free scoping call · No commitment · UK-based team
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

