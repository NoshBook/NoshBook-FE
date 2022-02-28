const URL = 'https://noshbook-staging.herokuapp.com/api/v1/planners';

export const getPlannerRecipes = async () => {
  try {
    const res = await fetch(URL, { credentials: 'include' });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const clearPlannerRecipes = async () => {
  try {
    const res = await fetch(`${URL}/clear`, {
      credentials: 'include',
      method: 'DELETE',
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const addPlannerRecipe = async ({
  recipeId,
  day,
}: {
  recipeId: number;
  day: string;
}) => {
  try {
    const res = await fetch(URL, {
      credentials: 'include',
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId,
        day,
      }),
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
