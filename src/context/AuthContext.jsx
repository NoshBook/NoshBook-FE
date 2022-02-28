import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getUser } from '../services/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ showUserContent: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      console.log(res);
      setUser(res);
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  const updateUserPreference = () => {
    setUser((prevState) => {
      return {
        ...prevState,
        showUserContent: !prevState.showUserContent,
      };
    });
  };

  const value = useMemo(
    () => ({ user, setUser, updateUserPreference }),
    [user]
  );
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
