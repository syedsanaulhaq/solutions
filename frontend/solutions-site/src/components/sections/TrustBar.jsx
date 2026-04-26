import styles from './TrustBar.module.css';

const trustItems = [
  { icon: '🔒', label: 'SSL on every plan' },
  { icon: '☁️', label: 'AWS infrastructure' },
  { icon: '📞', label: '24/7 support' },
  { icon: '💾', label: 'Daily backups' },
  { icon: '🌍', label: 'Multi-region' },
  { icon: '🛡️', label: 'DDoS protection' },
];

export default function TrustBar() {
  return (
    <section className={styles.trustBar} aria-label="Platform highlights">
      <div className={styles.inner}>
        {trustItems.map(({ icon, label }) => (
          <div key={label} className={styles.item}>
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
