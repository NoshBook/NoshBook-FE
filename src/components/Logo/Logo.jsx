import styles from './Logo.module.css';
import { ImSpoonKnife } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeindelayVariants } from '../../utils/variants';

export default function Logo() {
  return (
    <motion.div
      variants={fadeindelayVariants}
      initial={'initial'}
      animate={'animate'}
    >
      <Link to="/" className={styles.container}>
        <ImSpoonKnife className={styles.utensils} size={25} />
        <h1>NoshBook</h1>
      </Link>
    </motion.div>
  );
}
