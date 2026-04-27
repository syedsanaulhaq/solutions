import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  cta1?: { label: string; href: string };
  cta2?: { label: string; href: string };
}

export function Hero({ badge, title, titleAccent, subtitle, cta1, cta2 }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white py-24 md:py-32">
      {/* Decorative blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#2563EB]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-sm text-slate-300 mb-8 backdrop-blur-sm animate-fade-in">
            <Zap className="h-3.5 w-3.5 text-[#38BDF8]" />
            {badge}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight animate-fade-in animation-delay-100">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="text-[#38BDF8]">{titleAccent}</span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in animation-delay-200">
          {subtitle}
        </p>

        {(cta1 || cta2) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-300">
            {cta1 && (
              <Link href={cta1.href}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/25"
                >
                  {cta1.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {cta2 && (
              <Link href={cta2.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
                >
                  {cta2.label}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
