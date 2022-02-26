import RecipeList from '../../components/RecipeList/RecipeList';
import { useAuth } from '../../context/AuthContext';
import usePagination from '../../hooks/usePagination';
import { BrowseRecipe } from '../../interfaces/BrowseRecipe';
import { insertRecipeIntoCookbook } from '../../services/cookbook/cookbook';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  const { user } = useAuth();

  async function handleAddRecipeToCookbook(recipe: BrowseRecipe) {
    if (user) {
      const { id, name } = recipe;
      await insertRecipeIntoCookbook(id);
      window.alert(`${name} added to your cookbook!`);
    } else {
      // could be a redirect if desired
      window.alert('Login to add recipes to your cookbook!');
    }
  }

  return (
    <main>
      <section>
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
