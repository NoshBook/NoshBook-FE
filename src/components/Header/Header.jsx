import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import styles from './Header.module.css';
import { motion } from 'framer-motion';
import { downfadeinVariants } from '../../utils/variants';
export default function Header() {
  return (
    <motion.header
      className={styles.header}
      variants={downfadeinVariants}
      initial={'initial'}
      animate={'animate'}
    >
      <Logo />
      <div className={styles.navarea}>
        <Nav />
      </div>
    </motion.header>
  );
}
