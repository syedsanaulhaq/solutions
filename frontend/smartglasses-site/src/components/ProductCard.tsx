import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { getCategory } from '@/data/categories';
import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPKR } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;
  const category = getCategory(product.categorySlug);
  const href = `/product/${product.slug}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="relative flex h-44 items-center justify-center bg-gradient-to-br from-secondary to-accent/10 text-6xl">
        <span aria-hidden className="transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category?.name ?? product.categorySlug}
        </span>
        <Link href={href}>
          <h3 className="mt-1 text-lg font-bold transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>

        <ul className="mt-4 space-y-1.5">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end gap-2">
          <span className="text-2xl font-extrabold">{formatPKR(product.price)}</span>
          {product.oldPrice && (
            <span className="mb-0.5 text-sm text-muted-foreground line-through">
              {formatPKR(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <AddToCartButton
            slug={product.slug}
            inStock={product.inStock}
            className="flex-1"
            label={product.price >= 8000 ? 'Add' : 'Add to Cart'}
          />
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
