import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';

interface RecipeCardProps {
  recipe: BrowseRecipe; // '| alternative type'
  handleOptionsClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipe: BrowseRecipe,
  ) => void; // '| alternative type'
}

// Initial thoughts on reusability:
//  1. Dropdown menu with actions
//      - on click of options button, a dropdown menu appears with the available options
//      - this component would need to recieve in an array of objects containing a button title and corelating function(handlers for each recipe option)
//      - the passed function array would be mapped into buttons in the dropdown menu

export default function RecipeCard({
  recipe,
  handleOptionsClick,
}: RecipeCardProps) {
  const { user } = useAuth();

  return (
    <article>
      <h2>{recipe.name}</h2>
      {/* Later: Implement cool rating package D is working with */}
      <button
        onClick={(e) => handleOptionsClick(e, recipe)}
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
      <p>Rating: {recipe.rating}</p>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
    </article>
  );
}
