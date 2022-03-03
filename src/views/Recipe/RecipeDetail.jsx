import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import { useAuth } from '../../context/AuthContext';
import { getRecipeById, submitRating } from '../../services/recipe';
import {
  getUserCookbook,
  insertRecipeIntoCookbook,
  removeRecipeFromCookbook,
} from '../../services/cookbook/cookbook';
import { addPlannerRecipe } from '../../services/planner';

export default function RecipeDetail({ isCookbookView }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [added, setAdded] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [plannerToggle, setPlannerToggle] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipe = async () => {
      const response = await getRecipeById(id);
      setRecipe(response);
      setUserRating(response.rating);
      const cookbookResponse = await getUserCookbook(user.id);
      if (cookbookResponse) {
        const recipeIds = cookbookResponse.map((entry) => entry.id);
        setAdded(recipeIds.includes(id));
      } else {
        setAdded(false);
      }
      setLoading(false);
    };
    loadRecipe();
  }, [id]);

  useEffect(() => {
    if (added !== null) {
      setLoading(false);
    }
  }, [added]);

  const handleAddRecipeToCookbook = async (id, name) => {
    if (user.id) {
      const response = await insertRecipeIntoCookbook(id);
      if (response.message === 'Recipe already exists in user cookbook.') {
        window.alert(response.message);
      } else {
        window.alert(`${name} added to your cookbook!`);
        setAdded(true);
      }
    } else {
      // could be a redirect if desired
      window.alert('Login to add recipes to your cookbook!');
    }
  };

  const handleRemoveRecipeFromCookbook = async (id, name) => {
    await removeRecipeFromCookbook(id);
    window.alert(`${name} removed from cookbook!`);
    setAdded(false);
  };

  const handleRating = async (rate) => {
    await submitRating(id, rate / 20);
  };

  const handleAddToPlanner = async (day, recipeId) => {
    await addPlannerRecipe({ recipeId, day });
    setPlannerToggle(!plannerToggle);
  };

  return (
    <div>
      {loading && (
        <div className="authcontextloading">
          <h2>Loading...</h2>
        </div>
      )}
      {recipe && (
        <Recipe
          {...recipe}
          handleRecipe={
            added ? handleRemoveRecipeFromCookbook : handleAddRecipeToCookbook
          }
          isCookbookView={isCookbookView}
          addOrRemove={
            added === null
              ? 'null'
              : added
              ? 'Remove from Cookbook'
              : 'Add to Cookbook'
          }
          handleRating={handleRating}
          userRating={userRating}
          plannerToggle={plannerToggle}
          setPlannerToggle={setPlannerToggle}
          handleAddToPlanner={handleAddToPlanner}
          added={added}
        />
      )}
    </div>
  );
}
