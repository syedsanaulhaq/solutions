import Link from 'next/link';

const themes = [
  {
    slug: 'luxe',
    title: 'Ultra Minimal Light',
    subtitle: 'Apple-like clean premium storefront',
    color: 'from-white via-zinc-100 to-zinc-200',
  },
  {
    slug: 'neon-tech',
    title: 'Brutalist Mono',
    subtitle: 'Hard contrast, blocky anti-template design',
    color: 'from-zinc-950 via-zinc-900 to-zinc-700',
  },
  {
    slug: 'market-pro',
    title: 'Retro Newspaper',
    subtitle: 'Editorial cream paper + serif aesthetic',
    color: 'from-amber-100 via-orange-100 to-yellow-50',
  },
  {
    slug: 'bold-mag',
    title: 'Playful Pop',
    subtitle: 'Colorful, energetic, youth-focused commerce',
    color: 'from-pink-400 via-orange-300 to-cyan-300',
  },
];

export default function ThemesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14" style={{ fontFamily: 'Manrope, Segoe UI, sans-serif' }}>
      <p className="text-center text-xs uppercase tracking-[0.2em] text-primary">Theme Showroom</p>
      <h1 className="mt-3 text-center text-4xl font-black tracking-tight sm:text-5xl">Totally Different Theme Styles</h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
        Each option below uses a different visual language, not just color changes. Open each and choose one for the full site.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {themes.map((theme) => (
          <Link
            key={theme.slug}
            href={`/designs/${theme.slug}`}
            className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className={`h-40 bg-gradient-to-br ${theme.color}`} />
            <div className="p-6">
              <h2 className="text-2xl font-extrabold group-hover:text-primary">{theme.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{theme.subtitle}</p>
              <p className="mt-4 text-sm font-semibold text-primary">Open demo {'->'}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Live store remains unchanged until you approve one.
      </div>
    </div>
  );
}
