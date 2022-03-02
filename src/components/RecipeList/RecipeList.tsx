/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

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

  function handleOptionsClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipe: BrowseRecipe,
  ) {
    e.stopPropagation();
    handleAddRecipeToCookbook(recipe);
  }

  return (
    <div className={styles.container}>
      <h2>Browse Recipes</h2>

      <div className={styles.search}>
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
      </div>

      <ul className={styles.listcontainer}>
        {currentPageData.map((recipe: any) => {
          return (
            <li
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <RecipeCard
                recipe={recipe}
                handleAddToCookbookClick={handleOptionsClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
