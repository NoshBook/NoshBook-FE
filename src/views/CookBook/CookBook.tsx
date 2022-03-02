import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useAuth } from '../../context/AuthContext';
import { getUserCookbook } from '../../services/cookbook/cookbook';
import { removeRecipeFromCookbook } from '../../services/cookbook/cookbook';
import { addPlannerRecipe } from '../../services/planner';
import { useNavigate } from 'react-router-dom';

export default function CookBook() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCookbookRecipes() {
      const userCookbook = await getUserCookbook(user.id);
      console.log(userCookbook);
      if (userCookbook) setRecipes(userCookbook);
    }
    setIsLoading(true);
    fetchCookbookRecipes();
    setIsLoading(false);
  }, []);

  const handleRemoveRecipeFromCookbook = async (id: string) => {
    await removeRecipeFromCookbook(id);
    await getUserCookbook(user.id);
    const newUserCookbook = await getUserCookbook(user.id);
    setRecipes(newUserCookbook);
  };

  const handleAddToPlanner = async (day: string, recipeId: string) => {
    const recipeIdNumber = Number(recipeId);
    await addPlannerRecipe({ recipeId: recipeIdNumber, day });
  };

  return (
    <main>
      {isLoading ? (
        'Loading...'
      ) : recipes.length ? (
        <ul>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <RecipeCard
                recipe={recipe}
                isCookbookView={true}
                handleRemoveFromCookbookClick={handleRemoveRecipeFromCookbook}
                handleAddToPlannerClick={handleAddToPlanner}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Recipes to render</h2>
      )}
    </main>
  );
}
