import { useAuth } from '../context/AuthContext';

export default function TestHeader() {
  const { user } = useAuth();
  return <header>{user.username}</header>;
}
