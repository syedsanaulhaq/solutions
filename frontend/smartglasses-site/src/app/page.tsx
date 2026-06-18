import {
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { site, whatsappLink } from '@/lib/site';

const trustBadges = [
  { icon: Truck, title: 'Free COD Delivery', text: 'Cash on Delivery all over Pakistan' },
  { icon: ShieldCheck, title: '7-Day Replacement', text: 'Faulty item? We replace it free' },
  { icon: BadgeCheck, title: 'Genuine Imports', text: 'Quality-checked, directly imported' },
  { icon: MessageCircle, title: 'Easy WhatsApp Orders', text: 'Order in 1 minute, no signup' },
];

const steps = [
  {
    icon: MessageCircle,
    title: '1. Tap "Order on WhatsApp"',
    text: 'Pick a product and message us on WhatsApp. We confirm price, colour and stock.',
  },
  {
    icon: PackageCheck,
    title: '2. Share your address',
    text: 'Send your name, full address and phone number. We book your parcel with the courier.',
  },
  {
    icon: Wallet,
    title: '3. Pay on Delivery',
    text: 'Receive your smart glasses at your door and pay cash. Simple and risk-free.',
  },
];

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Just tap any "Order on WhatsApp" button, send us your address, and we deliver to your doorstep. You can pay cash on delivery.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes. You pay only when the parcel reaches you, anywhere in Pakistan via our courier partners.',
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
    a: 'Yes, all our smart glasses are directly imported and quality-checked before dispatch.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Truck className="h-3.5 w-3.5" /> Cash on Delivery across Pakistan
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              See Smarter. <span className="text-primary">Live Smarter.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop Smart Glasses
              </a>
              <a
                href={whatsappLink(`Hi ${site.name}! I'd like help choosing a product.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" /> Chat with us
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 text-9xl sm:h-80 sm:w-80">
              <span aria-hidden>🕶️</span>
            </div>
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

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Our Smart Glasses</h2>
          <p className="mt-2 text-muted-foreground">
            Tap any product to order instantly on WhatsApp — pay cash on delivery.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
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
            Message us now on WhatsApp. We&apos;ll help you choose the right pair and deliver it to your door.
          </p>
          <a
            href={whatsappLink(`Hi ${site.name}! I want to place an order.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
