import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { products, getProduct, productsByCategory } from '@/data/products';
import { getCategory } from '@/data/categories';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductCard } from '@/components/ProductCard';
import { formatPKR } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;
  const related = productsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-foreground">
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-accent/10 text-[10rem]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span aria-hidden>{product.emoji}</span>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-xs font-medium uppercase tracking-wide text-primary hover:underline"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-extrabold">{formatPKR(product.price)}</span>
            {product.oldPrice && (
              <span className="mb-1 text-lg text-muted-foreground line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton slug={product.slug} inStock={product.inStock} className="px-8 py-3" />
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Go to Cart
            </Link>
          </div>

          {!product.inStock && (
            <p className="mt-3 text-sm text-muted-foreground">
              This item is available on pre-order. Add it to your cart and we&apos;ll confirm timing on WhatsApp.
            </p>
          )}

          <div className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-5 w-5 text-primary" /> Fast delivery
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-5 w-5 text-primary" /> COD / Transfer
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-5 w-5 text-primary" /> 7-day replacement
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
