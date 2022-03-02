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
        <h2>No recipes here yet!</h2>
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
