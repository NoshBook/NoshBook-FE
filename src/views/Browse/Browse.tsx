import RecipeList from '../../components/RecipeList/RecipeList';
import { useAuth } from '../../context/AuthContext';
import usePagination from '../../hooks/usePagination';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import styles from './Browse.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants, leftslideinVariants } from '../../utils/variants';
import { useEffect, useState } from 'react';

// Update: usePagination hook now offers a isLoading value.

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [searchNow, setSearchNow] = useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState(0);
  const { nextPage, prevPage, currentPageData, currentPage, isLoading } =
    usePagination(20, false, debouncedSearchQuery);
  const { user, updateUserPreference } = useAuth();

  useEffect(() => {
    window.clearTimeout(timeoutHandle);
    const handle = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    setTimeoutHandle(handle);
  }, [searchQuery]);

  return (
    <>
      {isLoading ? (
        <div className="authcontextloading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <motion.main
          className={styles.container}
          variants={upfadeinVariants}
          initial={'initial'}
          animate={'animate'}
        >
          <motion.div
            className={styles.welcome}
            variants={leftslideinVariants}
            initial={'initial'}
            animate={'animate'}
          >
            <h3>
              Welcome to NoshBook: your one-stop shop for collecting recipes,
              planning meals, and creating shopping lists.{' '}
            </h3>
            <p>
              Start by searching for recipes! Add them to your{' '}
              <Link to="/cookbook">cookbook</Link> so you can save and edit
              them. Then add recipes to your <Link to="/planner">planner</Link>{' '}
              to get a handy <Link to="/shopping">shopping list</Link>.{' '}
            </p>
          </motion.div>
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
            <RecipeList
              currentPageData={currentPageData}
              searchQuery={searchQuery}
              isCookbookView={false}
              setSearchQuery={setSearchQuery}
            />
          </section>
          <section
            aria-label="Pagination Options"
            className={styles.pagbuttons}
          >
            <button onClick={prevPage} disabled={currentPage === 1}>
              prev page
            </button>
            <button onClick={nextPage} disabled={currentPageData.length < 20}>
              next page
            </button>
          </section>
        </motion.main>
      )}
    </>
  );
}
