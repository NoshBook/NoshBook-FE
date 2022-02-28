import { Link } from 'react-router-dom';
import { RecipesByDayType, RecipeType } from './plannerTypes';

export default function PlannerDay({
  day,
  handleDelete,
}: {
  day: RecipesByDayType;
  handleDelete: any;
}): JSX.Element {
  return (
    <div
      style={{
        border: 'coral solid .5vw',
        borderRadius: '1vw',
        width: '30vw',
      }}
    >
      <h1 style={{ textTransform: 'uppercase', color: 'coral' }}>{day.day}</h1>
      {day.recipes.map((recipe: RecipeType, index: number): JSX.Element => {
        return (
          <div key={index}>
            <Link to={`/recipes/${recipe.recipeId}`}>{recipe.name}</Link>
            <button onClick={() => handleDelete(recipe.id)}>x</button>
          </div>
        );
      })}
    </div>
  );
}
