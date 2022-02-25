import { useState } from 'react';

interface RecipeListProps {
  currentPageData: Array<any>;
  // add handleclick fn type
  handleAddRecipeToCookbook: (id: string) => Promise<void>;
}

// add handleClick fn to props for recipe->cookbook button
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
            {/* if rendering in browse view...*/}
            {/*   - if user is logged in, this button should add a recipe to the cookbook  */}
            {/*   - if user is not logged in, this button should add prompt the user to log in */}
            {/* if rendering in cookbook view, this button should remove a recipe from the cookbook */}
            {/* button */}
            <button onClick={() => handleAddRecipeToCookbook(recipe.id)}>
              Add Recipe to Cookbook
            </button>
          </div>
        );
      })}
    </div>
  );
}
