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
      // The nullish coalescing operator prevents user from being set to undefined
      setUser(res ?? { showUserContent: false });
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
    // This component will lose its state on page refreshes and manually entered URLs.
    // Adding this wait allows the user to be fetched before rendering any child
    // PrivateRoutes, which prevents logged in users from being erroneously redirected.
    return (
      <div className="authcontextloading">
        <h2>Loading...</h2>
      </div>
    );
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
