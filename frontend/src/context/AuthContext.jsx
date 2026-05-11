import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CHECK SAVED LOGIN
  useEffect(() => {
    const token = localStorage.getItem(
      'rosette_admin_token'
    );

    if (token) {
      setUser({
        isAdmin: true,
      });
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = (token) => {
    localStorage.setItem(
      'rosette_admin_token',
      token
    );

    setUser({
      isAdmin: true,
    });
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      'rosette_admin_token'
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};