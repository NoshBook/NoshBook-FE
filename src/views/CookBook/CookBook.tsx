import { removeRecipeFromCookbook } from '../../services/cookbook/cookbook';
import { addPlannerRecipe } from '../../services/planner';
import { useNavigate, Link } from 'react-router-dom';
import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';
import styles from './CookBook.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';

export default function CookBook() {
  const navigate = useNavigate();
  const {
    nextPage,
    prevPage,
    currentPageData,
    currentPage,
    isLoading,
    fetchCookbookRecipeData,
  } = usePagination(20, true);

  const handleRemoveRecipeFromCookbook = async (id: string) => {
    await removeRecipeFromCookbook(id);
    fetchCookbookRecipeData();
  };

  const handleAddToPlanner = async (day: string, recipeId: string) => {
    const recipeIdNumber = Number(recipeId);
    await addPlannerRecipe({ recipeId: recipeIdNumber, day });
  };

  return (
    <motion.main
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
      className={styles.container}
    >
      <h2>Cookbook</h2>
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate('/recipes/new')}
      >
        Create new recipe
      </motion.button>
      {isLoading ? (
        <div className="authcontextloading">
          <h2>Loading...</h2>
        </div>
      ) : currentPageData.length ? (
        <>
          <section aria-label="Recipe list">
            <RecipeList
              currentPageData={currentPageData}
              isCookbookView={true}
              handleRemoveFromCookbookClick={handleRemoveRecipeFromCookbook}
              handleAddToPlannerClick={handleAddToPlanner}
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
        </>
      ) : (
        <h3>
          No recipes to here yet! <Link to="/">Add some</Link>.
        </h3>
      )}
    </motion.main>
  );
}
