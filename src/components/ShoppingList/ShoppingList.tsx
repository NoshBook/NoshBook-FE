import ShoppingItem from './ShoppingItem';
import { IShoppingItem, ShoppingListProps } from './shoppingListTypes';

export default function ShoppingList({
  items = [],
  setChecked,
}: ShoppingListProps) {
  console.log(items);
  return (
    <div>
      {items.map((item: IShoppingItem) => (
        <ShoppingItem item={item} key={item.id} setChecked={setChecked} />
      ))}
    </div>
  );
}
