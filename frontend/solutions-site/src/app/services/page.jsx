import Link from 'next/link';
import { getAllServices } from '@/lib/services';
import styles from './page.module.css';

export const metadata = {
  title: 'Services',
  description: 'Explore the full HostingOcean Solutions service catalogue — domains, hosting, SSL, email, managed LMS, and AI.',
};

export default function ServicesPage() {
  const services = getAllServices();

  const groups = services.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>All Services</h1>
          <p className={styles.subheading}>
            Seven product lines. One platform. Full API access.
          </p>
        </div>
      </header>

      <div className={styles.content}>
        {Object.entries(groups).map(([group, items]) => (
          <section key={group} className={styles.group}>
            <h2 className={styles.groupHeading}>{group}</h2>
            <div className={styles.grid}>
              {items.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className={styles.card}>
                  <span className={styles.icon}>{service.icon}</span>
                  <div>
                    <h3 className={styles.cardTitle}>{service.name}</h3>
                    <p className={styles.cardTagline}>{service.tagline}</p>
                  </div>
                  <span className={styles.arrow}>→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
