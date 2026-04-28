import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts, getFeaturedPosts, getUniqueCategories } from '@/lib/blog';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { BlogListing } from '@/components/BlogListing';
import { ArrowRight, Clock, Calendar, Star } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Insights on LMS development, AI chatbots, React and Node.js development, automation, and software project management from the HostingOcean Solutions team.',
  path: '/blog',
  keywords: [
    'software development blog',
    'LMS blog UK',
    'AI chatbot articles',
    'web development insights',
  ],
});

const categoryColours: Record<string, string> = {
  'LMS Development':
    'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
  'AI Chatbots':
    'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
  'Project Management':
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  Automation:
    'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  'React Development':
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  'Node.js':
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const categories = getUniqueCategories();

  return (
    <>
      <Hero
        badge="Insights &amp; Guides"
        title="The HostingOcean"
        titleAccent="Solutions Blog"
        subtitle="Practical guides on LMS development, AI chatbots, automation, and software delivery — written for decision-makers and technical teams alike."
      />

      {/* Featured posts */}
      {featured.length > 0 && (
        <Section variant="muted">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <h2 className="text-lg font-bold">Featured articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-background border border-border rounded-2xl p-7 hover:shadow-lg hover:border-[#2563EB]/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                        categoryColours[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs font-medium text-amber-500 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* All posts with search/filter */}
      <Section variant="default" title="All articles">
        <div className="max-w-5xl mx-auto">
          <BlogListing posts={posts} categories={categories} />
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to discuss your project?
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            If something you read sparked an idea, we are happy to talk it through — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-slate-600 text-white hover:bg-slate-700 px-8 py-3.5 rounded-lg transition-colors"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
