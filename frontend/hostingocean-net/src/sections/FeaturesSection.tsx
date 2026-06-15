import { ArrowRight, Server, Layout, Code2 } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Web Hosting',
    tagline: 'For businesses that need their website online and reliable.',
    bullets: [
      'Shared & business hosting',
      'Email hosting',
      'Free SSL on every plan',
      'Daily backups & 24/7 support',
    ],
    href: '/web-hosting',
  },
  {
    icon: Layout,
    title: 'Web Portals',
    tagline: 'Login-based systems built for your team, clients, or students.',
    bullets: [
      'Client & customer portals',
      'School & student portals',
      'Employee & staff portals',
      'Booking & support portals',
    ],
    href: 'https://solutions.hostingocean.net/services/web-portals',
    external: true,
  },
  {
    icon: Code2,
    title: 'Custom Development',
    tagline: 'Tailored web systems built around how your business actually works.',
    bullets: [
      'Admin dashboards & CRM systems',
      'Booking & inventory systems',
      'Business workflow automation',
      'Integrations & internal tools',
    ],
    href: 'https://solutions.hostingocean.net/services',
    external: true,
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
            Three focused services. Each one built around what your business actually needs —
            not generic packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, tagline, bullets, href, external }) => (
            <div
              key={title}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:border-[#15803D]/50 hover:shadow-lg hover:shadow-[#15803D]/5 transition-all duration-200 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#15803D]/10 text-[#15803D] mb-6">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{tagline}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#15803D] hover:gap-2 transition-all mt-auto"
              >
                {title === 'Web Hosting' ? 'View hosting plans' : 'Explore solutions'}{' '}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
