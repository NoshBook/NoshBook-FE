import NavList from './NavList';
import styles from './Nav.module.css';

export default function DesktopMenu() {
  return (
    <nav className={styles.desktopmenu}>
      <NavList />
    </nav>
  );
}
