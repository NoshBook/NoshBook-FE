import RecipeList from '../../components/RecipeList/RecipeList';
import { useAuth } from '../../context/AuthContext';
import usePagination from '../../hooks/usePagination';
import { BrowseRecipe } from '../../interfaces/BrowseRecipe';
import { insertRecipeIntoCookbook } from '../../services/cookbook/cookbook';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  const { user } = useAuth();

  // ✔ if user is logged out, prompt them to login.
  // if user is logged in, and the recipe doesn't already exist, add to DB and on success prompt them of the success.
  // if user is logged in, and the recipe does already exist, prompt the user that the recipe is already in their cookbook.
  async function handleAddRecipeToCookbook(recipe: BrowseRecipe) {
    if (user) {
      try {
        const { id, name } = recipe;
        console.log(user);
        const addRecipeResponse = await insertRecipeIntoCookbook(id, user.id);
        if (addRecipeResponse.id) {
          window.alert(`${name} added to your cookbook!`);
        } else {
          console.log(addRecipeResponse);
        }
      } catch (error: any) {
        console.log(error);
      }
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
