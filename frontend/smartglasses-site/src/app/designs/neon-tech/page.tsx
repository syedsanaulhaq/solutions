import Image from 'next/image';
import Link from 'next/link';

const specs = [
  'BOLD PRICE BLOCKS',
  'HIGH-CONTRAST CATALOG',
  'NO SOFT SHADOWS',
  'UTILITY-FIRST LAYOUT',
];

export default function NeonTechThemePage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950" style={{ fontFamily: 'Arial Black, Impact, Haettenschweiler, sans-serif' }}>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="inline-block border-2 border-zinc-950 bg-yellow-300 px-2 py-1 text-xs tracking-[0.2em]">BRUTALIST MONO</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">LOUD.<br />FAST.<br />CLEAR.</h1>
        <p className="mt-4 max-w-2xl text-sm font-bold">A completely opposite direction: hard edges, sharp borders, punchy labels.</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative h-[360px] overflow-hidden border-4 border-zinc-950 bg-white">
            <Image src="/products/glass-03.svg" alt="Brutalist hero" fill className="object-cover" />
            <div className="absolute bottom-3 left-3 border-2 border-zinc-950 bg-lime-300 px-2 py-1 text-xs">DROP #01</div>
          </div>
          <div className="space-y-3">
            {specs.map((spec) => (
              <div key={spec} className="border-2 border-zinc-950 bg-white p-4">
                <p className="text-sm tracking-wide">{spec}</p>
              </div>
            ))}
            <Link href="/designs" className="inline-block border-2 border-zinc-950 bg-zinc-950 px-5 py-3 text-sm text-white">
              Back To Themes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
