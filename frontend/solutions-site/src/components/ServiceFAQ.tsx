import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function ServiceFAQ({
  items,
  title = 'Frequently asked questions',
  subtitle,
}: ServiceFAQProps) {
  return (
    <div>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-xl border border-border/60 bg-background shadow-sm overflow-hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-semibold text-sm select-none list-none [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-5 pt-1">
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
