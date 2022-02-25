export const getRecipes = async () => {
  try {
    const res = await fetch(
      'http://localhost:3000/api/v1/recipes'
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
