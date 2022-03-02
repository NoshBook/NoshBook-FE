import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import DaysMenu from '../DaysMenu/DaysMenu';

interface RecipeCardProps {
  recipe: BrowseRecipe;
  isCookbookView?: boolean;
  plannerToggle?: boolean;
  setPlannerToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCookbookClick?: (recipe: BrowseRecipe) => void;
  handleRemoveFromCookbookClick?: (id: string) => void;
  handleAddToPlannerClick?: (day: string, recipeId: string) => void;
}

// Initial thoughts on reusability:
//  1. Dropdown menu with actions
//      - on click of options button, a dropdown menu appears with the available options
//      - this component would need to recieve in an array of objects containing a button title and corelating function(handlers for each recipe option)
//      - the passed function array would be mapped into buttons in the dropdown menu

export default function RecipeCard({
  recipe,
  handleAddToCookbookClick,
  handleRemoveFromCookbookClick,
  isCookbookView,
  handleAddToPlannerClick,
}: RecipeCardProps) {
  const [plannerToggle, setPlannerToggle] = useState(false);
  const { user } = useAuth();
  const { name, rating, image, description } = recipe;
  return (
    <article>
      <h2>{name}</h2>

      <Rating initialValue={rating * 20} ratingValue={rating * 20} readonly />

      <p>Rating: {rating}</p>

      <section aria-label="Recipe Options">
        {isCookbookView ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCookbookClick?.(recipe.id);
              }}
            >
              Remove From Cookbook
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlannerToggle((prevState) => !prevState);
              }}
              disabled={user.id ? false : true}
              // --- Can be removed
              title={
                user.id
                  ? 'Click to interact with recipe options'
                  : 'Login to interact with recipe options'
              }
              // ---
            >
              Add to planner
            </button>
            {plannerToggle && (
              <DaysMenu
                handleAddToPlanner={handleAddToPlannerClick}
                recipeId={recipe.id}
                setPlannerToggle={setPlannerToggle}
              />
            )}
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCookbookClick?.(recipe);
              }}
              disabled={user.id ? false : true}
              // --- Can be removed
              title={
                user.id
                  ? 'Click to interact with recipe options'
                  : 'Login to interact with recipe options'
              }
              // ---
            >
              ➕
            </button>
          </>
        )}
      </section>

      <img src={image} alt={name} />

      <p>{description}</p>
    </article>
  );
}
