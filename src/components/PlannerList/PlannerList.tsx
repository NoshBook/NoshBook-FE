import PlannerDay from './PlannerDay';
import { RecipesByDayType } from './plannerTypes';

export default function PlannerList({
  days,
}: {
  days: RecipesByDayType[];
}): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!days[0].day ? (
        <h1>No Recipes To Display</h1>
      ) : (
        days.map(
          (day: RecipesByDayType, index: number): JSX.Element => (
            <PlannerDay {...day} key={index} />
          )
        )
      )}
    </div>
  );
}
