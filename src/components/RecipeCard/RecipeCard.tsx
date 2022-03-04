import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import DaysMenu from '../DaysMenu/DaysMenu';
import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import { motion } from 'framer-motion';

import {
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineMinusCircle,
} from 'react-icons/ai';

interface RecipeCardProps {
  recipe: BrowseRecipe;
  isCookbookView?: boolean;
  plannerToggle?: boolean;
  setPlannerToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromCookbookClick?: (id: string) => void;
  handleAddToPlannerClick?: (day: string, recipeId: string) => void;
}

export default function RecipeCard({
  recipe,
  isCookbookView,
  handleRemoveFromCookbookClick,
  handleAddToPlannerClick,
}: RecipeCardProps) {
  const [plannerToggle, setPlannerToggle] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { name, rating, image, description } = recipe;
  return (
    <article className={styles.container}>
      <h2 className={styles.cardh2}>{name}</h2>

      <Rating
        initialValue={rating * 20}
        ratingValue={rating * 20}
        size={25}
        readonly
      />

      {isCookbookView && (
        <section aria-label="Recipe Options" className={styles.cookbookbuttons}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            aria-label="Remove recipe from cookbook."
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromCookbookClick?.(recipe.id);
            }}
          >
            <AiOutlineMinusCircle color={'var(--orange)'} />
            Cookbook
          </motion.button>
          <div className={styles.daysmenucontainer}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              aria-label="Toggles planner options display."
              aria-pressed={plannerToggle}
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
              <AiOutlinePlusCircle color={'var(--blue)'} /> Planner
            </motion.button>

            {plannerToggle && (
              <DaysMenu
                handleAddToPlanner={handleAddToPlannerClick}
                recipeId={recipe.id}
                setPlannerToggle={setPlannerToggle}
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            aria-label="Edit Recipe. Redirects to new page."
            onClick={(e) => {
              e.stopPropagation();
              // may need to be updated after create/edit is pushed
              navigate(`/recipes/edit/${recipe.id}`);
            }}
          >
            <AiOutlineEdit color={'var(--blue)'} /> Edit
          </motion.button>
        </section>
      )}

      <img className={styles.cardimg} src={image} alt={name} />

      <p
        className={
          description?.length < 200
            ? styles.cardp
            : styles.cardpsmalldescription
        }
      >
        {description}
      </p>
    </article>
  );
}
