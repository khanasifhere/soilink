import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode }from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (token) => {
  localStorage.setItem('token', token);
  const decoded = jwtDecode(token);
  setUser(decoded);
};

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};