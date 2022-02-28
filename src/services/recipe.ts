const STAGING_URL = 'https://noshbook-staging.herokuapp.com/api/v1/recipes';
// const DEV_URL = 'http://localhost:7890/api/v1/recipes';

export const getPaginatedRecipes = async (
  newPage: number,
  itemQuantity: number,
) => {
  try {
    const res = await fetch(
      `${STAGING_URL}?page=${newPage}&quantity=${itemQuantity}`,
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
    const res = await fetch(`${STAGING_URL}/${id}`);

    //local url
    // const res = await fetch(`${DEV_URL}/${id}`);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
