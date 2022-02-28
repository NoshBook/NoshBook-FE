import { beUrl } from '../../utils/beUrl';

export async function insertRecipeIntoCookbook(
  recipeId: string,
  userId: string,
) {
  try {
    const res = await fetch(`${beUrl}/cookbooks/add`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ recipeId, userId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCookbook(id: string) {
  try {
    const res = await fetch(`${beUrl}/cookbooks/${id}`, {
      credentials: 'include',
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function removeRecipeFromCookbook(recipeId: string) {
  try {
    const res = await fetch(`${beUrl}/cookbooks/delete/${recipeId}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
