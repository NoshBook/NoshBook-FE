const url = 'https://noshbook-staging.herokuapp.com/api/v1'

const getShoppingList = async () => {
  const res = await fetch(`${url}/shoppinglist`, { credentials: 'include' })
  return await res.json();
}

// Important! This replaces the existing shopping list if one exists.
const generateShoppingList = async () => {
  const res = await fetch(`${url}/shoppinglist/new`, { credentials: 'include' })
  return await res.json();
}

const putCheckedValue = async (id: string, isChecked: boolean) => {
  const res = await fetch(`${url}/shoppinglist/item/${id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isChecked }),
  })
  return await res.json();
}

export { getShoppingList, generateShoppingList, putCheckedValue }
