import styles from './DaysMenu.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { fadeinVariants } from '../../utils/variants';

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
    <motion.ul
      className={styles.daysmenu}
      variants={fadeinVariants}
      initial={'initial'}
      animate={'animate'}
    >
      {days.map((day, index) => {
        return (
          <li
            className={styles.dayli}
            key={index}
            aria-label={day}
            onClick={async (e) => {
              e.stopPropagation();
              await handleAddToPlanner(day, recipeId);
              // if a setPlannerToggle is passed, call it and reverse it's state.
              setPlannerToggle?.((prevState: boolean) => !prevState);
            }}
          >
            <AiOutlinePlusCircle />
            {day}
          </li>
        );
      })}
    </motion.ul>
  );
}
