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
    <main>
      <section>
        <button onClick={() => navigate('/shopping')}>Shopping List</button>
      </section>
      <section>
        <button onClick={() => setShowOptions(!showOptions)}>
          Random Recipe
        </button>
        {showOptions && <DaysMenu handleAddToPlanner={handleAddToPlanner} />}
      </section>
      <section>
        <button onClick={handleClear}>Reset</button>
      </section>
      <section>
        {loading ? (
          <h1>...LOADING</h1>
        ) : (
          <PlannerList days={days} handleDelete={handleDelete} />
        )}
      </section>
    </main>
  );
}
