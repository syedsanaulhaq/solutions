import Link from 'next/link';
import styles from './ServicesGrid.module.css';

export default function ServicesGrid({ services }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>Our Services</h2>
          <p className={styles.subheading}>
            Everything you need to build, grow, and manage your online presence — from a single platform.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={styles.card}>
              <span className={styles.cardIcon} aria-hidden="true">{service.icon}</span>
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.cardTagline}>{service.tagline}</p>
              <ul className={styles.cardFeatures}>
                {service.highlights.map((f) => (
                  <li key={f} className={styles.cardFeature}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className={styles.cardCta}>Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
