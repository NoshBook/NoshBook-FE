import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BrowseRecipe } from '../../interfaces/BrowseRecipe';
import StarRatings from 'react-star-ratings';
import { useAuth } from '../../context/AuthContext';

interface RecipeListProps {
  currentPageData: Array<any>;
  handleAddRecipeToCookbook: (recipe: BrowseRecipe) => Promise<void>;
}

export default function RecipeList({
  currentPageData,
  handleAddRecipeToCookbook,
}: RecipeListProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipe: BrowseRecipe
  ) {
    e.stopPropagation();
    handleAddRecipeToCookbook(recipe);
  }

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
      <ul>
        {currentPageData.map((recipe: any) => {
          return (
            <li
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <h2>{recipe.name}</h2>
              <StarRatings
                rating={recipe.rating}
                starRatedColor="blue"
                numberOfStars={5}
                starDimension="15px"
                starSpacing="2px"
                name="rating"
              />
              <p>{recipe.description}</p>
              {/* if rendering in cookbook view, this button should remove a recipe from the cookbook */}
              <button
                onClick={(e) => handleClick(e, recipe)}
                // --- Can be removed
                disabled={!user.id}
                title={
                  user.id
                    ? 'Click to add Recipe to your Cookbook'
                    : 'Login to add Recipes to your Cookbook'
                }
                // ---
              >
                Add Recipe to Cookbook
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
