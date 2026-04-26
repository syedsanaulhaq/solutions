import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts, formatDate } from '@/lib/blog';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

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
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        badge="Insights &amp; Guides"
        title="The HostingOcean"
        titleAccent="Solutions Blog"
        subtitle="Practical guides on LMS development, AI chatbots, automation, and software delivery — written for decision-makers and technical teams alike."
      />

      <Section variant="default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-7 hover:shadow-lg hover:border-[#2563EB]/30 transition-all duration-200"
            >
              <div className="mb-4">
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                    categoryColours[post.category] ??
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {post.category}
                </span>
              </div>

              <h2 className="text-xl font-bold text-foreground dark:text-white mb-3 leading-snug group-hover:text-[#2563EB] transition-colors">
                {post.title}
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] group-hover:gap-2.5 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
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
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
