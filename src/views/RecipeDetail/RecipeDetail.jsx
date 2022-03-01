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

export default function RecipeDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [added, setAdded] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipe = async () => {
      const response = await getRecipeById(id);
      setRecipe(response);
      setUserRating(response.rating);
      setLoading(false);
    };
    loadRecipe();
  }, [id]);

  useEffect(() => {
    const isRecipeInCookbook = async () => {
      const response = await getUserCookbook(user.id);
      const recipeIds = response.map((entry) => entry.recipeId);
      setAdded(recipeIds.includes(id));
    };
    isRecipeInCookbook();
  }, [id]);

  const handleAddRecipeToCookbook = async (id, name) => {
    if (user.id) {
      const response = await insertRecipeIntoCookbook(id, user.id);
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {recipe && (
        <Recipe
          {...recipe}
          handleRecipe={
            added ? handleRemoveRecipeFromCookbook : handleAddRecipeToCookbook
          }
          addOrRemove={added ? 'Remove from Cookbook' : 'Add to Cookbook'}
          handleRating={handleRating}
          userRating={userRating}
        />
      )}
    </div>
  );
}
