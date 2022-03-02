import { beUrl } from '../utils/beUrl.js';

const orderShoppingList = async (jsonList: any) => {
  const list = await jsonList.json();

  const compareIds = (a: any, b: any) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  };

  const orderedList = list.sort(compareIds);
  return orderedList;
};

const getShoppingList = async () => {
  const res = await fetch(`${beUrl}/shoppinglist`, { credentials: 'include' });
  return await orderShoppingList(res);
};

// Important! This replaces the existing shopping list if one exists.
const generateShoppingList = async () => {
  const res = await fetch(`${beUrl}/shoppinglist/new`, {
    credentials: 'include',
  });

  return await orderShoppingList(res);
};

const putCheckedValue = async (id: string, isChecked: boolean) => {
  const res = await fetch(`${beUrl}/shoppinglist/item/${id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isChecked }),
  });
  return await orderShoppingList(res);
};

export { getShoppingList, generateShoppingList, putCheckedValue };
