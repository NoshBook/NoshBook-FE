import { useState } from 'react';
import type { BrowseRecipe } from '../../interfaces/BrowseRecipe';

interface RecipeListProps {
  currentPageData: Array<any>;
  handleAddRecipeToCookbook: (recipe: BrowseRecipe) => Promise<void>;
}

export default function RecipeList({
  currentPageData,
  handleAddRecipeToCookbook,
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
            {/* if rendering in cookbook view, this button should remove a recipe from the cookbook */}
            <button onClick={() => handleAddRecipeToCookbook(recipe)}>
              Add Recipe to Cookbook
            </button>
          </div>
        );
      })}
    </div>
  );
}
