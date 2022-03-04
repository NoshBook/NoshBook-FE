import { useEffect, useState } from 'react';
import PlannerList from '../../components/PlannerList/PlannerList';
import {
  addPlannerRecipe,
  clearPlannerRecipes,
  deletePlannerRecipe,
  getPlannerRecipes,
  getRandomRecipe,
} from '../../services/planner';
import { RecipesByDayType } from '../../components/PlannerList/plannerTypes';
import DaysMenu from '../../components/DaysMenu/DaysMenu';
import { useNavigate } from 'react-router-dom';
import styles from './Planner.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';

export default function Planner(): JSX.Element {
  const [days, setDays] = useState<RecipesByDayType[]>([
    { day: null, recipes: [{ id: null, recipeId: null, name: null }] },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getFreshDays();
  }, []);

  const getFreshDays = async (): Promise<void> => {
    setLoading(true);
    const res = await getPlannerRecipes();
    if (res?.length) {
      setDays([...res]);
    }
    setLoading(false);
  };

  const handleClear = async (): Promise<void> => {
    setDays([
      { day: null, recipes: [{ id: null, recipeId: null, name: null }] },
    ]);
    await clearPlannerRecipes();
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deletePlannerRecipe(id);
    const res = await getPlannerRecipes();

    if (res?.length) {
      setDays([...res]);
    } else {
      setDays([
        { day: null, recipes: [{ id: null, recipeId: null, name: null }] },
      ]);
    }
  };

  const handleAddToPlanner = async (day: any) => {
    let newRecipe = await getUniqueRandomRecipe(10);

    if (!newRecipe) {
      newRecipe = { id: 171, name: 'Sriracha Nacho Cheese Sauce' };
    }

    await addPlannerRecipe({ recipeId: newRecipe.id, day });
    getFreshDays();
  };

  const getUniqueRandomRecipe: any = async (counter = 10) => {
    if (!counter) return null;
    const res = await getRandomRecipe();
    const allPlannerRecipeIds = days
      .map(({ recipes }) => recipes)
      .flatMap((recipe) => recipe)
      .map((recipe) => recipe.recipeId);

    const alreadyExists = !!allPlannerRecipeIds.find(
      (existingId) => existingId === Number(res.id),
    );

    // try 10 (or specified) times to get a unique recipe
    return alreadyExists ? getUniqueRandomRecipe(counter - 1) : res;
  };

  return (
    <motion.main
      className={styles.container}
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
    >
      <h2>Planner</h2>
      <section className={styles.buttoncontainer}>
        <motion.button
          aria-label="shopping list"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/shopping')}
        >
          Shopping List
        </motion.button>
        <div className={styles.daysmenucontainer}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowOptions(!showOptions)}
          >
            Random Recipe
          </motion.button>
          {showOptions && (
            <span className={styles.daysmenuspan}>
              <DaysMenu
                setPlannerToggle={setShowOptions}
                handleAddToPlanner={handleAddToPlanner}
              />
            </span>
          )}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} onClick={handleClear}>
          Reset
        </motion.button>
      </section>
      <section>
        {loading ? (
          <div className="authcontextloading">
            <h2>Loading...</h2>
          </div>
        ) : (
          <PlannerList days={days} handleDelete={handleDelete} />
        )}
      </section>
    </motion.main>
  );
}
