/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import StarRatings from 'react-star-ratings';
import { useAuth } from '../../context/AuthContext';
import RecipeCard from '../RecipeCard/RecipeCard';

interface RecipeListProps {
  currentPageData: Array<any>;
  handleAddRecipeToCookbook: (recipe: BrowseRecipe) => Promise<void>;
}

export default function RecipeList({
  currentPageData,
  handleAddRecipeToCookbook,
}: RecipeListProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleOptionsClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipe: BrowseRecipe,
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
              <RecipeCard
                recipe={recipe}
                handleOptionsClick={handleOptionsClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
