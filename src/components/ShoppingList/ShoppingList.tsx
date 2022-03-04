import ShoppingItem from './ShoppingItem';
import { IShoppingItem, ShoppingListProps } from './shoppingListTypes';
import styles from './ShoppingList.module.css';

import FlipMove from 'react-flip-move';

export default function ShoppingList({
  items = [],
  setChecked,
}: ShoppingListProps) {
  return (
    <div className={styles.list}>
      <FlipMove>
        {items.map((item: IShoppingItem) => (
          <div key={item.id}>
            <ShoppingItem item={item} key={item.id} setChecked={setChecked} />
          </div>
        ))}
      </FlipMove>
    </div>
  );
}
