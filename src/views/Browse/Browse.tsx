import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  return (
    <main>
      <section>
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
