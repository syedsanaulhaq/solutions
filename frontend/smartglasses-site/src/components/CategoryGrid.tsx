import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { productsByCategory } from '@/data/products';

export function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="mt-2 text-muted-foreground">From smart glasses to everyday frames — find your perfect pair.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = productsByCategory(c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{c.emoji}</span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {count} item{count === 1 ? '' : 's'}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-primary">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
