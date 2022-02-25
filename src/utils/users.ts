import request from 'superagent';

const URL = 'http://localhost:3000/api/v1/users';

//create user
export const signUp = async (username: string, password: string) => {
  try {
    const res: any = await request.post(URL).send({ username, password });
    return res.body;
  } catch (error) {
    console.error(error);
  }
};

//log user in
export const logIn = async (username: string, password: string) => {
  const res: any = await request
    .post(`${URL}/sessions`)
    .send({ username, password });
  return res.body;
};

//get user currently logged in
// export const getUser = async () => {
//   try {
//     const res: any = await request.get(`${URL}/me`, { credentials: 'include' });
//     return res.body;
//   } catch (error) {
//     console.error(error);
//   }
// };

//log out user
export const logOut = async () => {
  try {
    const res: any = await request.delete(`${URL}/sessions`);
    return res.body;
  } catch (error) {
    console.error(error);
  }
};
