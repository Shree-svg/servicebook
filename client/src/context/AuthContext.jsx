import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

// Role-based redirect helper
export const getRoleRedirect = (role) => {
  if (role === 'provider') return '/provider/jobs';
  if (role === 'admin') return '/admin/verify';
  return '/dashboard';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Auto-restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          // Backend returns flat user object (no nesting)
          const res = await api.get('/api/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Session restoration failed:', err);
          localStorage.removeItem('token');
          setToken(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    // Backend returns: { _id, name, email, role, token } — flat object
    const { token: newToken, ...userData } = res.data;

    localStorage.setItem('token', newToken);
    setToken(newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post('/api/auth/register', { name, email, password, role });
    // Backend returns: { _id, name, email, role, token } — flat object
    const { token: newToken, ...newUser } = res.data;

    localStorage.setItem('token', newToken);
    setToken(newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setUser(newUser);
    return newUser;
  };

  // Alias so Signup.jsx (which calls signup) works too
  const signup = register;

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
