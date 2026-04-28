import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCTAProps {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function ServiceCTA({
  title,
  subtitle,
  primaryLabel = 'Get a Free Quote',
  primaryHref = '/get-a-quote',
  secondaryLabel = 'View Our Portfolio',
  secondaryHref = '/portfolio',
}: ServiceCTAProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      <p className="text-slate-300 mb-8 text-lg leading-relaxed">{subtitle}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={primaryHref}>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20"
          >
            {primaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href={secondaryHref}>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
          >
            {secondaryLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
