import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  badge?: string;
}

export function ServiceCard({ icon, title, description, features, href, badge }: ServiceCardProps) {
  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60 dark:bg-slate-900/50">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20">
            {icon}
          </div>
          {badge && (
            <Badge className="bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl group-hover:text-[#2563EB] transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-5">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all duration-200 mt-2"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
