import { Link } from 'react-router-dom';
import { RecipesByDayType, RecipeType } from './plannerTypes';

export default function PlannerDay({
  day,
  recipes,
}: RecipesByDayType): JSX.Element {
  return (
    <div
      style={{
        border: 'coral solid .5vw',
        borderRadius: '1vw',
        width: '30vw',
      }}
    >
      <h1 style={{ textTransform: 'uppercase', color: 'coral' }}>{day}</h1>
      {recipes.map((recipe: RecipeType, index: number): JSX.Element => {
        return (
          <Link to={`/recipes/${recipe.id}`} key={index}>
            {recipe.name}
          </Link>
        );
      })}
    </div>
  );
}
