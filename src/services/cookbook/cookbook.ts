const DEV_URL = `http://localhost:7890/api/v1/cookbooks/add`;
// const STAGING_URL = `https://noshbook-staging.herokuapp.com/api/v1/cookbooks/add`;

export async function insertRecipeIntoCookbook(
  recipeId: string,
  userId: string
) {
  console.log(recipeId);
  const res = await fetch(`${DEV_URL}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ recipeId, userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
