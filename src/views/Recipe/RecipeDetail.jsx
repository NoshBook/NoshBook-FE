import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import { getRecipeById } from '../../services/recipe';

export default function RecipeDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      const response = await getRecipeById(id);
      setRecipe(response);
      setLoading(false);
    };
    loadRecipe();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {recipe && <Recipe {...recipe} />}
    </div>
  );
}
