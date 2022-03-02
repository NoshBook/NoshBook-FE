import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navlinks } from './navlinks';
import { logOut } from '../../services/users';
import styles from './Nav.module.css';
import { FiMenu } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';

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
    <FiMenu
      size={25}
      className={styles.hamburgericon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  const closeIcon = (
    <IoIosCloseCircleOutline
      size={25}
      color="white"
      className={styles.closeicon}
      onClick={() => setMenuToggle(!menuToggle)}
    />
  );

  return (
    <nav className={styles.mobilemenu}>
      {menuToggle ? closeIcon : hamburgerIcon}
      {menuToggle && (
        <ul>
          {navlinks.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item.link}
                  alt={item.title}
                  onClick={() => setMenuToggle(false)}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
          <li>
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
          </li>
        </ul>
      )}
    </nav>
  );
}
