import { Link } from 'react-router-dom';
import { RecipesByDayType, RecipeType } from './plannerTypes';
import styles from './PlannerDay.module.css';

export default function PlannerDay({
  day,
  handleDelete,
}: {
  day: RecipesByDayType;
  handleDelete: any;
}): JSX.Element {
  return (
    <div className={styles.container}>
      <h2>{day.day}</h2>
      {day.recipes.map((recipe: RecipeType, index: number): JSX.Element => {
        return (
          <div className={styles.recipes} key={index}>
            <button onClick={() => handleDelete(recipe.id)}>x</button>
            <Link to={`/recipes/${recipe.recipeId}`}>{recipe.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
