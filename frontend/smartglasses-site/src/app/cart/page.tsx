'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPKR } from '@/lib/utils';
import { shippingFor, site } from '@/lib/site';

export default function CartPage() {
  const { items, subtotal, setQty, remove, count } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
          <ShoppingCart className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our glasses and add your favourites to the cart.</p>
        <Link
          href="/#categories"
          className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {items.map(({ product, qty, lineTotal }) => (
              <li
                key={product.slug}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent/10 text-4xl"
                >
                  <span aria-hidden>{product.emoji}</span>
                </Link>

                <div className="min-w-0 flex-1">
                  <Link href={`/product/${product.slug}`} className="font-semibold hover:text-primary">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{formatPKR(product.price)} each</p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(product.slug, qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-secondary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm font-medium">{qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(product.slug, qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-secondary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold">{formatPKR(lineTotal)}</div>
              </li>
            ))}
          </ul>

          <Link href="/#categories" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? 'Free' : formatPKR(shipping)}</dd>
              </div>
              {shipping > 0 && site.freeShippingOver > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPKR(site.freeShippingOver - subtotal)} more for free shipping.
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-extrabold">{formatPKR(total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="mt-6 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pay by Cash on Delivery or Bank Transfer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
