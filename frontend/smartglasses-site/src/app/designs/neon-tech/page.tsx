import Image from 'next/image';
import Link from 'next/link';

const specs = [
  'Open-ear Bluetooth Audio',
  'Voice Assistant + Call Mic',
  'UV + Blue Light Shield',
  'All-day Comfort Frame',
];

export default function NeonTechThemePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.22),transparent_35%),#020617] text-cyan-50">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Neon Tech Theme</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Smart Eyewear, Reimagined</h1>
        <p className="mt-4 max-w-2xl text-cyan-100/80">Futuristic surfaces, glowing accents, and feature-first modules built for gadget-focused buyers.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative h-[360px] overflow-hidden rounded-3xl border border-cyan-400/40 bg-slate-950">
            <Image src="/products/glass-03.svg" alt="Tech hero" fill className="object-cover" />
          </div>
          <div className="space-y-4">
            {specs.map((spec) => (
              <div key={spec} className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 p-4">
                <p className="font-semibold">{spec}</p>
              </div>
            ))}
            <Link href="/designs" className="inline-block rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950">
              Back To Themes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
