import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import styles from './Nav.module.css';
export default function Nav() {
  return (
    <div className={styles.nav}>
      <DesktopMenu />
      <MobileMenu />
    </div>
  );
}
