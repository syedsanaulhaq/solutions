import Image from 'next/image';
import Link from 'next/link';

const rows = ['/products/glass-04.svg', '/products/glass-07.svg', '/products/glass-13.svg', '/products/glass-18.svg'];

export default function MarketProThemePage() {
  return (
    <div className="min-h-screen bg-[#f8f0df] text-[#2b2115]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
      <section className="border-b border-[#8c7b66]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <p className="text-sm uppercase tracking-[0.2em]">Retro Newspaper</p>
          <Link href="/designs" className="rounded-md border border-[#8c7b66] px-3 py-1.5 text-sm">Back</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="border-y-4 border-[#2b2115] py-8 text-center">
          <p className="text-xs tracking-[0.28em]">THE DAILY FRAME</p>
          <h1 className="mt-3 text-5xl font-bold">Eyewear Bulletin</h1>
          <p className="mt-3 text-base">A nostalgic, editorial storefront with warm paper tones and classic serif hierarchy.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((img, i) => (
            <div key={img} className="overflow-hidden border border-[#8c7b66] bg-[#fffaf0]">
              <div className="relative h-44 border-b border-[#8c7b66]">
                <Image src={img} alt={`Catalog ${i + 1}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="line-clamp-1 text-lg font-bold">Column Frame {i + 1}</p>
                <p className="mt-1 text-sm text-[#5f4d3c]">Printed-style cards with classy old-paper aesthetic.</p>
                <p className="mt-3 text-base font-bold">Rs. {(2490 + i * 500).toLocaleString()}</p>
                <button className="mt-3 w-full border border-[#2b2115] bg-[#2b2115] px-3 py-2 text-sm font-semibold text-[#f8f0df]">Read & Buy</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
