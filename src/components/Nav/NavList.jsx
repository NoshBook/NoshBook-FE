import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navlinks } from './navlinks';
import { logOut } from '../../services/users';

export default function NavList() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setUser({ showUserContent: false });
    <Navigate to="/" />;
  };

  return (
    <ul>
      {navlinks.map((item, index) => {
        return (
          <li key={index}>
            <NavLink to={item.link} alt={item.title}>
              {item.title}
            </NavLink>
          </li>
        );
      })}
      <li>
        {user.id ? (
          <button onClick={async () => await handleLogout()}>Logout</button>
        ) : (
          <NavLink to="/auth" alt="log out">
            Log In
          </NavLink>
        )}
      </li>
    </ul>
  );
}
