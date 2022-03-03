import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navlinks } from './navlinks';
import { logOut } from '../../services/users';
import { motion } from 'framer-motion';
import styles from './Nav.module.css';
import { fadeindelayVariants } from '../../utils/variants';
export default function NavList() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setUser({ showUserContent: false });
    <Navigate to="/" />;
  };

  return (
    <motion.ul
      variants={fadeindelayVariants}
      initial={'initial'}
      animate={'animate'}
    >
      {navlinks.map((item, index) => {
        return (
          <motion.li whileHover={{ scale: 1.02 }} key={index}>
            <NavLink to={item.link} alt={item.title}>
              {item.title}
            </NavLink>
          </motion.li>
        );
      })}
      <motion.li whileHover={{ scale: 1.02 }}>
        {user.id ? (
          <button
            className={styles.logout}
            onClick={async () => await handleLogout()}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/auth" alt="log out">
            Log In
          </NavLink>
        )}
      </motion.li>
    </motion.ul>
  );
}
