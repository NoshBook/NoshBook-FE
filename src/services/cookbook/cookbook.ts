import { beUrl } from "../../utils/beUrl";

export async function insertRecipeIntoCookbook(
  recipeId: string,
  userId: string,
) {
  try {
    const res = await fetch(`${beUrl}/cookbooks/add`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ recipeId, userId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
