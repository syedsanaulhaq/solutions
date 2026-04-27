import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  /** Section background variant */
  variant?: 'dark' | 'brand' | 'muted';
  badge?: string;
  title: string;
  /** Part of title rendered in accent colour */
  titleAccent?: string;
  subtitle?: string;
  primary?: { label: string; href?: string };
  secondary?: { label: string; href: string };
  /** Small trust items shown below the buttons */
  trustItems?: string[];
  className?: string;
}

export function CTASection({
  variant = 'dark',
  badge,
  title,
  titleAccent,
  subtitle,
  primary,
  secondary,
  trustItems,
  className,
}: CTASectionProps) {
  const isDark = variant === 'dark';
  const isBrand = variant === 'brand';

  return (
    <section
      className={cn(
        'py-20 md:py-28',
        isDark && 'bg-[#0F172A] text-white',
        isBrand && 'bg-[#2563EB] text-white',
        !isDark && !isBrand && 'bg-muted/40',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {badge && (
            <span
              className={cn(
                'inline-block mb-5 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border',
                isDark && 'bg-white/10 text-slate-300 border-white/20',
                isBrand && 'bg-white/20 text-white border-white/30',
                !isDark && !isBrand && 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20'
              )}
            >
              {badge}
            </span>
          )}

          <h2
            className={cn(
              'text-3xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight',
              !isDark && !isBrand && 'text-foreground'
            )}
          >
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className={cn(isDark && 'text-[#38BDF8]', isBrand && 'text-white/80', !isDark && !isBrand && 'text-[#2563EB]')}>
                  {titleAccent}
                </span>
              </>
            )}
          </h2>

          {subtitle && (
            <p
              className={cn(
                'text-lg mb-10 leading-relaxed',
                isDark && 'text-slate-300',
                isBrand && 'text-blue-100',
                !isDark && !isBrand && 'text-muted-foreground'
              )}
            >
              {subtitle}
            </p>
          )}

          {(primary || secondary) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {primary && (
                primary.href ? (
                  <Link href={primary.href}>
                    <Button
                      size="lg"
                      className={cn(
                        'w-full sm:w-auto text-base px-10',
                        isDark && 'bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20',
                        isBrand && 'bg-white text-[#2563EB] hover:bg-blue-50',
                        !isDark && !isBrand && 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white'
                      )}
                    >
                      {primary.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-md text-base font-medium px-10 h-11 transition-colors',
                      isDark && 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20',
                      isBrand && 'bg-white text-[#2563EB] hover:bg-blue-50',
                      !isDark && !isBrand && 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white'
                    )}
                  >
                    {primary.label} <ArrowRight className="h-4 w-4" />
                  </button>
                )
              )}
              {secondary && (
                <Link href={secondary.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className={cn(
                      'w-full sm:w-auto text-base px-10',
                      isDark && 'border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white',
                      isBrand && 'border-white/40 text-white bg-transparent hover:bg-white/10',
                      !isDark && !isBrand && ''
                    )}
                  >
                    {secondary.label}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {trustItems && trustItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className={cn(
                    'flex items-center gap-1.5',
                    isDark && 'text-slate-400',
                    isBrand && 'text-blue-200',
                    !isDark && !isBrand && 'text-muted-foreground'
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
