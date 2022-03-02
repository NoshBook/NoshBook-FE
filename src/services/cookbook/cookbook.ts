import { beUrl } from '../../utils/beUrl';
import { BrowseRecipe } from '../../views/Browse/interfaces/BrowseRecipe';

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

export const getPaginatedCookbookRecipes = async (
  newPage: number,
  itemQuantity: number,
): Promise<BrowseRecipe[]> => {
  try {
    const res = await fetch(
      `${beUrl}/cookbooks/pagination?page=${newPage}&quantity=${itemQuantity}`,
    );
    return await res.json();
  } catch (error) {
    console.log(error);
    // typescript requires that a function return a value at every possible point or it's type must include undefined
    // this throwing of the error up the chain allows us to static type the response of getPaginatedRecipes.
    throw error;
  }
};
