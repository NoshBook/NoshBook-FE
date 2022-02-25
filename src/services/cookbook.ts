// export placeRecipeInCookBook
export async function insertRecipeIntoCookbook(recipeId: string) {
  try {
    const res = await fetch(
      `https://noshbook-staging.herokuapp.com/api/v1/cookbook`,
      {
        method: 'POST',
        body: JSON.stringify({ id: recipeId }),
      }
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
