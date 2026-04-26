import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/services/web-hosting', label: 'Hosting' },
  { href: '/services/domains', label: 'Domains' },
  { href: '/services/managed-lms', label: 'LMS' },
  { href: '/services/ai-solutions', label: 'AI Solutions' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>HO</span>
          <span className={styles.logoText}>HostingOcean</span>
          <span className={styles.logoBadge}>Solutions</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="https://app.hostingocean.com/login" className={styles.btnGhost}>
            Log in
          </Link>
          <Link href="https://app.hostingocean.com/signup" className={styles.btnPrimary}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
