import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';
import { BrowseRecipe } from '../../interfaces/BrowseRecipe';
import { insertRecipeIntoCookbook } from '../../services/cookbook/cookbook';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);

  // declare handleClick fn for recipe->cookbook
  async function handleAddRecipeToCookbook(recipe: BrowseRecipe) {
    const { id, name } = recipe;
    await insertRecipeIntoCookbook(id);
    window.alert(`${name} added to your cookbook!`);
  }

  return (
    <main>
      <section>
        {/* pass new handleClick fn as prop to RecipeList */}
        <RecipeList
          currentPageData={currentPageData}
          handleAddRecipeToCookbook={handleAddRecipeToCookbook}
        />
      </section>
      <section>
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
