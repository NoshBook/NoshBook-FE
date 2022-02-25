// import { useState } from 'react';
import usePagination from '../../hooks/usePagination';

export default function RecipeList() {
  // const [searchResults, setSearchResults] = useState<any>([]);
  // const [searchInput, setSearchInput] = useState<any>('');
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  // const [list, setList] = useState(
  //   searchResults ? searchResults : currentPageData
  // );

  // const searchItems = (query: string) => {
  //   setSearchInput(query.toLowerCase());
  //   const results = currentPageData.filter((recipe: any) => {
  //     const name = recipe.name.toLowerCase();
  //     return name.includes(query);
  //   });
  //   setSearchResults(results);
  //   setList(results);
  // };

  return (
    <div>
      <h1>Recipes</h1>
      {/* <form>
        <label htmlFor="search-items"></label>
        <input
          id="search-items"
          type="text"
          name="search-items"
          value={searchInput}
          autoComplete="off"
          onChange={({ target }) => searchItems(target.value)}
        />
      </form> */}
      {currentPageData.map((recipe: any) => {
        return (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        );
      })}
      <article>
        <button onClick={prevPage} disabled={currentPage === 1}>
          prev page
        </button>
        <button onClick={nextPage} disabled={currentPageData.length < 20}>
          next page
        </button>
      </article>
    </div>
  );
}
