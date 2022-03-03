import { useState } from 'react';
import { getUser, logIn, signUp } from '../../services/users';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';

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
        console.log(res);
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
      console.log(res);
      if (res.message === 'Signed in successfully!') {
        const loggedInUser = await getUser();
        setUser(loggedInUser);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setFormError('Invalid credentials. Please try again.');
    }
  };

  return (
    <motion.form
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
      className={styles.authform}
    >
      <fieldset className={styles.authfieldset}>
        <legend>Enter NoshBook</legend>
        <section>
          <label htmlFor="username">Username</label>
          <input
            required
            id="username"
            type="username"
            name="username"
            value={username}
            onChange={handleFormChange}
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleFormChange}
          />
        </section>
        <div className={styles.authbuttons}>
          <motion.button whileHover={{ scale: 1.02 }} onClick={handleLogin}>
            Log in
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} onClick={handleSignUp}>
            Sign up
          </motion.button>
        </div>
        {formError && <p>{formError}</p>}
      </fieldset>
    </motion.form>
  );
}
