import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services';
import styles from './page.module.css';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <div className={styles.page}>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/services" className={styles.breadcrumb}>← All Services</Link>
          <div className={styles.heroContent}>
            <span className={styles.icon}>{service.icon}</span>
            <div>
              <p className={styles.group}>{service.group}</p>
              <h1 className={styles.heading}>{service.name}</h1>
              <p className={styles.tagline}>{service.tagline}</p>
            </div>
          </div>
          <div className={styles.heroActions}>
            <Link href="https://app.hostingocean.com/signup" className={styles.btnPrimary}>
              Get started
            </Link>
            <Link href="/contact" className={styles.btnOutline}>
              Talk to sales
            </Link>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <section className={styles.descSection}>
            <h2 className={styles.sectionHeading}>Overview</h2>
            <p className={styles.description}>{service.description}</p>
          </section>

          <section className={styles.featuresSection}>
            <h2 className={styles.sectionHeading}>What&apos;s included</h2>
            <ul className={styles.features}>
              {service.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
