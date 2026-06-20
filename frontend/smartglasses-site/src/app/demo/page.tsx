import Link from 'next/link';
import Image from 'next/image';

const shots = [
  '/products/glass-01.svg',
  '/products/glass-06.svg',
  '/products/glass-10.svg',
  '/products/glass-14.svg',
  '/products/glass-18.svg',
  '/products/glass-22.svg',
];

export default function DemoStylesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Design Demo</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Choose Your Store Look</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          These are 3 different premium directions for your SmartGlasses store. Pick one and I will apply it to the whole site.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="overflow-hidden rounded-3xl border border-border/70 bg-card/90 shadow-xl shadow-black/30">
          <div className="border-b border-border/70 bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">Option 1</p>
            <h2 className="mt-2 text-2xl font-extrabold text-zinc-100">Luxury Editorial</h2>
          </div>
          <div className="space-y-5 p-6">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-zinc-700/80 bg-black">
              <Image src={shots[0]} alt="Luxury eyewear" fill className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">
              Minimal text, strong typography, premium spacing, cinematic product focus.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs text-zinc-300">
              <div className="rounded-xl border border-zinc-700/70 bg-zinc-900/70 p-3">Large visuals</div>
              <div className="rounded-xl border border-zinc-700/70 bg-zinc-900/70 p-3">High trust look</div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-950 shadow-xl shadow-cyan-500/10">
          <div className="border-b border-cyan-400/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.25),transparent_40%)] px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Option 2</p>
            <h2 className="mt-2 text-2xl font-extrabold text-cyan-50">Tech Futuristic</h2>
          </div>
          <div className="space-y-5 p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-28 overflow-hidden rounded-xl border border-cyan-400/40 bg-slate-900">
                <Image src={shots[1]} alt="Tech glasses" fill className="object-cover" />
              </div>
              <div className="relative h-28 overflow-hidden rounded-xl border border-cyan-400/40 bg-slate-900">
                <Image src={shots[3]} alt="Smart lens" fill className="object-cover" />
              </div>
              <div className="relative h-28 overflow-hidden rounded-xl border border-cyan-400/40 bg-slate-900">
                <Image src={shots[4]} alt="Sports glasses" fill className="object-cover" />
              </div>
              <div className="relative h-28 overflow-hidden rounded-xl border border-cyan-400/40 bg-slate-900">
                <Image src={shots[2]} alt="Frame design" fill className="object-cover" />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cyan-100/90">
              Neon accents, feature-first cards, performance specs, and bold conversion blocks.
            </p>
            <div className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 p-3 text-xs text-cyan-100">
              Best for smart glasses and gadget buyers.
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-amber-500/30 bg-card shadow-xl shadow-black/25">
          <div className="border-b border-amber-300/30 bg-gradient-to-r from-amber-500/20 via-orange-400/10 to-transparent px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Option 3</p>
            <h2 className="mt-2 text-2xl font-extrabold text-amber-50">Marketplace Pro</h2>
          </div>
          <div className="space-y-5 p-6">
            <div className="rounded-2xl border border-border bg-background/70 p-3">
              <div className="grid grid-cols-3 gap-2">
                {shots.map((img) => (
                  <div key={img} className="relative h-16 overflow-hidden rounded-lg border border-border bg-secondary/40">
                    <Image src={img} alt="Catalog card" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Familiar high-conversion layout with premium polish and cleaner brand identity.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-border bg-secondary/40 p-3">Fast browse UX</div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3">Better checkout trust</div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card/80 p-6 text-center">
        <p className="text-sm text-muted-foreground">Pick your favorite option and I will convert the whole store to that style.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/70">
            Back to Store
          </Link>
          <a
            href="https://wa.me/923339141680?text=I%20pick%20a%20new%20design%20for%20SmartGlasses"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Send Choice on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
