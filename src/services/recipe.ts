import type { BrowseRecipe } from '../views/Browse/interfaces/BrowseRecipe';
import { beUrl } from '../utils/beUrl';

export const getPaginatedRecipes = async (
  newPage: number,
  itemQuantity: number,
  withUserContent: boolean,
): Promise<BrowseRecipe[]> => {
  try {
    if (withUserContent) {
      const res = await fetch(
        `${beUrl}/recipes?page=${newPage}&quantity=${itemQuantity}&withUserContent='true'`,
      );
      return await res.json();
    }
    const res = await fetch(
      `${beUrl}/recipes?page=${newPage}&quantity=${itemQuantity}`,
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    // typescript requires that a function return a value at every possible point or it's type must include undefined
    // this throwing of the error up the chain allows us to static type the response of getPaginatedRecipes.
    throw error;
  }
};

export const getRecipeById = async (id: any) => {
  try {
    //staging url
    const res = await fetch(`${beUrl}/recipes/${id}`);

    //local url
    // const res = await fetch(`${DEV_URL}/${id}`);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
