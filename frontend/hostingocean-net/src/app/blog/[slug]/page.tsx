import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://hostingocean.net/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://hostingocean.net/blog/${post.slug}`,
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-green-200 mb-3">{post.category}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <div className="text-sm text-green-100">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <article className="max-w-3xl mx-auto prose prose-slate max-w-none">
          <p className="text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>

          {post.content.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                {section.body.map((paragraph, index) => (
                  <p key={`${section.heading}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-10 p-5 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-3">Explore Related Hosting Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/web-hosting" className="text-[#15803D] hover:underline">
                  Web Hosting Pakistan Plans
                </Link>
              </li>
              <li>
                <Link href="/vps-hosting" className="text-[#15803D] hover:underline">
                  VPS Hosting Pakistan Plans
                </Link>
              </li>
              <li>
                <Link href="/dedicated-servers" className="text-[#15803D] hover:underline">
                  Dedicated Servers Pakistan
                </Link>
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <Link href="/blog" className="text-sm font-medium text-[#15803D] hover:underline">
              ← Back to Blog
            </Link>
          </section>
        </article>
      </section>
    </>
  );
}
