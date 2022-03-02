import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import styles from './Header.module.css';
export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.navarea}>
        <Nav />
      </div>
    </header>
  );
}
