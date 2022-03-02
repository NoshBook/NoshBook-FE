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
        <RecipeList currentPageData={currentPageData} />
      </section>
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
