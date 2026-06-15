import { ArrowRight, Server, Layout, Code2 } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Web Hosting',
    description:
      'Reliable hosting solutions for business websites that need stability, speed, and support. Free SSL, daily backups, and expert help whenever you need it.',
    href: '/web-hosting',
  },
  {
    icon: Layout,
    title: 'Web Portals',
    description:
      'Professional web portals for organisations, teams, and businesses that want better digital access and workflow. We build portals that actually get used.',
    href: '/contact',
  },
  {
    icon: Code2,
    title: 'Custom Development',
    description:
      'Tailored web systems and applications built around your business needs, processes, and goals — not generic templates. We build for the long term.',
    href: '/contact',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Custom solutions, not one-size-fits-all. We work with your business to deliver
            what you actually need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description, href }) => (
            <div
              key={title}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:border-[#15803D]/50 hover:shadow-lg hover:shadow-[#15803D]/5 transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#15803D]/10 text-[#15803D] mb-6">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
              <a
                href={href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#15803D] hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
