import { type ReactNode } from 'react';

interface ProcessStep {
  step: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export function ServiceProcess({
  steps,
  title = 'How the project works',
  subtitle,
}: ServiceProcessProps) {
  return (
    <div>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-7 top-0 bottom-0 w-px bg-[#2563EB]/20 hidden md:block" />
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.step} className="relative flex gap-6 md:gap-8">
              <div className="shrink-0 flex flex-col items-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20">
                  {step.icon}
                </div>
              </div>
              <div className="flex-1 pb-6 pt-2">
                <span className="text-xs font-bold text-[#2563EB] tracking-widest uppercase block mb-2">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
