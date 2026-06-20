import Link from 'next/link';
import Image from 'next/image';
import {
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wallet,
  Search,
} from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { site, whatsappLink } from '@/lib/site';

const trustBadges = [
  { icon: Truck, title: 'Fast COD Delivery', text: 'Cash on Delivery all over Pakistan' },
  { icon: ShieldCheck, title: '7-Day Replacement', text: 'Faulty item? We replace it free' },
  { icon: BadgeCheck, title: 'Genuine Imports', text: 'Quality-checked, directly imported' },
  { icon: Wallet, title: 'COD or Bank Transfer', text: 'Pay your way — cash or transfer' },
];

const steps = [
  {
    icon: PackageCheck,
    title: '1. Add to Cart',
    text: 'Browse the catalog and add the glasses you love to your cart.',
  },
  {
    icon: Wallet,
    title: '2. Checkout',
    text: 'Enter your address and choose Cash on Delivery or Bank Transfer.',
  },
  {
    icon: MessageCircle,
    title: '3. Confirm on WhatsApp',
    text: 'Your order opens in WhatsApp in one tap. We confirm and dispatch.',
  },
];

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Add items to your cart, go to checkout, enter your address and choose a payment method. Tap "Place Order" and it opens WhatsApp with your full order — we confirm and dispatch.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash on Delivery (pay when the parcel arrives) and Bank Transfer (we show our account details and a QR code at checkout). For bank transfer, just send the payment screenshot on WhatsApp.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders are delivered within 2–4 working days, depending on your city.',
  },
  {
    q: 'What if the product is faulty?',
    a: 'Every product includes a 7-day replacement warranty. If it arrives faulty, message us on WhatsApp and we will replace it free of cost.',
  },
  {
    q: 'Are these original imported products?',
    a: 'Yes, all our eyewear is directly imported and quality-checked before dispatch.',
  },
];

export default function HomePage() {
  const featured = featuredProducts().slice(0, 8); // 8 products for popular section

  return (
    <>
      {/* Top Yellow Bar with Promo */}
      <section className="bg-secondary text-foreground">
        <div className="mx-auto max-w-full px-4 py-2 text-center text-sm font-medium">
          📦 FREE DELIVERY | 🔄 7-DAY REPLACEMENT | 💯 ORIGINAL PRODUCTS
        </div>
      </section>

      {/* Blue Header with Search */}
      <section className="border-b border-border bg-primary text-primary-foreground sticky top-[4rem] z-20">
        <div className="mx-auto max-w-full px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2 bg-primary-foreground/15 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search glasses..."
                className="w-full bg-transparent outline-none text-sm placeholder-primary-foreground/60 text-primary-foreground"
              />
            </div>
            <span className="text-sm font-semibold whitespace-nowrap">🛒 Cart</span>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="mx-auto max-w-full">
        <div className="grid grid-cols-4 gap-0 min-h-[600px]">
          {/* Sidebar - Categories */}
          <div className="col-span-1 bg-muted border-r border-border p-4 max-h-[calc(100vh-9rem)] overflow-y-auto">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block text-sm font-medium text-foreground hover:text-primary transition-colors p-2 hover:bg-background rounded"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-span-3 px-6 py-8">
            {/* Popular Products */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Popular Products</h2>
                <p className="text-sm text-muted-foreground mt-1">Best sellers and most loved glasses</p>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-12">
                {featured.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/category/smart-glasses"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-background border-t border-b border-border py-8">
        <div className="mx-auto max-w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How to Order</h2>
            <p className="mt-2 text-muted-foreground">No app, no account — order in under a minute.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                {f.q}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-3xl font-bold">Ready to upgrade your look?</h2>
          <p className="max-w-lg text-primary-foreground/90">
            Browse the catalog, add to cart and check out in minutes. Pay by Cash on Delivery or Bank Transfer.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Start Shopping
            </Link>
            <a
              href={whatsappLink(`Hi ${site.name}! I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
