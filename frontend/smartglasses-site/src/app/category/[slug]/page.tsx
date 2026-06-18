import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, getCategory } from '@/data/categories';
import { productsByCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: 'Category not found' };
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = productsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mb-10 flex items-center gap-4">
        <span className="text-5xl">{category.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No products in this category yet — check back soon.</p>
      )}

      {/* Other categories */}
      <div className="mt-16 border-t border-border/60 pt-8">
        <h2 className="mb-4 text-lg font-semibold">Browse other categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
