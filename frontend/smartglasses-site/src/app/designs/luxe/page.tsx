import Image from 'next/image';
import Link from 'next/link';

const items = ['/products/glass-01.svg', '/products/glass-05.svg', '/products/glass-09.svg'];

export default function LuxeThemePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: 'Manrope, Segoe UI, sans-serif' }}>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Ultra Minimal Light</p>
          <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">Less Noise. More Product.</h1>
          <p className="mt-5 max-w-lg text-zinc-600">
            Bright, minimal, premium. Focuses all attention on frames with clean whitespace and simple hierarchy.
          </p>
          <div className="mt-10 flex gap-3">
            <button className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white">Shop Collection</button>
            <Link href="/designs" className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold">
              Back To Themes
            </Link>
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50">
          <Image src="/products/glass-06.svg" alt="Minimal hero" fill className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((img, i) => (
            <div key={img} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <div className="relative h-56 bg-zinc-50">
                <Image src={img} alt={`Product ${i + 1}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Core Collection</p>
                <p className="mt-1 text-lg font-semibold">Frame 0{i + 1}</p>
                <p className="mt-2 text-sm text-zinc-600">Rs. {(3990 + i * 700).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
