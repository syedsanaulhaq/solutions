import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot,
  CheckCircle2,
  ArrowRight,
  Database,
  FileText,
  Headphones,
  MessageSquare,
  Plug,
  BarChart3,
  ShieldCheck,
  Zap,
  RefreshCw,
  Users,
  Code2,
  Brain,
  Globe,
  Lock,
  Search,
  Hammer,
  FlaskConical,
  Rocket,
  LifeBuoy,
  ChevronDown,
  PoundSterling,
  Lightbulb,
  TestTube,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'AI Chatbot Development',
  description:
    'Custom AI chatbots powered by GPT-4o, Claude, and Gemini. RAG pipelines, knowledge-base bots, support bots, and embeddable website chat widgets — built by UK engineers.',
  path: '/ai-chatbots',
  keywords: [
    'AI chatbot development',
    'RAG chatbot',
    'GPT-4o chatbot',
    'knowledge base bot',
    'AI customer support',
    'embeddable chat widget',
    'AI chatbot UK',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const ragSteps = [
  {
    step: '01',
    title: 'Ingest your content',
    description:
      'We load your documentation, PDFs, web pages, Notion, Confluence, or any other content source into a processing pipeline that chunks, cleans, and structures the data.',
  },
  {
    step: '02',
    title: 'Generate embeddings',
    description:
      'Each chunk of content is converted into a high-dimensional vector embedding using OpenAI or another embedding model and stored in a vector database (Pinecone or pgvector).',
  },
  {
    step: '03',
    title: 'Retrieve relevant context',
    description:
      'When a user asks a question, we run a semantic similarity search to retrieve the most relevant chunks from your knowledge base — far more accurate than keyword search.',
  },
  {
    step: '04',
    title: 'Generate a grounded answer',
    description:
      'The retrieved context is passed to the LLM (GPT-4o, Claude 3.5, or Gemini 1.5) alongside the user question. The model answers using only your data — no hallucinations.',
  },
];

const botTypes = [
  {
    icon: <Database className="h-6 w-6" />,
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    title: 'Knowledge-Base Bots',
    description:
      'Connect your help centre, documentation site, internal wiki, or product manuals. The bot answers questions 24/7, cites its sources, and learns from new content as you update it.',
    points: [
      'Ingests PDFs, URLs, Notion, Confluence, Google Docs',
      'Semantic search across thousands of documents',
      'Source citations in every response',
      'Automatic re-indexing when content changes',
      'Confidence scoring — low-confidence answers escalate',
      'Multi-language support',
    ],
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: 'Customer Support Bots',
    description:
      'Automate tier-1 support — the repetitive, high-volume queries that consume your support team. The bot handles them instantly, around the clock, and hands off to a human when it should.',
    points: [
      'Ticket deflection with measurable resolution rates',
      'Intelligent escalation to human agents',
      'Integration with Zendesk, Intercom, Freshdesk',
      'Conversation history and context across sessions',
      'CSAT rating capture after each conversation',
      'Manager dashboard with volume and resolution metrics',
    ],
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    title: 'Website Chat Widgets',
    description:
      'A fully branded, embeddable chat widget for your website — deployed with a single script tag, no iframe. Customise colours, avatar, welcome message, and conversation starters to match your brand.',
    points: [
      'Single <script> tag deployment',
      'Full CSS and branding customisation',
      'Mobile-responsive, accessibility-compliant',
      'Proactive trigger rules (scroll depth, time-on-page)',
      'Lead capture form inside the chat',
      'GDPR consent banner built in',
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    title: 'Internal AI Assistants',
    description:
      'Private bots for your team — trained on your internal policies, SOPs, HR docs, and technical documentation. No data leaves your infrastructure unless you want it to.',
    points: [
      'Trained on internal policies and SOPs',
      'Role-based access — different bots for different teams',
      'SSO/LDAP authentication',
      'On-premise or private cloud deployment option',
      'Audit trail of all queries and responses',
      'Feedback loop for continuous improvement',
    ],
  },
];

const integrations = [
  { label: 'Zendesk', category: 'Support' },
  { label: 'Intercom', category: 'Support' },
  { label: 'Freshdesk', category: 'Support' },
  { label: 'HubSpot', category: 'CRM' },
  { label: 'Salesforce', category: 'CRM' },
  { label: 'Pipedrive', category: 'CRM' },
  { label: 'Slack', category: 'Comms' },
  { label: 'Microsoft Teams', category: 'Comms' },
  { label: 'WhatsApp', category: 'Comms' },
  { label: 'Notion', category: 'Content' },
  { label: 'Confluence', category: 'Content' },
  { label: 'Google Drive', category: 'Content' },
  { label: 'OpenAI GPT-4o', category: 'AI' },
  { label: 'Claude 3.5', category: 'AI' },
  { label: 'Gemini 1.5', category: 'AI' },
  { label: 'Pinecone', category: 'Vector DB' },
  { label: 'pgvector', category: 'Vector DB' },
  { label: 'Supabase', category: 'Vector DB' },
];

const categoryColours: Record<string, string> = {
  Support: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  CRM: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Comms: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Content: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  AI: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Vector DB': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

const whyPoints = [
  {
    icon: <Brain className="h-5 w-5 text-[#2563EB]" />,
    title: 'RAG-first approach',
    description:
      'Every bot we build uses your data, not the model\'s training data. Accurate, source-backed answers — not confident hallucinations.',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#2563EB]" />,
    title: 'Production-grade from day one',
    description:
      'Rate limiting, error handling, fallback models, streaming responses, and conversation persistence — all built in, not added later.',
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-[#2563EB]" />,
    title: 'Continuous improvement loop',
    description:
      'Every conversation generates data. We build feedback mechanisms and dashboards so you can identify gaps and improve accuracy over time.',
  },
  {
    icon: <Lock className="h-5 w-5 text-[#2563EB]" />,
    title: 'GDPR & data security',
    description:
      'EU data residency, conversation retention controls, DPA agreements, and optional on-premise deployment for sensitive use cases.',
  },
  {
    icon: <Globe className="h-5 w-5 text-[#2563EB]" />,
    title: 'Model agnostic',
    description:
      'We are not tied to any one AI provider. We choose the right model for each task and switch or blend models as the landscape evolves.',
  },
  {
    icon: <Code2 className="h-5 w-5 text-[#2563EB]" />,
    title: 'You own the code',
    description:
      'We deliver full source code, infrastructure configs, and documentation. You are never locked into a third-party chatbot SaaS.',
  },
];

const deliveryProcess = [
  {
    step: '01',
    icon: <Search className="h-5 w-5" />,
    title: 'Discovery & Use-Case Scoping',
    description:
      'We start by understanding the problem you want to solve — the content sources, the user types, the expected query volume, and what success looks like. We document the use case, data sources, integration requirements, and acceptance criteria before writing any code.',
  },
  {
    step: '02',
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Architecture & Model Selection',
    description:
      'We design the full RAG pipeline — chunking strategy, embedding model, vector store choice, retrieval method (semantic, hybrid, or keyword), and LLM selection. You get a technical specification document and a fixed-price quote before development begins.',
  },
  {
    step: '03',
    icon: <Hammer className="h-5 w-5" />,
    title: 'Knowledge Base Build & Indexing',
    description:
      'We ingest your content — PDFs, web pages, Notion, Confluence, Google Docs, or custom APIs — process it through our pipeline, and build the vector index. You can review the indexed content and test retrieval quality before we connect the LLM.',
  },
  {
    step: '04',
    icon: <TestTube className="h-5 w-5" />,
    title: 'Bot Development & Evaluation',
    description:
      'We build the bot interface, connect all integrations, and run a structured evaluation suite — a set of real questions the bot should answer correctly. We measure precision, recall, and answer quality before you see a single conversation.',
  },
  {
    step: '05',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Deployment & Embedding',
    description:
      'We deploy to production — whether that is a hosted API, an embeddable widget, a Slack integration, or a WhatsApp bot. We manage infrastructure, SSL, rate limiting, and monitoring. You receive a deploy guide and embed instructions.',
  },
  {
    step: '06',
    icon: <LifeBuoy className="h-5 w-5" />,
    title: 'Monitoring, Feedback & Iteration',
    description:
      'Post-launch, we monitor response quality, track unanswered questions, and close gaps in the knowledge base. Every engagement includes a support window and optional retainer for continuous improvement as your content evolves.',
  },
];

const pricingTiers = [
  {
    title: 'Knowledge-Base Bot',
    range: '£5,000 – £12,000',
    description:
      'A RAG chatbot trained on your documentation, FAQs, or knowledge base — embedded on your website or internal tool. Ideal for support deflection and self-service.',
    includes: [
      'RAG pipeline with up to 500 documents',
      'GPT-4o or Claude-powered responses',
      'Embeddable website chat widget',
      'Source citations in responses',
      'Admin dashboard with conversation logs',
      'Post-launch support (30 days)',
    ],
  },
  {
    title: 'Customer Support Bot',
    range: '£10,000 – £28,000',
    description:
      'A full support automation system integrated with your ticketing platform. Handles tier-1 queries, escalates intelligently, and tracks resolution rates.',
    includes: [
      'RAG pipeline with unlimited documents',
      'Zendesk / Intercom / Freshdesk integration',
      'Intelligent human handoff logic',
      'Conversation analytics dashboard',
      'Multi-language support',
      'GDPR-compliant data handling',
    ],
    highlighted: true,
  },
  {
    title: 'Internal AI Assistant',
    range: '£8,000 – £22,000',
    description:
      'A private, role-aware assistant for your team — trained on internal SOPs, HR docs, and technical knowledge. SSO-authenticated, audit-logged, and deployable on-premise.',
    includes: [
      'Private deployment (your infrastructure)',
      'SSO / LDAP / Active Directory auth',
      'Role-based access control',
      'Full audit trail of all queries',
      'Feedback loop & retraining workflow',
      'Priority support SLA',
    ],
  },
];

const faqs = [
  {
    question: 'Will the chatbot make up answers (hallucinate)?',
    answer:
      'This is the most important question in AI chatbot development. The RAG architecture we use dramatically reduces hallucination because the model is not answering from memory — it is summarising content retrieved from your actual knowledge base. We also implement answer confidence scoring, so low-confidence responses either prompt the user to contact a human or display a clear disclaimer rather than guessing.',
  },
  {
    question: 'How much content does the bot need to get started?',
    answer:
      'A useful bot can be built from as few as 20–30 well-written documents. More content generally means better coverage. We run a content audit during discovery to identify gaps and advise on what to prioritise. The bot can also be scoped to a narrow domain (e.g., only your returns policy) and expanded over time.',
  },
  {
    question: 'How long does it take to build and deploy?',
    answer:
      'A straightforward knowledge-base bot can be deployed in 4–6 weeks. A more complex support bot with CRM integration typically takes 8–14 weeks. We give you a milestone plan with every proposal so you know exactly when each deliverable lands.',
  },
  {
    question: 'What happens when my documentation changes?',
    answer:
      'We build re-indexing pipelines as part of every project. Depending on your needs, this can be triggered manually via an admin dashboard, automatically on a schedule, or in real time via a webhook from your CMS or knowledge base. Updated content is reflected in bot responses within minutes.',
  },
  {
    question: 'Can the bot work in multiple languages?',
    answer:
      'Yes. GPT-4o and Claude handle multilingual conversations natively — users can ask in their own language and receive answers in the same language. For the retrieval layer, we can maintain separate language-specific indexes or use cross-lingual embeddings depending on your content structure.',
  },
  {
    question: 'Who owns the bot code and data after the project?',
    answer:
      'You own everything — full source code, infrastructure configurations, the vector database, and all conversation data. We deliver comprehensive handover documentation. You are never locked into our hosting or a third-party SaaS platform unless you choose to be.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function AiChatbotsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="AI Chatbot Development · New"
        title="AI Chatbots Trained on"
        titleAccent="Your Business"
        subtitle="Generic AI assistants give generic answers. We build chatbots grounded in your own data using RAG — so your bot gives accurate, source-backed responses every time."
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
            AI that knows your business, not just the internet
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Large language models like GPT-4o are extraordinarily capable — but left to their own
            devices, they answer from their training data, which is general, outdated, and does not
            know anything about your company, your products, or your policies.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We build chatbots with a Retrieval-Augmented Generation (RAG) pipeline at the core.
            Your documentation, knowledge base, or support content is indexed into a vector
            database. Every user query retrieves the most relevant chunks of your actual content,
            which are then passed to the LLM to generate a grounded, accurate answer — with
            sources. The result is a bot that behaves like a well-informed expert on your
            organisation, available 24/7.
          </p>
        </div>
      </Section>

      {/* ── RAG Explanation ── */}
      <Section id="how-rag-works" variant="muted" title="How RAG Works" subtitle="Four steps from your content to an accurate, grounded answer.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {ragSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border/60 bg-background p-6 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl font-black text-[#2563EB]/20 leading-none block mb-3">
                {step.step}
              </span>
              <h3 className="font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-3xl mx-auto rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20 p-5 flex gap-4 items-start">
          <ShieldCheck className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why RAG beats fine-tuning for most use cases:</strong>{' '}
            Fine-tuning bakes knowledge into model weights and becomes stale the moment your docs
            change. RAG retrieves live from your knowledge base — so updates take minutes, not
            retraining runs.
          </p>
        </div>
      </Section>

      {/* ── Bot Types ── */}
      <Section id="bot-types" title="What We Build" subtitle="Four distinct chatbot types, each engineered for a different purpose.">
        <div className="space-y-6">
          {botTypes.map((bot) => (
            <div
              key={bot.title}
              className="rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bot.colour}`}>
                      {bot.icon}
                    </div>
                    <h3 className="text-xl font-bold leading-tight pt-2">{bot.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bot.description}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Key capabilities
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bot.points.map((point) => (
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

      {/* ── Integrations ── */}
      <Section id="integrations" variant="muted" title="Integrations" subtitle="We connect your chatbot to the tools your team already uses — from support desks to CRMs to content platforms.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Support', 'CRM', 'Comms', 'Content', 'AI', 'Vector DB'].map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {cat}
              </span>
              <div className="flex flex-wrap gap-2">
                {integrations
                  .filter((i) => i.category === cat)
                  .map((i) => (
                    <span
                      key={i.label}
                      className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColours[cat]}`}
                    >
                      {i.label}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
          Not on the list? If it has an API or a webhook, we can integrate it. Get in touch and we will confirm.
        </p>
      </Section>

      {/* ── Why Us ── */}
      <Section id="why-us" title="Why HostingOcean Solutions" subtitle="AI chatbot agencies are everywhere. Here is what makes the difference.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {whyPoints.map((item) => (
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
        title="How an AI Chatbot Project Works"
        subtitle="From content audit to a live, monitored production bot — a structured six-step delivery."
      >
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-[#2563EB]/20 hidden md:block" />
          <div className="space-y-6">
            {deliveryProcess.map((step) => (
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
        title="AI Chatbot Pricing Guide"
        subtitle="Every project is scoped individually — but here is a realistic guide to what AI chatbot builds cost."
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
          All prices are estimates — final costs depend on content volume, integrations, and complexity.{' '}
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
        subtitle="Straight answers to the questions every AI chatbot buyer asks."
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
            <Bot className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to deploy your AI chatbot?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us what problem you want to solve and what content your bot should know about.
            We will design the right architecture, choose the right model, and deliver a
            production-ready system — complete with admin dashboard and embed widget.
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
