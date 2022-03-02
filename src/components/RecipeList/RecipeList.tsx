/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';

interface RecipeListProps {
  currentPageData: Array<any>;
  isCookbookView?: boolean;
  plannerToggle?: boolean;
  setPlannerToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromCookbookClick?: (id: string) => void;
  handleAddToPlannerClick?: (day: string, recipeId: string) => void;
}

export default function RecipeList({
  currentPageData,
  isCookbookView,
  handleRemoveFromCookbookClick,
  handleAddToPlannerClick,
}: RecipeListProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

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
              {isCookbookView ? (
                <RecipeCard
                  recipe={recipe}
                  isCookbookView={true}
                  handleRemoveFromCookbookClick={handleRemoveFromCookbookClick}
                  handleAddToPlannerClick={handleAddToPlannerClick}
                />
              ) : (
                <RecipeCard recipe={recipe} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
