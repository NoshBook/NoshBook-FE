export const getPaginatedRecipes = async (
  newPage: number,
  itemQuantity: number
) => {
  try {
    const res = await fetch(
      `https://noshbook-staging.herokuapp.com/api/v1/recipes?page=${newPage}&quantity=${itemQuantity}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
