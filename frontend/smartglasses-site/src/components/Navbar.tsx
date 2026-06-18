import Link from 'next/link';
import { Glasses } from 'lucide-react';
import { site, whatsappLink } from '@/lib/site';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Glasses className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/#products" className="text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">
            How to Order
          </Link>
          <Link href="/#faq" className="text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </Link>
        </div>

        <a
          href={whatsappLink(`Hi ${site.name}! I have a question.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Order Now
        </a>
      </nav>
    </header>
  );
}
