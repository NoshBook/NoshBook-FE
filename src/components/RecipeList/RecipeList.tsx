import { useState } from 'react';

interface RecipeListProps {
  currentPageData: Array<any>;
}

export default function RecipeList({ currentPageData }: RecipeListProps) {
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
    </div>
  );
}
