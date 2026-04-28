import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostsByCategory,
  getUniqueCategories,
  formatDate,
} from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

interface Props {
  params: { category: string };
}

function decodeCategory(raw: string): string {
  return decodeURIComponent(raw).replace(/-/g, ' ');
}

export function generateStaticParams() {
  return getUniqueCategories().map((cat) => ({
    category: encodeURIComponent(cat.replace(/ /g, '-')),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeCategory(params.category);
  const posts = getPostsByCategory(category);
  if (!posts.length) return {};
  return buildMetadata({
    title: `${category} Articles`,
    description: `Browse all ${category} articles from HostingOcean Solutions — practical guides, deep-dives, and insights for your projects.`,
    path: `/blog/category/${params.category}`,
    keywords: [category, 'blog', 'articles', 'HostingOcean Solutions'],
  });
}

const categoryColours: Record<string, string> = {
  'LMS Development': 'bg-violet-900/40 text-violet-300 border-violet-700',
  'AI Chatbots': 'bg-sky-900/40 text-sky-300 border-sky-700',
  'Project Management': 'bg-emerald-900/40 text-emerald-300 border-emerald-700',
  Automation: 'bg-orange-900/40 text-orange-300 border-orange-700',
  'React Development': 'bg-blue-900/40 text-blue-300 border-blue-700',
  'Node.js': 'bg-green-900/40 text-green-300 border-green-700',
};

export default function BlogCategoryPage({ params }: Props) {
  const category = decodeCategory(params.category);
  const posts = getPostsByCategory(category);
  if (!posts.length) notFound();

  const colourClass =
    categoryColours[category] ?? 'bg-slate-700 text-slate-300 border-slate-600';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-5 ${colourClass}`}>
            Category
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            {category}
          </h1>
          <p className="text-slate-300 text-lg">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <Section variant="default">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-background border border-border/50 rounded-xl p-6 hover:shadow-md hover:border-[#2563EB]/30 transition-all"
            >
              <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border mb-3 ${colourClass}`}>
                {post.category}
              </span>
              <h2 className="font-bold text-foreground dark:text-white mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
