import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Bot, Zap, Shield, MessageSquare, BarChart3, Users, Database, Globe } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import tiers from '@/data/saas-tiers.json';

export const metadata: Metadata = buildMetadata({
  title: 'AI Chatbot Platform — Deploy a Custom AI Assistant',
  description:
    'Launch a custom-trained AI chatbot on your website or app. Powered by GPT-4o and your own knowledge base. Start a free trial today.',
  path: '/solutions/chatbot',
  keywords: ['AI chatbot', 'custom chatbot', 'AI assistant', 'chatbot platform', 'RAG chatbot', 'knowledge base bot'],
});

const features = [
  {
    icon: <Database className="h-5 w-5" />,
    title: 'Your knowledge base',
    body: 'Upload PDFs, Word docs, web pages, and structured data. Your chatbot answers from your content, not generic internet knowledge.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Grounded, not hallucinated',
    body: 'Every answer is grounded in retrieved context. When the bot does not know, it says so and escalates — never guesses.',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Seamless escalation',
    body: 'Route unresolved queries to your support team via email, live chat, or ticketing system — with full conversation context preserved.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Deploy anywhere',
    body: 'Embed on your website with a JavaScript snippet, integrate via REST API, or deploy to Slack, Teams, or WhatsApp.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Analytics and insights',
    body: 'Track query volume, answer confidence, escalation rate, and top unanswered questions to continuously improve your bot.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Access control',
    body: 'SSO integration ensures only authenticated users access the bot. Role-based retrieval respects your document-level permissions.',
  },
];

const chatbotTiers = tiers.chatbot.tiers;

type ChatbotTier = {
  id: string;
  name: string;
  price: number | null;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export default function ChatbotSolutionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-20 md:pt-28 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-5 bg-[#2563EB]/20 text-[#38BDF8] border-[#2563EB]/30 hover:bg-[#2563EB]/30 text-xs uppercase tracking-wide">
            AI Chatbot Platform
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
              <Bot className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {tiers.chatbot.tagline}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Trained on your documents and data. Grounded in facts, not guesswork. Escalates to humans when needed.
            No AI hallucinations on your support queue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-a-quote?service=AI+Chatbot+Development">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 gap-2 w-full sm:w-auto">
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
              Everything you need for a <span className="text-[#2563EB]">production-ready</span> chatbot
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We handle the RAG pipeline, knowledge base, UI, and integrations. You focus on your content and your customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] mb-4">
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
            <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free. Scale as you grow. Cancel any time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(chatbotTiers as ChatbotTier[]).map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  tier.highlighted
                    ? 'border-2 border-[#2563EB] bg-[#2563EB]/5 shadow-lg shadow-blue-500/10'
                    : 'border border-border bg-card'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
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
                      <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.price !== null ? '/get-a-quote?service=AI+Chatbot+Development' : '/contact'}>
                  <Button
                    className={`w-full ${tier.highlighted ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white' : ''}`}
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
            Ready to deploy your <span className="text-[#38BDF8]">AI chatbot</span>?
          </h2>
          <p className="text-slate-400 mb-8">
            Talk to our team about your use case. We will design the right architecture, prepare your knowledge base, and have you live within weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote?service=AI+Chatbot+Development">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1d4ed8] gap-2">
                Get a free proposal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-chatbots">
              <Button size="lg" variant="outline" className="border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white">
                Learn about our chatbot service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
