import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getUser } from '../utils/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      setUser(res);
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);
  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth not used within Auth Provider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
