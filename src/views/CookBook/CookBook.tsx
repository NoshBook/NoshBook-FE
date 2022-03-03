import React from 'react';
import { removeRecipeFromCookbook } from '../../services/cookbook/cookbook';
import { addPlannerRecipe } from '../../services/planner';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';

export default function CookBook() {
  const navigate = useNavigate();
  const {
    nextPage,
    prevPage,
    currentPageData,
    currentPage,
    isLoading,
    fetchCookbookRecipeData,
  } = usePagination(20, true);

  const handleRemoveRecipeFromCookbook = async (id: string) => {
    await removeRecipeFromCookbook(id);
    fetchCookbookRecipeData();
  };

  const handleAddToPlanner = async (day: string, recipeId: string) => {
    const recipeIdNumber = Number(recipeId);
    await addPlannerRecipe({ recipeId: recipeIdNumber, day });
  };

  return (
    <main>
      {isLoading ? (
        'Loading...'
      ) : currentPageData.length ? (
        <>
          <button onClick={() => navigate('/recipes/new')}>
            Create New Recipe
          </button>
          <section aria-label="Recipe list.">
            <RecipeList
              currentPageData={currentPageData}
              isCookbookView={true}
              handleRemoveFromCookbookClick={handleRemoveRecipeFromCookbook}
              handleAddToPlannerClick={handleAddToPlanner}
            />
          </section>
        </>
      ) : (
        <h2>No Recipes to render</h2>
      )}
      <section aria-label="Pagination Options">
        <button onClick={prevPage} disabled={currentPage === 1}>
          prev page
        </button>
        <button onClick={nextPage} disabled={currentPageData.length < 20}>
          next page
        </button>
      </section>
    </main>
  );
}
