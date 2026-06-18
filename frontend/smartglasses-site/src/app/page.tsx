import Link from 'next/link';
import Image from 'next/image';
import {
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { CategoryGrid } from '@/components/CategoryGrid';
import { VideoSection } from '@/components/VideoSection';
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

const heroShots = [
  '/products/extra-2.jpg',
  '/products/2_photo-1577744486770-020ab432da65.jpg',
  '/products/7_photo-1604176354204-9268737828e4.jpg',
];

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/35 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Truck className="h-3.5 w-3.5" /> COD &amp; Bank Transfer across Pakistan
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Dark Style. <span className="text-primary">Smart Vision.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">{site.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#categories"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop All Glasses
              </Link>
              <Link
                href="/category/smart-glasses"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Explore Smart Glasses
              </Link>
            </div>
          </div>

          <div className="relative h-[360px] w-full">
            <div className="absolute left-2 top-16 h-56 w-44 rotate-[-8deg] overflow-hidden rounded-2xl border border-border/70 shadow-xl shadow-black/35 transition-transform duration-500 hover:-translate-y-2">
              <Image src={heroShots[0]} alt="Smart glasses product" fill className="object-cover" priority />
            </div>
            <div className="absolute left-1/2 top-0 h-64 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-border/70 shadow-2xl shadow-black/45 transition-transform duration-500 hover:-translate-y-2">
              <Image src={heroShots[1]} alt="Sunglasses product" fill className="object-cover" priority />
            </div>
            <div className="absolute right-2 top-20 h-56 w-44 rotate-[8deg] overflow-hidden rounded-2xl border border-border/70 shadow-xl shadow-black/35 transition-transform duration-500 hover:-translate-y-2">
              <Image src={heroShots[2]} alt="Eyeglasses product" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategoryGrid />

      {/* Video demo */}
      <VideoSection />

      {/* Featured products */}
      <section id="featured" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="mt-2 text-muted-foreground">Our most popular picks across every category.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Browse all categories
          </Link>
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
