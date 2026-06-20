import Link from 'next/link';
import Image from 'next/image';
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
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="relative flex h-48 items-center justify-center bg-muted text-6xl">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span aria-hidden className="transition-transform duration-300 group-hover:scale-110">
            {product.emoji}
          </span>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category?.name ?? product.categorySlug}
        </span>
        <Link href={href}>
          <h3 className="mt-1 text-base font-bold transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-extrabold text-foreground">{formatPKR(product.price)}</span>
          {product.oldPrice && (
            <span className="mb-0.5 text-xs text-muted-foreground line-through">
              {formatPKR(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <AddToCartButton
            slug={product.slug}
            inStock={product.inStock}
            className="flex-1"
            label="Add to Cart"
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
