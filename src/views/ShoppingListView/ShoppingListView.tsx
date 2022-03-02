import { useEffect, useState } from 'react';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import { IShoppingItem } from '../../components/ShoppingList/shoppingListTypes';
import addTotals from '../../utils/addTotalsToList';
import {
  generateShoppingList,
  getShoppingList,
  putCheckedValue,
} from '../../services/shoppinglist';

export default function ShoppingListView() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await getShoppingList();
      setItems(items);

      setSearchItems(items);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!searchTerm) {
        setSearchItems(items);
      } else {
        const newSearch = items.filter((item: IShoppingItem) =>
          item.ingredient.includes(searchTerm),
        );
        setSearchItems(newSearch);
      }
    })();
  }, [searchTerm]);

  async function getNewShoppingList() {
    setIsLoading(true);
    const list = await generateShoppingList();
    setItems(list);
    setSearchItems(list);
    setIsLoading(false);
  }

  async function setChecked(id: string, isChecked: boolean) {
    const list = await putCheckedValue(id, isChecked);
    setItems(list);
    const newSearch = list.filter((item: IShoppingItem) =>
      item.ingredient.includes(searchTerm),
    );
    setSearchItems(newSearch);
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <div>ShoppingList</div>
      <button onClick={getNewShoppingList}>Generate New List</button>
      <div>
        <label>
          Search
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </label>
      </div>
      <section>
        {addTotals(searchItems).map((group: any, i) => {
          return (
            <div key={i}>
              <ShoppingList
                items={group.slice(0, -1)}
                setChecked={setChecked}
              />
              <div>{group[group.length - 1].total}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
