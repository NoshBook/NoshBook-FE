import { useEffect, useState } from 'react';
import PlannerList from '../../components/PlannerList/PlannerList';
import {
  addPlannerRecipe,
  clearPlannerRecipes,
  getPlannerRecipes,
} from '../../services/planner';
import { RecipesByDayType } from '../../components/PlannerList/plannerTypes';

export default function Planner(): JSX.Element {
  const [days, setDays] = useState<RecipesByDayType[]>([
    { day: null, recipes: [{ id: null, name: null }] },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFreshDays = async (): Promise<void> => {
      const res = await getPlannerRecipes();

      setDays([...res]);
      setLoading(false);
    };

    getFreshDays();
  }, []);

  const handleClear = async (): Promise<void> => {
    setDays([{ day: null, recipes: [{ id: 0, name: null }] }]);
    await clearPlannerRecipes();
  };

  /* add fake recipes for planner testing during development until recipe detail add option is built */
  const handleAdd = async (): Promise<void> => {
    await addPlannerRecipe({ recipeId: 5, day: 'tuesday' });
    const res = await getPlannerRecipes();

    setDays([...res]);
  };

  return (
    <main>
      <section>
        <button onClick={handleAdd}>Add Fake Recipe</button>
        <button onClick={handleClear}>Reset</button>
      </section>
      <section>
        {loading ? <h1>...LOADING</h1> : <PlannerList days={days} />}
      </section>
    </main>
  );
}
