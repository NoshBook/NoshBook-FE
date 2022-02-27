import { useAuth } from '../../context/AuthContext';
import { logOut } from '../../utils/users';
import { BsPersonCircle } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';

export default function Avatar() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setUser('');
    <Navigate to="/" />;
  };

  return (
    <div>
      {user.name ? (
        <div>
          <BsPersonCircle />
          {user.name}{' '}
          <button onClick={async () => await handleLogout()}>Logout</button>
        </div>
      ) : (
        <a href="/auth" alt="log in">
          Login/Signup
        </a>
      )}
    </div>
  );
}
