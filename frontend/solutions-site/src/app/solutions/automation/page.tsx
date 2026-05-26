import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Workflow, Zap, BarChart3, Bell, GitBranch, Settings, Clock, Shield } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import tiers from '@/data/saas-tiers.json';

export const metadata: Metadata = buildMetadata({
  title: 'Automation Platform — Connect Your Tools, Automate Your Workflows',
  description:
    'Automate repetitive business processes and connect your SaaS tools. n8n-powered workflows built and maintained by expert engineers. Start a free trial.',
  path: '/solutions/automation',
  keywords: ['business automation', 'workflow automation', 'n8n', 'integrations', 'process automation', 'SaaS automation'],
});

const features = [
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: 'Visual workflow builder',
    body: 'Design multi-step workflows with branching logic, parallel paths, and conditional routing — visually, without writing code.',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    title: '200+ connectors',
    body: 'Connect to Salesforce, HubSpot, Slack, Google Sheets, Notion, Stripe, Shopify, and hundreds more out of the box.',
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: 'Error handling and alerts',
    body: 'Every workflow has retry logic, dead-letter handling, and alerting. When something fails, you know immediately — and the recovery is automatic.',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Scheduled and triggered',
    body: 'Run workflows on a cron schedule, trigger from webhooks, or fire on events in your connected apps.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Execution history',
    body: 'Full run history with input and output data for every step. Debug failures by stepping through exactly what happened.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Self-hosted option',
    body: 'For data residency requirements, deploy to your own infrastructure. We manage the setup, updates, and monitoring.',
  },
];

const automationTiers = tiers.automation.tiers;

type AutomationTier = {
  id: string;
  name: string;
  price: number | null;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export default function AutomationSolutionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-20 md:pt-28 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#2563EB]/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-5 bg-violet-500/20 text-violet-400 border-violet-500/30 hover:bg-violet-500/30 text-xs uppercase tracking-wide">
            Automation Platform
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
              <Workflow className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {tiers.automation.tagline}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Stop copying data between apps. Stop doing the same thing every Monday. Let your workflows run themselves —
            reliably, with full visibility, and without the operational overhead.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-a-quote?service=Automation+%26+Integrations">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20 gap-2 w-full sm:w-auto">
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
              <span className="text-violet-600">Automation</span> that actually works in production
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not a no-code toy. A production automation platform with proper error handling, monitoring, and self-healing workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 mb-4">
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
            <Badge className="mb-4 bg-violet-500/10 text-violet-600 border-violet-500/20">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pay for what you actually use</h2>
            <p className="text-muted-foreground">Volume pricing. No per-workflow limits. Cancel any time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(automationTiers as AutomationTier[]).map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  tier.highlighted
                    ? 'border-2 border-violet-600 bg-violet-600/5 shadow-lg shadow-violet-500/10'
                    : 'border border-border bg-card'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                      <CheckCircle2 className="h-4 w-4 text-violet-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.price !== null ? '/get-a-quote?service=Automation+%26+Integrations' : '/contact'}>
                  <Button
                    className={`w-full ${tier.highlighted ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''}`}
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
            Stop doing things <span className="text-violet-400">manually</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Tell us about the processes you want to automate. We will audit them, recommend the right architecture, and build it for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote?service=Automation+%26+Integrations">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 gap-2">
                Get a free proposal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/automation">
              <Button size="lg" variant="outline" className="border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white">
                Learn about our automation service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
