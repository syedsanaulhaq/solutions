import { Outlet, NavLink } from 'react-router-dom';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.logo}>
            HostingOcean
          </NavLink>
          <nav className={styles.nav}>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>
              Home
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} HostingOcean. All rights reserved.</p>
      </footer>
    </div>
  );
}
