import NavList from './NavList';
import styles from './Nav.module.css';
import { FiMenu } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { useState } from 'react';

export default function MobileMenu() {
  const [menuToggle, setMenuToggle] = useState(false);

  const hamburgerIcon = (
    <FiMenu
      className={styles.hamburgericon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  const closeIcon = (
    <GrFormClose
      className={styles.closeicon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  return (
    <nav className={styles.mobilemenu}>
      {menuToggle ? closeIcon : hamburgerIcon}
      {menuToggle && <NavList />}
    </nav>
  );
}
