import { ShoppingItemProps } from './shoppingListTypes';
import styles from './ShoppingList.module.css';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

export default function ShoppingItem({ item, setChecked }: ShoppingItemProps) {
  return (
    <div className={styles.item}>
      <button
        title="checkbox"
        aria-label={`${
          item.ingredient
        } isChecked: ${item.isChecked.toString()}`}
        className={styles.shoppingcheckbutton}
        onClick={() => setChecked(item.id, !item.isChecked)}
      >
        {item.isChecked ? (
          <MdCheckBox size={20} />
        ) : (
          <MdCheckBoxOutlineBlank size={20} />
        )}
      </button>
      {item.ingredient}
    </div>
  );
}
