/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import styles from './RecipeList.module.css';
import { motion } from 'framer-motion';

interface RecipeListProps {
  currentPageData: Array<any>;
  isCookbookView: boolean;
  plannerToggle?: boolean;
  searchQuery?: string,
  setPlannerToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromCookbookClick?: (id: string) => void;
  handleAddToPlannerClick?: (day: string, recipeId: string) => void;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export default function RecipeList({
  currentPageData,
  isCookbookView,
  searchQuery,
  setSearchQuery,
  handleRemoveFromCookbookClick,
  handleAddToPlannerClick,
}: RecipeListProps) {
  const navigate = useNavigate();

  const handleSearchInputChange = (value: string) => {
    if(setSearchQuery) setSearchQuery(value)
  }

  return (
    <div className={styles.container}>
      <h1>Recipes</h1>
      <div className={styles.search}>
        <div>
          <label htmlFor="search-items"></label>
          <input
            id="search-items"
            type="text"
            name="search-items"
            value={searchQuery}
            autoComplete="off"
            onChange={({ target }) => handleSearchInputChange(target.value)}
          />
        </div>
      </div>
      <ul className={styles.listcontainer}>
        {currentPageData.map((recipe: any) => {
          const path = isCookbookView ? 'cookbook' : 'recipes';
          return (
            <motion.li
              whileHover={{ scale: 1.02 }}
              key={recipe.id}
              onClick={() => navigate(`/${path}/${recipe.id}`)}
            >
              {isCookbookView ? (
                <RecipeCard
                  recipe={recipe}
                  isCookbookView={isCookbookView}
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
