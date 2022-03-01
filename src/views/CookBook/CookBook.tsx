import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useAuth } from '../../context/AuthContext';
import { getUserCookbook } from '../../services/cookbook/cookbook';

export default function CookBook() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  function handleOptionsClick() {
    return;
  }

  return (
    <main>
      {isLoading ? (
        'Loading...'
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                handleOptionsClick={handleOptionsClick}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
