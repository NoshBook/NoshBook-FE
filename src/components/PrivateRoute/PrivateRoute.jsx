import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  return user.username ? (
    children
  ) : (
    <Navigate to={'/auth'} state={{ from: location }} replace />
  );
}
