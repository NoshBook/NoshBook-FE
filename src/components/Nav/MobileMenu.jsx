import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navlinks } from './navlinks';
import { logOut } from '../../services/users';
import styles from './Nav.module.css';
import { FaHamburger } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeinVariants } from '../../utils/variants';

export default function MobileMenu() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setUser({ showUserContent: false });
    setMenuToggle(false);
    <Navigate to="/" />;
  };

  const hamburgerIcon = (
    <FaHamburger
      cursor={'pointer'}
      size={25}
      className={styles.hamburgericon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  const closeIcon = (
    <IoIosCloseCircleOutline
      cursor={'pointer'}
      size={25}
      className={styles.closeicon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  return (
    <nav className={styles.mobilemenu}>
      {menuToggle ? closeIcon : hamburgerIcon}
      {menuToggle && (
        <motion.ul
          variants={fadeinVariants}
          initial={'initial'}
          animate={'animate'}
        >
          {navlinks.map((item, index) => {
            return (
              <motion.li whileHover={{ scale: 1.02 }} key={index}>
                <NavLink
                  to={item.link}
                  alt={item.title}
                  onClick={() => setMenuToggle(false)}
                >
                  {item.title}
                </NavLink>
              </motion.li>
            );
          })}
          <motion.li whileHover={{ scale: 1.02 }}>
            {user.id ? (
              <button onClick={async () => await handleLogout()}>Logout</button>
            ) : (
              <NavLink
                to="/auth"
                alt="log out"
                onClick={() => setMenuToggle(false)}
              >
                Log In
              </NavLink>
            )}
          </motion.li>
        </motion.ul>
      )}
    </nav>
  );
}
