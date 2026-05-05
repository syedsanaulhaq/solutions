import { type LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const colClass =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="group rounded-xl border border-border bg-card p-5 hover:border-[#15803D]/50 hover:shadow-md transition-all duration-200"
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#15803D]/10 text-[#15803D] group-hover:bg-[#15803D] group-hover:text-white transition-colors duration-200">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      ))}
    </div>
  );
}
