import { beUrl } from '../utils/beUrl';

export const getPlannerRecipes = async () => {
  try {
    const res = await fetch(`${beUrl}/planners`, { credentials: 'include' });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const clearPlannerRecipes = async () => {
  try {
    const res = await fetch(`${beUrl}/planners/delete`, {
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
    const res = await fetch(`${beUrl}/planners`, {
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

export const deletePlannerRecipe = async (id: number) => {
  try {
    const res = await fetch(`${beUrl}/planners/delete/${id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const getRandomRecipe = async () => {
  try {
    const res = await fetch(`${beUrl}/planners/random`, {
      credentials: 'include',
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
