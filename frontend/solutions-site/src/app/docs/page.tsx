import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import {
  getAllDocs,
  getCategoryOrder,
  getDocsByCategory,
} from '@/lib/docs';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Documentation & Knowledge Base',
  description:
    'Browse our knowledge base for guides on working with HostingOcean Solutions — project delivery, LMS development, AI chatbots, automation, and more.',
  keywords: ['documentation', 'knowledge base', 'LMS guide', 'AI chatbot docs', 'project guide'],
  path: '/docs',
});

const CATEGORY_ICONS: Record<string, string> = {
  'Getting Started': '🚀',
  'Working With Us': '🤝',
  'LMS Development': '🎓',
  'AI Chatbots': '🤖',
  Automation: '⚡',
};

export default function DocsPage() {
  const categories = getCategoryOrder();
  const allDocs = getAllDocs();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white py-20 md:py-28">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm font-medium text-[#93C5FD]">
            <BookOpen className="h-4 w-4" />
            Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Knowledge{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#38BDF8]">
              Base
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about working with us — from getting a quote to delivering
            your LMS, AI chatbot, or automation project.
          </p>
        </div>
      </section>

      {/* Docs by category */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {allDocs.length} articles across {categories.length} categories
            </p>
            <Link
              href="/get-a-quote"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:underline"
            >
              Can&apos;t find what you need? Get in touch <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-12">
            {categories.map((category) => {
              const docs = getDocsByCategory(category);
              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl" aria-hidden>
                      {CATEGORY_ICONS[category] ?? '📄'}
                    </span>
                    <h2 className="text-xl font-bold">{category}</h2>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                      {docs.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        className="group block bg-background border border-border rounded-xl p-5 hover:shadow-md hover:border-[#2563EB]/30 transition-all"
                      >
                        <h3 className="font-semibold text-sm mb-1.5 group-hover:text-[#2563EB] transition-colors leading-snug">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                          {doc.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB]">
                          Read guide <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Still have questions? We are happy to help.
            </p>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
