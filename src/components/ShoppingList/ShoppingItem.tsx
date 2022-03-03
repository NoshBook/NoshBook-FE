import { ShoppingItemProps } from "./shoppingListTypes";

export default function ShoppingItem({ item, setChecked }: ShoppingItemProps) {
  return (
    <div>
      {item.ingredient} isChecked: {item.isChecked.toString()}
      <button onClick={() => setChecked(item.id, !item.isChecked)}>✔</button>
    </div>
  );
}
