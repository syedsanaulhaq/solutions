import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'dark';
  align?: 'left' | 'center';
}

export function Section({
  id,
  className,
  title,
  subtitle,
  children,
  variant = 'default',
  align = 'center',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        variant === 'muted' && 'bg-muted/40 dark:bg-muted/10',
        variant === 'dark' && 'bg-[#0F172A] text-white',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left')}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  'text-lg text-muted-foreground leading-relaxed',
                  align === 'center' && 'max-w-2xl mx-auto'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
