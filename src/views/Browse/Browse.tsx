import RecipeList from '../../components/RecipeList/RecipeList';
import { useAuth } from '../../context/AuthContext';
import usePagination from '../../hooks/usePagination';
import Switch from 'react-switch';
import styles from './Browse.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';

// toggle on page
// pull in a setUserPreference fn

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  const { user, updateUserPreference } = useAuth();

  return (
    <motion.main
      className={styles.container}
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
    >
      <div
        className={styles.contenttoggle}
        title={
          user.id
            ? 'Click to toggle user content'
            : 'Login to toggle user content'
        }
      >
        <p>Show User Recipes</p>
        <Switch
          height={20}
          width={40}
          handleDiameter={20}
          onColor={'#FF4C29'}
          checked={user.showUserContent}
          onChange={updateUserPreference}
          disabled={user.id ? false : true}
        />
      </div>
      <section className={styles.listcontainer}>
        <RecipeList currentPageData={currentPageData} />
      </section>
      <section aria-label="Pagination Options">
        <button onClick={prevPage} disabled={currentPage === 1}>
          prev page
        </button>
        <button onClick={nextPage} disabled={currentPageData.length < 20}>
          next page
        </button>
      </section>
    </motion.main>
  );
}
