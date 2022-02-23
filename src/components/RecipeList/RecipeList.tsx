import { useState, useEffect } from 'react';
import { getRecipes } from '../../utils/fetchUtils';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    const getAllRecipes = async () => {
      const res = await getRecipes();
      setRecipes(res);
    };
    getAllRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe: any) => {
        return (
          <>
            <h2 key={recipe.id}>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </>
        );
      })}
    </div>
  );
}
