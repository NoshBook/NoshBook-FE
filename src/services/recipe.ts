interface Recipe {
  description: string;
  id: string;
  image: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  name: string;
  rating: number;
  servings: string;
  tags: Array<string>;
  totalTime: string;
}

export const getPaginatedRecipes = async (
  newPage: number,
  itemQuantity: number
): Promise<Recipe[]> => {
  try {
    const res = await fetch(
      `https://noshbook-staging.herokuapp.com/api/v1/recipes?page=${newPage}&quantity=${itemQuantity}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    // typescript requires that a function return a value at every possible point or it's type must include undefined
    // this throwing of the error up the chain allows us to static type the response of getPaginatedRecipes.
    throw error;
  }
};
