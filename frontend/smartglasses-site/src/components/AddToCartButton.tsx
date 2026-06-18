'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

export function AddToCartButton({
  slug,
  inStock,
  className,
  label = 'Add to Cart',
}: {
  slug: string;
  inStock: boolean;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!inStock) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground',
          className,
        )}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95',
        className,
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}
