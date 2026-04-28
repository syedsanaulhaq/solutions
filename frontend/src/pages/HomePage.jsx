import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Welcome to HostingOcean</h1>
      <p className={styles.subheading}>
        Fast, reliable, and secure web hosting for everyone.
      </p>
    </section>
  );
}
