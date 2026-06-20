import Image from 'next/image';
import Link from 'next/link';

export default function BoldMagThemePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">Bold Magazine Theme</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">Not Just Glasses. A Statement.</h1>
            <p className="mt-4 text-slate-200/85">
              Campaign-style sections, expressive blocks, and a standout visual identity for social-first branding.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="rounded-lg bg-fuchsia-400 px-5 py-3 text-sm font-bold text-slate-950">View Drop</button>
              <Link href="/designs" className="rounded-lg border border-fuchsia-300/40 px-5 py-3 text-sm font-semibold">Back</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {['/products/glass-02.svg', '/products/glass-08.svg', '/products/glass-16.svg', '/products/glass-21.svg'].map((img) => (
              <div key={img} className="relative h-44 overflow-hidden rounded-2xl border border-slate-700">
                <Image src={img} alt="Campaign product" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
