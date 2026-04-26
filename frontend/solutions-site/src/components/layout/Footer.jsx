import Link from 'next/link';
import styles from './Footer.module.css';

const columns = [
  {
    heading: 'Products',
    links: [
      { href: '/services/domains', label: 'Domain Registration' },
      { href: '/services/web-hosting', label: 'Shared Hosting' },
      { href: '/services/vps', label: 'VPS Hosting' },
      { href: '/services/ssl', label: 'SSL Certificates' },
      { href: '/services/email', label: 'Business Email' },
      { href: '/services/managed-lms', label: 'Managed LMS' },
      { href: '/services/ai-solutions', label: 'AI Solutions' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { href: '/docs', label: 'Documentation' },
      { href: '/status', label: 'System Status' },
      { href: '/contact', label: 'Contact Us' },
      { href: 'https://app.hostingocean.com', label: 'Control Panel' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/terms', label: 'Terms of Service' },
      { href: '/legal/privacy', label: 'Privacy Policy' },
      { href: '/legal/cookies', label: 'Cookie Policy' },
      { href: '/legal/acceptable-use', label: 'Acceptable Use' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>HO</span>
            <span className={styles.logoText}>HostingOcean</span>
          </Link>
          <p className={styles.tagline}>
            Professional hosting infrastructure for everyone — from personal blogs to enterprise platforms.
          </p>
        </div>

        <nav className={styles.columns} aria-label="Footer navigation">
          {columns.map((col) => (
            <div key={col.heading} className={styles.column}>
              <h3 className={styles.columnHeading}>{col.heading}</h3>
              <ul className={styles.columnLinks}>
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={styles.link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} HostingOcean Solutions. All rights reserved.
          </p>
          <p className={styles.uptime}>
            <span className={styles.uptimeDot} />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
