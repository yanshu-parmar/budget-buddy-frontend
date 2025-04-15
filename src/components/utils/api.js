import axios from 'axios';
import { getToken, logout } from './auth';
import { toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      if (error.response.status === 401) {
        logout();
        window.location.href = '/login';
      }
      toast.error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } else {
      // Error setting up request
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  signup: (userData) => api.post('/api/auth/signup', userData),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/api/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/api/auth/verify-email', { token }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (userData) => api.put('/api/user/profile', userData),
  changePassword: (passwords) => api.put('/api/user/change-password', passwords),
};

// Transactions API
export const transactionsAPI = {
  getAll: () => api.get('/api/transactions'),
  getById: (id) => api.get(`/api/transactions/${id}`),
  create: (data) => api.post('/api/transactions', data),
  update: (id, data) => api.put(`/api/transactions/${id}`, data),
  delete: (id) => api.delete(`/api/transactions/${id}`),
  getMonthly: () => api.get('/api/transactions/monthly'),
};

// Budgets API
export const budgetsAPI = {
  getAll: () => api.get('/api/budgets'),
  getById: (id) => api.get(`/api/budgets/${id}`),
  create: (data) => api.post('/api/budgets', data),
  update: (id, data) => api.put(`/api/budgets/${id}`, data),
  delete: (id) => api.delete(`/api/budgets/${id}`),
};

// Goals API
export const goalsAPI = {
  getAll: () => api.get('/api/goals'),
  getById: (id) => api.get(`/api/goals/${id}`),
  create: (data) => api.post('/api/goals', data),
  update: (id, data) => api.put(`/api/goals/${id}`, data),
  delete: (id) => api.delete(`/api/goals/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getSummary: () => api.get('/api/dashboard/summary'),
  getCharts: () => api.get('/api/dashboard/charts'),
};

export default api; 