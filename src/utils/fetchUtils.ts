export const getRecipes = async () => {
  try {
    const res = await fetch(
      'https://noshbook-staging.herokuapp.com/api/v1/recipes'
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
