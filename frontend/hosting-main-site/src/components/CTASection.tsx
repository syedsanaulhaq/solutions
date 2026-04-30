interface CTASectionProps {
  heading: string;
  subheading?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export function CTASection({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  dark = false,
}: CTASectionProps) {
  return (
    <section
      className={`py-20 px-4 ${
        dark ? 'bg-[#0F172A] text-white' : 'bg-[#2563EB]/5 dark:bg-[#2563EB]/10'
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{heading}</h2>
        {subheading && (
          <p className={`text-lg mb-8 ${dark ? 'text-slate-300' : 'text-muted-foreground'}`}>
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            target={primaryHref.startsWith('http') ? '_blank' : undefined}
            rel={primaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors shadow-md shadow-[#2563EB]/20"
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              target={secondaryHref.startsWith('http') ? '_blank' : undefined}
              rel={secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg border transition-colors ${
                dark
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-border hover:bg-accent'
              }`}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
