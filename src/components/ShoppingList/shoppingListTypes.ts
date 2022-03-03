export interface ShoppingListProps {
  items: IShoppingItem[];
  setChecked: (id: string, checked: boolean) => any;
}

export interface IShoppingItem {
  id: string;
  ingredient: string;
  isChecked: boolean;
}

export interface ShoppingItemProps {
  item: IShoppingItem;
  setChecked: (id: string, isChecked: boolean) => any;
}
