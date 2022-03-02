import { Link } from 'react-router-dom';
import { RecipesByDayType, RecipeType } from './plannerTypes';
import styles from './PlannerDay.module.css';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { fadeinVariants } from '../../utils/variants';

export default function PlannerDay({
  day,
  handleDelete,
}: {
  day: RecipesByDayType;
  handleDelete: any;
}): JSX.Element {
  return (
    <motion.div
      variants={fadeinVariants}
      initial={'initial'}
      animate={'animate'}
      whileHover={{ scale: 1.02 }}
      className={styles.container}
    >
      <h2>{day.day}</h2>
      {day.recipes.map((recipe: RecipeType, index: number): JSX.Element => {
        return (
          <div className={styles.recipes} key={index}>
            <AiOutlineMinusCircle
              onClick={() => handleDelete(recipe.id)}
              style={{
                cursor: 'pointer',
                color: 'var(--orange)',
                minWidth: '30',
              }}
            />
            <Link to={`/recipes/${recipe.recipeId}`}>{recipe.name}</Link>
          </div>
        );
      })}
    </motion.div>
  );
}
