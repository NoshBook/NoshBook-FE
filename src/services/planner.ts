const PLANNER_URL = 'https://noshbook-staging.herokuapp.com/api/v1/planners';

export const getPlannerRecipes = async () => {
  try {
    const res = await fetch(PLANNER_URL, { credentials: 'include' });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
