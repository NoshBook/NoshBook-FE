import styles from './DaysMenu.module.css';

interface DaysMenuProps {
  handleAddToPlanner: any;
  recipeId?: any;
  setPlannerToggle?: any;
}

export default function DaysMenu({
  handleAddToPlanner,
  recipeId,
  setPlannerToggle,
}: DaysMenuProps) {
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  return (
    <ul className={styles.daysmenu}>
      {days.map((day, index) => {
        return (
          <li
            key={index}
            aria-label={day}
            onClick={async (e) => {
              e.stopPropagation();
              await handleAddToPlanner(day, recipeId);
              // if a setPlannerToggle is passed, call it and reverse it's state.
              setPlannerToggle?.((prevState: boolean) => !prevState);
            }}
          >
            {day}
          </li>
        );
      })}
    </ul>
  );
}
