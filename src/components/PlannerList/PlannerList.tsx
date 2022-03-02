import PlannerDay from './PlannerDay';
import { RecipesByDayType } from './plannerTypes';
import styles from './PlannerList.module.css';
export default function PlannerList({
  days,
  handleDelete,
}: {
  days: RecipesByDayType[];
  handleDelete: any;
}): JSX.Element {
  return (
    <div className={styles.container}>
      {!days[0].day ? (
        <h1>No Recipes To Display</h1>
      ) : (
        days.map(
          (day: RecipesByDayType, index: number): JSX.Element => (
            <PlannerDay day={day} handleDelete={handleDelete} key={index} />
          ),
        )
      )}
    </div>
  );
}
