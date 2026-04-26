import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI Chatbot Development',
  description:
    'Custom AI chatbots powered by GPT-4o, Claude, and Gemini. RAG pipelines, knowledge-base bots, support bots, and embeddable website chat widgets.',
  path: '/ai-chatbots',
  keywords: ['AI chatbot development', 'RAG chatbot', 'GPT chatbot', 'knowledge base bot', 'AI customer support'],
});

export default function AiChatbotsPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'AI Chatbot Development',
        title: 'Intelligent AI Chatbots &',
        titleAccent: 'Automation',
        subtitle:
          'We build AI-powered chatbots that actually work — from embeddable customer support widgets to full RAG knowledge-base systems backed by GPT-4o, Claude 3.5, and Gemini 1.5.',
      }}
      overview="Our AI Chatbot practice builds on the HostingOcean AI platform — a managed RAG pipeline with vector storage, conversation memory, and multi-model LLM support. We design, build, and deploy intelligent bots that resolve real support tickets, answer questions from your documentation, and qualify sales leads. Every chatbot ships with an analytics dashboard, a white-label embed widget, and an admin interface for tuning and monitoring."
      features={[
        {
          title: 'RAG (Retrieval-Augmented Generation)',
          description:
            'Bots that answer from your own documents — PDFs, Word docs, web pages, or CMS content — not from hallucinated knowledge.',
        },
        {
          title: 'Knowledge-Base Q&A Bots',
          description:
            'Connect your existing help centre, documentation site, or internal wiki and let the bot answer questions 24/7.',
        },
        {
          title: 'Customer Support Bots',
          description:
            'Resolve tier-1 support tickets automatically, escalate to human agents when needed, and track resolution rates.',
        },
        {
          title: 'Website Chat Widgets',
          description:
            'A fully branded, embeddable chat widget deployed with a single script tag — no iframe, fully customisable.',
        },
        {
          title: 'Sales & Lead Qualification',
          description:
            'Conversational lead capture that qualifies visitors, books meetings, and syncs to your CRM.',
        },
        {
          title: 'Multi-Model Support',
          description:
            'Choose GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Pro — or mix models per use case for cost optimisation.',
        },
        {
          title: 'Conversation Memory',
          description:
            'Session-scoped memory keeps context across a conversation — bots remember what was said earlier.',
        },
        {
          title: 'Analytics Dashboard',
          description:
            'Track conversation volume, resolution rate, escalation rate, user satisfaction, and top queries.',
        },
        {
          title: 'GDPR-Compliant',
          description:
            'EU data residency option, conversation data retention controls, and GDPR-compliant data processing agreements.',
        },
      ]}
      techStack={[
        'OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Google Gemini 1.5',
        'LangChain', 'Pinecone', 'pgvector',
        'Node.js', 'TypeScript', 'React',
        'AWS', 'Docker', 'Redis',
        'REST API', 'WebSockets', 'Streaming',
      ]}
      cta={{
        title: 'Ready to deploy your AI chatbot?',
        subtitle:
          "Tell us what problem you want to solve and what content your bot should know about. We'll design the right architecture and deliver a production-ready system.",
      }}
    />
  );
}
