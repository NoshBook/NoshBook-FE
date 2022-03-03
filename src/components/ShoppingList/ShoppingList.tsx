import ShoppingItem from './ShoppingItem';
import { IShoppingItem, ShoppingListProps } from './shoppingListTypes';
import styles from './ShoppingList.module.css';

export default function ShoppingList({
  items = [],
  setChecked,
}: ShoppingListProps) {
  return (
    <div className={styles.list}>
      {items.map((item: IShoppingItem) => (
        <ShoppingItem item={item} key={item.id} setChecked={setChecked} />
      ))}
    </div>
  );
}
