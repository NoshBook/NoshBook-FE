import styles from './Logo.module.css';
import { ImSpoonKnife } from 'react-icons/im';
import { Link } from 'react-router-dom';
export default function Logo() {
  return (
    <Link to="/" className={styles.container}>
      <ImSpoonKnife className={styles.utensils} size={25} />
      <h1>NoshBook</h1>
    </Link>
  );
}
