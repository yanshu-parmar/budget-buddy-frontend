import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user/profile')
        .then((response) => {
          console.log('[Profile Fetch Success]', response.data);
          setUser(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('[Profile Fetch Error]', err.response?.data || err.message);
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('[Login Attempt]', { email });
      const response = await api.post('/user/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Login failed';
      console.error('[Login Error]', { status: err.response?.status, error: errorMsg });
      toast.error(errorMsg);
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    try {
      console.log('[Signup Attempt]', { name, email });
      const response = await api.post('/user/signup', { name, email, password, role: 'user' });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Signup successful!');
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Signup failed';
      console.error('[Signup Error]', { status: err.response?.status, error: errorMsg });
      toast.error(errorMsg);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};