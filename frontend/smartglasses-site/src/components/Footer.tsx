import Link from 'next/link';
import { Glasses, Mail, MapPin, Phone } from 'lucide-react';
import { site, whatsappLink } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Glasses className="h-5 w-5" />
            </span>
            <span className="text-lg">{site.name}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{site.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/#products" className="hover:text-foreground">Products</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-foreground">How to Order</Link></li>
            <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {site.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{site.city}, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground">
          © {year} {site.name}. Delivered across Pakistan with Cash on Delivery.
        </p>
      </div>
    </footer>
  );
}
