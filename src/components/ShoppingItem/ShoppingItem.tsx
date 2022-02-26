
interface IShoppingItem {
  id: string,
  ingredient: string,
  isChecked: boolean
}

interface ShoppingItemProps {
  item: IShoppingItem,
  setChecked: (id: string, isChecked: boolean) => any 
}

export default function ShoppingItem({ item, setChecked }: ShoppingItemProps) {
  return (
    <div>
      {item.ingredient} isChecked: {item.isChecked.toString()}
      <button onClick={() => setChecked(item.id, !item.isChecked)}>✔</button>  
    </div>
  )
}

export type { IShoppingItem }
