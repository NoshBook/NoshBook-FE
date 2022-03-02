import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../../components/Recipe/RecipeForm';
import { useAuth } from '../../context/AuthContext';
import { getRecipeById, postRecipe, updateRecipeById } from '../../services/recipe';

export interface RecipeCreateEditProps {
  isCreating?: boolean
}

export default function RecipeCreateEdit({ isCreating }: RecipeCreateEditProps = { isCreating: false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    (async () => {
      if(!isCreating) {
        try {
          const recipeData = await getRecipeById(id);
          setRecipe(recipeData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          window.alert('AHHHHHHH'); // TODO: a more useful dialog
        }
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (recipeData: any) => {
    try {
      if(isCreating) {
        const { id } = await postRecipe(recipeData);
        navigate(`/recipes/${id}`);
      } else {
        await updateRecipeById(id, recipeData);
        navigate(`/recipes/${id}`);
      }
    } catch (error) {
      console.log(error);
      window.alert('AHHHHHHH'); // TODO: a more useful dialog
    }
  };

  if(loading) return <h2>Loading...</h2>;
  return <RecipeForm initialFormState={recipe} handleSubmit={handleSubmit} />;
}
