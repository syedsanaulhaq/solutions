import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { getAllProjects, CATEGORIES } from '@/lib/portfolio';
import { PortfolioListing } from '@/components/PortfolioListing';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Example projects from HostingOcean Solutions — LMS platforms, React dashboards, Node.js APIs, AI chatbots, and automation systems delivered for clients across the UK and beyond.',
  path: '/portfolio',
  keywords: [
    'LMS development examples',
    'React dashboard portfolio',
    'Node.js API examples',
    'AI chatbot portfolio',
    'automation examples UK',
    'software development portfolio UK',
  ],
});

/* ─────────────────────────── page ─────────────────────────── */

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Portfolio"
        title="Real projects."
        titleAccent="Real results."
        subtitle="A selection of projects we have delivered — LMS platforms, dashboards, APIs, AI chatbots, and automation systems. Client names are withheld by default; full case studies available on request."
        cta1={{ label: 'Discuss Your Project', href: '/contact' }}
        cta2={{ label: 'View Our Services', href: '/services' }}
      />

      {/* ── Intro ── */}
      <Section id="intro">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Projects we are proud to stand behind
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Every project shown here was scoped, built, and delivered by our team — no
            subcontracting, no offshore hand-offs. We have kept client names confidential unless
            they have given permission, but the outcomes are real and verifiable.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            If you want to speak with a previous client about their experience, ask us in your
            initial enquiry. We are happy to arrange introductions where appropriate.
          </p>
        </div>
      </Section>

      {/* ── Filterable project grid ── */}
      <Section id="projects" variant="muted">
        <PortfolioListing projects={projects} categories={CATEGORIES} />
      </Section>

      {/* ── Confidentiality note ── */}
      <Section id="confidentiality">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-background p-8 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 mx-auto mb-4">
            <Lock className="h-6 w-6 text-[#2563EB]" />
          </div>
          <h2 className="text-xl font-bold mb-3">Client confidentiality as standard</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We do not publish client names, screenshots, or commercially sensitive details without
            explicit permission. If you would like more detail on any project — including technical
            architecture, team structure, or a direct reference from the client — mention it in
            your enquiry and we will be happy to share what we can.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All projects above represent real delivered work. Outcomes are verified figures
            provided by the client at project sign-off or during ongoing retainer reviews.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <ArrowRight className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want results like these?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project. We will scope it properly, propose the right architecture,
            and give you a fixed price before you commit to anything.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free proposal · No commitment · Typically within one business day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

