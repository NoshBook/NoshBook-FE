import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getUser } from '../../services/users.js';

const AuthContext = createContext();

const AuthProvider = ({ mockUser = { showUserContent: false }, children }) => {
  console.log('<<<<<<AUTHPROVIDER MOCK INITIATED>>>>>>');
  const [user, setUser] = useState({ ...mockUser });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      console.log('MOCK USER: ', res);
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
    [user],
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
