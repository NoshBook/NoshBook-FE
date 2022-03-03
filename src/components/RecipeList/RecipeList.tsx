/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import styles from './RecipeList.module.css';
import { motion } from 'framer-motion';

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
    <div className={styles.container}>
      <h1>Recipes</h1>
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
            <motion.li
              whileHover={{ scale: 1.02 }}
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
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
