import { Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { orderLink } from '@/lib/site';
import { cn, formatPKR } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-secondary to-accent/10 text-6xl">
        <span aria-hidden>{product.emoji}</span>
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
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>

        <ul className="mt-4 space-y-1.5">
          {product.features.slice(0, 4).map((f) => (
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

        <a
          href={orderLink(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90',
            product.inStock
              ? 'bg-primary text-primary-foreground'
              : 'bg-accent text-accent-foreground',
          )}
        >
          {product.inStock ? 'Order on WhatsApp' : 'Pre-order on WhatsApp'}
        </a>
      </div>
    </div>
  );
}
