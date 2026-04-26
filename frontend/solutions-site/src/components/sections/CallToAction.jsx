import Link from 'next/link';
import styles from './CallToAction.module.css';

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Ready to get started?</h2>
        <p className={styles.subheading}>
          Join thousands of businesses running on HostingOcean Solutions.
          No setup fees. Cancel any time.
        </p>
        <div className={styles.actions}>
          <Link href="https://app.hostingocean.com/signup" className={styles.btnPrimary}>
            Create free account
          </Link>
          <Link href="/contact" className={styles.btnGhost}>
            Talk to sales
          </Link>
        </div>
      </div>
    </section>
  );
}
