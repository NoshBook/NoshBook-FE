import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import { Rating } from 'react-simple-star-rating';

interface RecipeCardProps {
  recipe: BrowseRecipe;
  isCookbookView?: boolean;
  handleAddToCookbookClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipe: BrowseRecipe,
  ) => void;
  handleRemoveFromCookbookClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void;
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
}: RecipeCardProps) {
  const { user } = useAuth();
  const { name, rating, image, description } = recipe;
  return (
    <article>
      <h2>{name}</h2>

      <Rating initialValue={rating * 20} ratingValue={rating * 20} readonly />

      <p>Rating: {rating}</p>

      <section aria-label="Recipe Options">
        {isCookbookView ? (
          <button
            onClick={(e) => handleRemoveFromCookbookClick?.(e, recipe.id)}
          >
            ➖
          </button>
        ) : (
          <button
            onClick={(e) => handleAddToCookbookClick?.(e, recipe)}
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
        )}
      </section>

      <img src={image} alt={name} />

      <p>{description}</p>
    </article>
  );
}
