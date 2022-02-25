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

// export placeRecipeInCookBook
// discuss with team, should this go in cookbook.ts on the frontend,  and the cookbook route/model in the backend?
