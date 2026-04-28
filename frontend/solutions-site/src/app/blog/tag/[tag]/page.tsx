import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPostsByTag,
  getUniqueTags,
  formatDate,
} from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

interface Props {
  params: { tag: string };
}

function decodeTag(raw: string): string {
  return decodeURIComponent(raw).replace(/-/g, ' ');
}

export function generateStaticParams() {
  return getUniqueTags().map((tag) => ({
    tag: encodeURIComponent(tag.replace(/ /g, '-')),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeTag(params.tag);
  return buildMetadata({
    title: `#${tag} Articles`,
    description: `Browse all articles tagged with "${tag}" on the HostingOcean Solutions blog.`,
    path: `/blog/tag/${params.tag}`,
    keywords: [tag, 'blog', 'articles', 'HostingOcean Solutions'],
  });
}

export default function BlogTagPage({ params }: Props) {
  const tag = decodeTag(params.tag);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

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
          <div className="flex items-center gap-2 mb-5">
            <Tag className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
            <span className="text-xs font-medium px-3 py-1 rounded-full border bg-slate-700 text-slate-300 border-slate-600">
              Tag
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            #{tag}
          </h1>
          <p className="text-slate-300 text-lg">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Posts */}
      <Section variant="default">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-background border border-border/50 rounded-xl p-6 hover:shadow-md hover:border-[#2563EB]/30 transition-all"
            >
              <p className="text-xs font-medium text-[#2563EB] mb-2">{post.category}</p>
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
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      t.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30 font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
