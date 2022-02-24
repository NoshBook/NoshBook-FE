export const getRecipes = async () => {
  try {
    const res = await fetch(`${process.env.RECIPE_URL}`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getPaginatedRecipes = async (
  newPage: number,
  itemQuantity: number
) => {
  try {
    const res = await fetch(
      `${process.env.RECIPE_URL}?page=${newPage}&quantity=${itemQuantity}`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
