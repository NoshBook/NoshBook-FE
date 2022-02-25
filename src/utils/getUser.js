const URL = 'http://localhost:3000/api/v1/users';

export const getUser = async () => {
  try {
    const res = await fetch(`${URL}/me`, { credentials: 'include' });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const logIn = async (username, password) => {
  const res = await fetch(`${URL}/sessions`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
