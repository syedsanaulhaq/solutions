import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllDocs,
  getDocBySlug,
  getDocsByCategory,
} from '@/lib/docs';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doc = getDocBySlug(params.slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.title,
    description: doc.excerpt,
    keywords: [doc.category, 'documentation', 'guide', 'HostingOcean'],
    path: `/docs/${doc.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Simple inline Markdown renderer
// ---------------------------------------------------------------------------
function renderMarkdown(md: string) {
  const blocks = md.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-foreground dark:text-white">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-foreground dark:text-white">
          {trimmed.slice(4)}
        </h3>
      );
    }
    const lines = trimmed.split('\n');
    if (lines.every((l) => l.trim().startsWith('- '))) {
      return (
        <ul key={i} className="list-disc list-outside ml-5 space-y-2 my-4">
          {lines.filter((l) => l.trim().startsWith('- ')).map((l, j) => (
            <li key={j} className="text-muted-foreground leading-relaxed">
              {l.replace(/^- /, '').trim()}
            </li>
          ))}
        </ul>
      );
    }
    if (trimmed.startsWith('```')) {
      const codeLines = trimmed.split('\n');
      const code = codeLines.slice(1, codeLines.length - 1).join('\n');
      return (
        <pre key={i} className="rounded-xl bg-slate-900 text-slate-100 p-5 overflow-x-auto text-sm my-6 leading-relaxed">
          <code>{code}</code>
        </pre>
      );
    }
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    const inline = parts.map((part, j) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={j} className="font-semibold text-foreground dark:text-white">{part.slice(2, -2)}</strong>
      ) : part
    );
    return <p key={i} className="text-muted-foreground leading-relaxed my-4">{inline}</p>;
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug);
  if (!doc) notFound();

  const related = getDocsByCategory(doc.category).filter((d) => d.slug !== doc.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white py-16 md:py-22">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to docs
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-[#38BDF8]" />
            <span className="text-sm text-slate-400">{doc.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{doc.title}</h1>
          <p className="text-slate-300 text-lg leading-relaxed">{doc.excerpt}</p>
        </div>
      </section>

      {/* Content + sidebar */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
            {/* Main */}
            <div className="min-w-0">
              <article>{renderMarkdown(doc.content)}</article>
            </div>

            {/* Sidebar */}
            {related.length > 0 && (
              <aside className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  More in {doc.category}
                </p>
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/docs/${rel.slug}`}
                    className="group block border border-border rounded-xl p-4 hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
                  >
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{rel.excerpt}</p>
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <Link
                    href="/docs"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:underline"
                  >
                    All documentation <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-slate-300 text-sm mb-6">
            Our team is happy to walk you through anything — just send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 border border-slate-600 text-white hover:bg-slate-700 px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Browse all docs
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
