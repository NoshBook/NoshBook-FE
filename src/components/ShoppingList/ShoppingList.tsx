import ShoppingItem, { IShoppingItem } from "../ShoppingItem/ShoppingItem";

interface ShoppingListProps {
  items: IShoppingItem[];
  setChecked: (id: string, checked: boolean) => any;
}

export default function ShoppingList({ items = [], setChecked }: ShoppingListProps) {
  console.log(items);
  return (
    <div>
    {items.map((item:IShoppingItem) => <ShoppingItem item={item} key={item.id} setChecked={setChecked} />)}
    </div>
  )
}
