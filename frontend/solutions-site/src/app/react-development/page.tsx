import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Blocks,
  Zap,
  Globe,
  Lock,
  Layers,
  Smartphone,
  TestTube2,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'React & Next.js Development',
  description:
    'Custom React and Next.js development — dashboards, admin portals, customer-facing applications, and UI component libraries. Built by UK engineers with TypeScript throughout.',
  path: '/react-development',
  keywords: [
    'React development',
    'Next.js development',
    'React dashboard',
    'custom UI',
    'TypeScript React',
    'admin panel development',
    'customer portal development UK',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const buildTypes = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: 'Dashboards',
    subtitle: 'Turn data into decisions with purpose-built dashboards',
    description:
      'We build dashboards that surface the right data at the right time — not cluttered screens full of charts nobody reads. Every dashboard we ship is fast, responsive, and designed around the specific decisions your users need to make.',
    points: [
      'Real-time and historical data visualisation',
      'Multi-source data aggregation (APIs, databases, spreadsheets)',
      'Interactive charts, tables, maps, and KPI cards',
      'Drill-down views and filter/search controls',
      'Role-based data visibility — managers see more than staff',
      'PDF export and scheduled email reports',
    ],
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    title: 'Admin Panels',
    subtitle: 'Powerful internal tools for your operations team',
    description:
      'Admin panels are where your team actually runs the business. We build them to be fast, intuitive, and comprehensive — with audit logs, bulk actions, permission systems, and the specific workflows your operations team needs.',
    points: [
      'User management — create, edit, suspend, role assignment',
      'Content management and CMS-style editors',
      'Bulk operations with confirmation and undo',
      'Full audit log of every action',
      'Multi-role access control (RBAC)',
      'Search, filter, and export across every data table',
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    title: 'Customer & Partner Portals',
    subtitle: 'Self-service interfaces your customers actually use',
    description:
      'A well-designed customer portal reduces support volume, increases retention, and makes your product feel premium. We build portals that handle everything from onboarding and account management to billing, usage analytics, and ticket submission.',
    points: [
      'Onboarding flows with guided setup wizards',
      'Account management — profile, billing, team members',
      'Usage dashboards and subscription management',
      'Document upload, download, and e-signature flows',
      'Support ticket submission and status tracking',
      'White-label options for partner-facing portals',
    ],
  },
  {
    icon: <Blocks className="h-6 w-6" />,
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    title: 'Custom UI Component Libraries',
    subtitle: 'Design systems that scale across your entire product',
    description:
      'Ad-hoc styling decisions accumulate into inconsistency. We build component libraries that encode your brand — typography, colour, spacing, interaction patterns — into reusable, fully typed, accessible React components that every team member can use confidently.',
    points: [
      'Fully typed TypeScript component APIs',
      'Storybook documentation with interactive examples',
      'Design token system for consistent colour, spacing, and type',
      'Dark mode and theme switching support',
      'WCAG 2.1 AA accessibility compliance',
      'Published as a private npm package for your team',
    ],
  },
];

const techStack = [
  { label: 'React 18', category: 'Core' },
  { label: 'Next.js 14', category: 'Core' },
  { label: 'TypeScript', category: 'Core' },
  { label: 'TailwindCSS', category: 'Styling' },
  { label: 'ShadCN UI', category: 'Styling' },
  { label: 'Framer Motion', category: 'Styling' },
  { label: 'Zustand', category: 'State' },
  { label: 'React Query', category: 'State' },
  { label: 'React Hook Form', category: 'State' },
  { label: 'Recharts', category: 'Data Viz' },
  { label: 'Chart.js', category: 'Data Viz' },
  { label: 'AG Grid', category: 'Data Viz' },
  { label: 'Vitest', category: 'Testing' },
  { label: 'Testing Library', category: 'Testing' },
  { label: 'Playwright', category: 'Testing' },
  { label: 'Storybook', category: 'Tooling' },
  { label: 'Vite', category: 'Tooling' },
  { label: 'Vercel / AWS', category: 'Tooling' },
];

const categoryColours: Record<string, string> = {
  Core: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Styling: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  State: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Data Viz': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Testing: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Tooling: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

const qualities = [
  {
    icon: <Layers className="h-5 w-5 text-[#2563EB]" />,
    title: 'TypeScript throughout',
    description: 'No any shortcuts. Full end-to-end type safety means fewer runtime bugs and a codebase that is safe to extend.',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#2563EB]" />,
    title: 'Core Web Vitals optimised',
    description: 'Code splitting, lazy loading, image optimisation, and server components — your app loads fast and stays fast.',
  },
  {
    icon: <Smartphone className="h-5 w-5 text-[#2563EB]" />,
    title: 'Fully responsive',
    description: 'Every interface works on mobile, tablet, and desktop — not an afterthought, designed for all viewports from the start.',
  },
  {
    icon: <Lock className="h-5 w-5 text-[#2563EB]" />,
    title: 'Accessibility (WCAG 2.1 AA)',
    description: 'Keyboard navigation, screen reader support, focus management, and colour contrast — inclusive by default.',
  },
  {
    icon: <TestTube2 className="h-5 w-5 text-[#2563EB]" />,
    title: 'Test coverage included',
    description: 'Unit, integration, and end-to-end tests shipped with every project. You get a codebase you can refactor with confidence.',
  },
  {
    icon: <Globe className="h-5 w-5 text-[#2563EB]" />,
    title: 'SEO & Open Graph ready',
    description: 'Structured data, canonical URLs, Open Graph tags, and sitemap generation — built in for every public-facing page.',
  },
  {
    icon: <Sparkles className="h-5 w-5 text-[#2563EB]" />,
    title: 'Clean, documented code',
    description: 'We write for the next developer. Clear naming, consistent patterns, and inline documentation for complex logic.',
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-[#2563EB]" />,
    title: 'Design system included',
    description: 'Colour tokens, spacing scale, typography system, and a component library so every new feature looks consistent.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function ReactDevelopmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="React & Next.js Development"
        title="React Applications Built"
        titleAccent="For Production"
        subtitle="High-performance React and Next.js applications — from data-dense dashboards and admin systems to customer portals and reusable component libraries. TypeScript throughout, tested and documented."
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
            React development that ships and keeps working
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            React is now the default choice for modern web UIs — but the difference between a
            React app that delights users and one that becomes a maintenance headache comes down
            to the decisions made before the first line of code. Architecture, state management,
            data-fetching strategy, testing approach, and component design — these choices
            compound over time.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We have been building production React applications since React was new. Our practice
            covers single-page applications, full-stack Next.js platforms, data-dense dashboards,
            admin panels, customer portals, and component libraries. Everything we ship is
            TypeScript-first, accessibility-compliant, tested, and built to be extended by
            whoever comes after us.
          </p>
        </div>
      </Section>

      {/* ── Build Types ── */}
      <Section id="what-we-build" variant="muted" title="What We Build" subtitle="Four categories of React application we have shipped repeatedly — each with a distinct set of requirements.">
        <div className="space-y-6">
          {buildTypes.map((bt) => (
            <div
              key={bt.title}
              className="rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bt.colour}`}>
                      {bt.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{bt.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{bt.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bt.description}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bt.points.map((point) => (
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

      {/* ── Quality Standards ── */}
      <Section id="quality" title="Built to a Higher Standard" subtitle="These are not optional extras — they are how we build every React application we ship.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {qualities.map((q) => (
            <div key={q.title} className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 mt-0.5">{q.icon}</div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground text-sm">{q.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{q.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section id="tech-stack" variant="muted" title="Technologies We Use" subtitle="Proven, modern tools — chosen per-project for performance, developer experience, and long-term maintainability.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Core', 'Styling', 'State', 'Data Viz', 'Testing', 'Tooling'].map((cat) => (
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

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <Code2 className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build your React application
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Share your requirements — what you are building, who it is for, and what integrations
            you need. We will come back with a technical architecture recommendation, a realistic
            timeline, and a fixed-price quote within one business day.
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
