const URL = 'https://noshbook-staging.herokuapp.com/api/v1/users';

// get user currently logged in
export const getUser = async () => {
  try {
    const res = await fetch(`${URL}/me`, { credentials: 'include' });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// log user in
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

// sign up user
export const signUp = async (username, password) => {
  const res = await fetch(URL, {
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

// log out user
export const logOut = async () => {
  const res = await fetch(`${URL}/sessions`, {
    credentials: 'include',
    method: 'DELETE',
  });
  return res.json();
};