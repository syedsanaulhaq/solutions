import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AWS-backed infrastructure · 99.9% uptime SLA
        </div>

        <h1 className={styles.heading}>
          Everything you need to{' '}
          <span className={styles.headingAccent}>launch, host & grow</span>{' '}
          online
        </h1>

        <p className={styles.subheading}>
          HostingOcean Solutions delivers professional web hosting, domain registration,
          managed LMS, business email, and AI-powered services — all from one platform,
          on enterprise-grade AWS infrastructure.
        </p>

        <div className={styles.actions}>
          <Link href="https://app.hostingocean.com/signup" className={styles.btnPrimary}>
            Get started free
          </Link>
          <Link href="/services" className={styles.btnOutline}>
            Explore services
          </Link>
        </div>

        <div className={styles.stats}>
          {[
            { value: '10,000+', label: 'Active customers' },
            { value: '500+', label: 'TLDs supported' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '24/7', label: 'Expert support' },
          ].map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
