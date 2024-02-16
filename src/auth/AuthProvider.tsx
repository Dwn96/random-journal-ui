import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    // Set token in context
    setAuthToken(token);
    // Save token in HttpOnly cookie
    document.cookie = `authToken=${token}; Secure; HttpOnly`;
  };

  const logout = () => {
    // Remove token from context
    setAuthToken(null);
    // Remove token from cookie
    document.cookie = 'authToken=; Secure; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
