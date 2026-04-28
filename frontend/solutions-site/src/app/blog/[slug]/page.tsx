import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  buildPostMetadata,
  formatDate,
  categoryInternalLinks,
} from '@/lib/blog';
import { siteConfig } from '@/lib/seo';
import { articleSchema, breadcrumbSchema } from '@/lib/schemas';
import { Section } from '@/components/Section';
import { SocialShare } from '@/components/SocialShare';
import { PricingCTA } from '@/components/PricingCTA';
import { BlogReadTracker } from '@/components/BlogReadTracker';
import { ArrowRight, ArrowLeft, Clock, Calendar, Tag, User, Link2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// Inline Markdown renderer (handles ## ### - **bold**)
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

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return buildPostMetadata(post);
}

const categoryColours: Record<string, string> = {
  'LMS Development': 'bg-violet-900/40 text-violet-300 border-violet-700',
  'AI Chatbots': 'bg-sky-900/40 text-sky-300 border-sky-700',
  'Project Management': 'bg-emerald-900/40 text-emerald-300 border-emerald-700',
  Automation: 'bg-orange-900/40 text-orange-300 border-orange-700',
  'React Development': 'bg-blue-900/40 text-blue-300 border-blue-700',
  'Node.js': 'bg-green-900/40 text-green-300 border-green-700',
};

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const internalLinks = categoryInternalLinks[post.category] ?? [];

  const articleJsonLd = articleSchema({
    title: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.date,
    image: `${siteConfig.url}/blog/opengraph-image`,
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.category, href: `/blog/category/${encodeURIComponent(post.category.replace(/ /g, '-'))}` },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Dark hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-5">
            <Link
              href={`/blog/category/${encodeURIComponent(post.category.replace(/ /g, '-'))}`}
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full border hover:opacity-80 transition-opacity ${
                categoryColours[post.category] ?? 'bg-slate-700 text-slate-300 border-slate-600'
              }`}
            >
              {post.category}
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article */}
      <Section variant="default">
        <div className="max-w-3xl mx-auto">
          <article className="space-y-2">
            {typeof post.content === 'string'
              ? renderMarkdown(post.content)
              : null}
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.replace(/ /g, '-'))}`}
                  className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-[#2563EB]/40 hover:text-[#2563EB] transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Social share */}
          <div className="mt-8">
            <SocialShare url={postUrl} title={post.title} />
          </div>

          {/* Internal links */}
          {internalLinks.length > 0 && (
            <div className="mt-8 p-5 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                <span className="text-sm font-semibold text-[#2563EB]">Explore related services</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#2563EB] hover:text-[#1d4ed8] underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pricing CTA */}
          <div className="mt-10">
            <PricingCTA />
          </div>
        </div>
      </Section>

      {/* Related posts */}
      {related.length > 0 && (
        <Section variant="muted" title="Related Articles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-md hover:border-[#2563EB]/30 transition-all"
              >
                <p className="text-sm text-[#2563EB] font-medium mb-2">{rel.category}</p>
                <h3 className="font-bold text-foreground dark:text-white mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                  {rel.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(rel.date)} · {rel.readTime}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <BlogReadTracker slug={post.slug} category={post.category} />
      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Talk to us about your project — we offer a free initial consultation with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-colors"
            >
              More articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
