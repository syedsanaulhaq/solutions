import { CTASection } from '@/components/CTASection';
import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'Blog — HostingOcean.net',
  description: 'Hosting tips, WordPress guides, domain advice, and news from HostingOcean Pakistan.',
  alternates: {
    canonical: 'https://hostingocean.net/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">Blog</h1>
          <p className="text-lg text-green-100">
            Hosting tips, WordPress guides, domain advice, and digital news for Pakistani businesses.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-xl border border-border bg-card p-6 hover:border-[#15803D]/50 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#15803D]/10 text-[#15803D]">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-xs text-muted-foreground">&bull; {post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold mb-2 hover:text-[#15803D] transition-colors">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <a
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#15803D] hover:underline"
              >
                Read more &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        heading="Want hosting tips direct to your inbox?"
        subheading="Contact us with any hosting question and our expert team will get back to you."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
