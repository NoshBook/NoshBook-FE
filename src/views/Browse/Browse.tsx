import RecipeList from '../../components/RecipeList/RecipeList';
import { useAuth } from '../../context/AuthContext';
import usePagination from '../../hooks/usePagination';
import { BrowseRecipe } from './interfaces/BrowseRecipe';
import { insertRecipeIntoCookbook } from '../../services/cookbook/cookbook';
import Switch from 'react-switch';

// toggle on page
// pull in a setUserPreference fn

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  const { user, updateUserPreference } = useAuth();

  async function handleAddRecipeToCookbook(recipe: BrowseRecipe) {
    const { id, name } = recipe;
    const response = await insertRecipeIntoCookbook(id, user.id);
    if (response.message === 'Recipe already exists in user cookbook.') {
      window.alert(response.message);
    } else {
      window.alert(`${name} added to your cookbook!`);
    }
  }

  return (
    <main>
      <article
        title={
          user.id
            ? 'Click to toggle user content'
            : 'Login to toggle user content'
        }
      >
        <p>Show User Content:</p>
        <Switch
          checked={user.showUserContent}
          onChange={updateUserPreference}
          disabled={user.id ? false : true}
        />
      </article>
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
