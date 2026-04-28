import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PortfolioProject } from '@/lib/portfolio';
import { CATEGORY_STYLES } from '@/lib/portfolio';

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const styles = CATEGORY_STYLES[project.category];
  const extraTech = project.technologies.length - 5;

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <div className="h-full flex flex-col rounded-2xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Category colour strip */}
        <div className={`h-1 w-full shrink-0 ${styles?.cardStrip ?? 'bg-[#2563EB]'}`} />

        <div className="flex flex-col flex-1 p-6">
          {/* Category badge + industry */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <span
              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${styles?.badge ?? 'bg-muted text-muted-foreground'}`}
            >
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground text-right leading-snug">{project.industry}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-snug mb-3 group-hover:text-[#2563EB] transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* First 2 outcomes */}
          <ul className="space-y-1.5 mb-4">
            {project.outcomes.slice(0, 2).map((outcome) => (
              <li key={outcome} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground leading-snug">{outcome}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                +{extraTech} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:gap-3 transition-all duration-200">
            View case study <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
