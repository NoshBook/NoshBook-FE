import { useEffect, useState } from 'react';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import { generateShoppingList, getShoppingList, putCheckedValue } from '../../utils/shoppinglistUtils';

export default function ShoppingListView() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await getShoppingList();
      setItems(items);
      setIsLoading(false);
    })()
  }, [])

  async function getNewShoppingList() {
    setIsLoading(true);
    const list = await generateShoppingList();
    setItems(list);
    setIsLoading(false);
  }

  async function setChecked(id: string, isChecked: boolean) {
    const list = await putCheckedValue(id, isChecked);
    setItems(list);
  }

  if(isLoading) return <h2>Loading...</h2>

  return (
    <div>
      <div>ShoppingList</div>
      <button onClick={getNewShoppingList}>Generate</button>
      <div>
        <ShoppingList items={items} setChecked={setChecked} />
      </div>
    </div>
  )
}
