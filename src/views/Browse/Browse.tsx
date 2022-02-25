import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);

  // declare handleClick fn for recipe->cookbook

  return (
    <main>
      <section>
        {/* pass new handleClick fn as prop to RecipeList */}
        <RecipeList currentPageData={currentPageData} />
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
