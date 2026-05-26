import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BookOpen, Zap, Users, BarChart3, FileText, Shield, Globe, Award } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import tiers from '@/data/saas-tiers.json';

export const metadata: Metadata = buildMetadata({
  title: 'LMS Builder — Launch a Branded Learning Management System',
  description:
    'Deploy a fully branded LMS for your organisation. SCORM support, completion certificates, SSO, and custom reporting. Built by expert engineers.',
  path: '/solutions/lms-builder',
  keywords: ['LMS', 'learning management system', 'SCORM', 'e-learning platform', 'branded LMS', 'online learning'],
});

const features = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'SCORM & xAPI support',
    body: 'Import content from any major authoring tool — Articulate Storyline, Adobe Captivate, iSpring — and track it reliably.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Your brand, your domain',
    body: 'Fully white-labelled learner portal with your logo, colours, and custom domain. No vendor branding anywhere.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Teams and managers',
    body: 'Organise learners into teams, assign content by role or department, and give managers visibility into their team\'s progress.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Compliance reporting',
    body: 'Generate completion reports for individual learners, teams, or entire organisations. Export to CSV for audits.',
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'Certificates and badges',
    body: 'Automatically issue branded completion certificates and optional digital badges when learners complete courses or assessments.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'SSO and security',
    body: 'SAML 2.0 and OAuth/OIDC SSO keep your learners using their existing credentials. No separate passwords to manage.',
  },
];

const lmsTiers = tiers.lms.tiers;

type LmsTier = {
  id: string;
  name: string;
  price: number | null;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export default function LMSBuilderPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-20 md:pt-28 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#2563EB]/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-5 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 text-xs uppercase tracking-wide">
            LMS Platform
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <BookOpen className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {tiers.lms.tagline}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Everything your learners and L&amp;D team need — course management, SCORM hosting, completion tracking,
            certificates, and detailed reporting — under your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-a-quote?service=LMS+Development">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 gap-2 w-full sm:w-auto">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing-calculator">
              <Button size="lg" variant="outline" className="border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white w-full sm:w-auto gap-2">
                <Zap className="h-4 w-4" /> Estimate cost
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for <span className="text-emerald-600">serious L&D teams</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not just another Moodle wrapper. A fully engineered LMS that your team will actually want to use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free. Scale as your learner base grows. Cancel any time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(lmsTiers as LmsTier[]).map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  tier.highlighted
                    ? 'border-2 border-emerald-600 bg-emerald-600/5 shadow-lg shadow-emerald-500/10'
                    : 'border border-border bg-card'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <p className="font-bold text-lg mb-1">{tier.name}</p>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-6">
                  {tier.price !== null ? (
                    <>
                      <span className="text-4xl font-extrabold">£{tier.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/{tier.billing}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Custom pricing</span>
                  )}
                </div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.price !== null ? '/get-a-quote?service=LMS+Development' : '/contact'}>
                  <Button
                    className={`w-full ${tier.highlighted ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Launch your <span className="text-emerald-400">learning platform</span> today
          </h2>
          <p className="text-slate-400 mb-8">
            We handle the build, the hosting, and the setup. Your team gets a production-ready LMS — without the complexity of managing it yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote?service=LMS+Development">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                Get a free proposal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/lms-development">
              <Button size="lg" variant="outline" className="border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white">
                Learn about our LMS service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
