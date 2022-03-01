import styles from './DaysMenu.module.css';
export default function DaysMenu({ handleAddToPlanner }) {
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
            onClick={() => handleAddToPlanner(day)}
          >
            {day}
          </li>
        );
      })}
    </ul>
  );
}
