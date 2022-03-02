import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useAuth } from '../../context/AuthContext';
import { getUserCookbook } from '../../services/cookbook/cookbook';
import { removeRecipeFromCookbook } from '../../services/cookbook/cookbook';
import styles from './CookBook.module.css';

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

  const handleRemoveRecipeFromCookbook = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    await removeRecipeFromCookbook(id);
    await getUserCookbook(user.id);
    const newUserCookbook = await getUserCookbook(user.id);
    setRecipes(newUserCookbook);
  };

  return (
    <main className={styles.container}>
      <h2>Cookbook</h2>
      {isLoading && <p>Loading...</p>}
      {recipes.length ? (
        <ul className={styles.listcontainer}>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                isCookbookView={true}
                handleRemoveFromCookbookClick={handleRemoveRecipeFromCookbook}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes here yet!</p>
      )}
    </main>
  );
}
