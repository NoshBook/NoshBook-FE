import { useState } from 'react';

interface RecipeListProps {
  nextPage: () => void;
  prevPage: () => void;
  currentPageData: Array<any>;
  currentPage: number;
}

export default function RecipeList({
  nextPage,
  prevPage,
  currentPageData,
  currentPage,
}: RecipeListProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <div>
      <h1>Recipes</h1>
      <form>
        <label htmlFor="search-items"></label>
        <input
          id="search-items"
          type="text"
          name="search-items"
          value={searchInput}
          autoComplete="off"
          onChange={({ target }) => setSearchInput(target.value)}
        />
      </form>
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
