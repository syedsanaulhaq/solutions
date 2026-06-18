'use client';

import Link from 'next/link';
import { Glasses, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { site } from '@/lib/site';
import { CartIcon } from '@/components/CartIcon';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Glasses className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link href="/#categories" className="text-muted-foreground transition-colors hover:text-foreground">
            Categories
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.shortName}
            </Link>
          ))}
          <Link href="/#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">
            How to Order
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <CartIcon />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3 text-sm font-medium">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-secondary"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
            <Link href="/#how-it-works" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-secondary">
              How to Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
