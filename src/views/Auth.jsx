import { useState } from 'react';
import { getUser, logIn, signUp } from '../utils/users';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setFormError('');
    try {
      if (password.length < 8) {
        setFormError('Password must be at least 8 characters long.');
        throw new Error();
      }
      const res = await signUp(username, password);
      //if sign up is successful, log user in and redirect home
      if (res.id) {
        await logIn(username, password);
        setUser(res.username);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormError('');
    try {
      const res = await logIn(username, password);
      if (res.message === 'Signed in successfully!') {
        const loggedInUser = await getUser();
        setUser(loggedInUser.username);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setFormError('Invalid credentials. Please try again.');
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Enter NoshBook</legend>
        <section>
          <label htmlFor='username'>Username</label>
          <input
            required
            id='username'
            type='username'
            name='username'
            value={username}
            onChange={handleFormChange}
          />
        </section>
        <section>
          <label htmlFor='password'>Password</label>
          <input
            required
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={handleFormChange}
          />
        </section>
        <button onClick={handleLogin}>Log in</button>
        <button onClick={handleSignUp}>Sign up</button>
        {formError && <p>{formError}</p>}
      </fieldset>
    </form>
  );
}
