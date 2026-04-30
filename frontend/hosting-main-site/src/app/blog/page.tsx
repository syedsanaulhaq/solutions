import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — UK Hosting Guides, Tips & News',
  description:
    'Expert guides on web hosting, VPS setup, WordPress optimisation, domain management, and UK web development best practices.',
};

const posts = [
  {
    slug: 'choosing-right-web-hosting-uk',
    title: 'How to Choose the Right Web Hosting for Your UK Business',
    excerpt: 'From shared hosting to VPS, we break down which hosting type suits each stage of your business journey.',
    date: '2025-01-10',
    category: 'Guides',
    readTime: '7 min',
  },
  {
    slug: 'wordpress-performance-optimisation',
    title: '10 WordPress Performance Optimisation Tips for 2025',
    excerpt: 'Speed up your WordPress site with caching, image optimisation, and the right hosting environment.',
    date: '2025-01-05',
    category: 'WordPress',
    readTime: '9 min',
  },
  {
    slug: 'vps-vs-shared-hosting',
    title: 'VPS vs Shared Hosting: Which Is Right for You?',
    excerpt: 'A detailed comparison to help you decide when to upgrade from shared hosting to a VPS.',
    date: '2024-12-20',
    category: 'Comparisons',
    readTime: '6 min',
  },
  {
    slug: 'ssl-certificate-guide',
    title: 'SSL Certificates Explained: Why Every Website Needs HTTPS',
    excerpt: 'What SSL certificates are, why they matter for SEO and security, and how to get one free.',
    date: '2024-12-15',
    category: 'Security',
    readTime: '5 min',
  },
  {
    slug: 'domain-name-tips',
    title: '8 Tips for Choosing a Great Domain Name for Your Business',
    excerpt: 'Practical advice for picking a memorable, brandable domain that ranks well and looks professional.',
    date: '2024-12-10',
    category: 'Domains',
    readTime: '5 min',
  },
  {
    slug: 'uk-gdpr-web-hosting',
    title: 'UK GDPR and Web Hosting: What You Need to Know',
    excerpt: 'How to ensure your hosting setup is compliant with UK GDPR data localisation requirements.',
    date: '2024-12-01',
    category: 'Compliance',
    readTime: '8 min',
  },
];

const categoryColors: Record<string, string> = {
  Guides: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  WordPress: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  Comparisons: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Security: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Domains: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Compliance: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export default function BlogPage() {
  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-slate-300">
            Expert guides, comparisons and news on web hosting, domains and UK web development.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border border-border bg-card hover:border-[#2563EB]/50 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${categoryColors[post.category] ?? ''}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                  </div>
                  <h2 className="text-base font-bold group-hover:text-[#2563EB] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-[#2563EB] hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
