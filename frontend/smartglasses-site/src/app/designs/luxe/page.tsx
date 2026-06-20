import Image from 'next/image';
import Link from 'next/link';

const items = ['/products/glass-01.svg', '/products/glass-05.svg', '/products/glass-09.svg', '/products/glass-12.svg'];

export default function LuxeThemePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Luxe Black Theme</p>
          <h1 className="mt-4 text-5xl font-black leading-tight">Timeless Frames For Modern Vision</h1>
          <p className="mt-5 max-w-lg text-zinc-300">
            Clean editorial composition with premium spacing, bold type, and cinematic product storytelling.
          </p>
          <div className="mt-8 flex gap-3">
            <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black">Shop Collection</button>
            <Link href="/designs" className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold">
              Back To Themes
            </Link>
          </div>
        </div>
        <div className="relative h-[380px] overflow-hidden rounded-3xl border border-zinc-800">
          <Image src="/products/glass-06.svg" alt="Luxe hero" fill className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((img, i) => (
            <div key={img} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <div className="relative h-44">
                <Image src={img} alt={`Product ${i + 1}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs text-zinc-400">Premium Series</p>
                <p className="mt-1 font-semibold">Signature Frame {i + 1}</p>
                <p className="mt-2 text-sm text-zinc-300">Rs. {(3990 + i * 700).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
