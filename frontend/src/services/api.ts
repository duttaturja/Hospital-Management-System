import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // For example, logout the user and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.error('Session expired. Please log in again.');
      // This will force a reload and redirect via ProtectedRoute
      window.location.href = '/login';
    }

    // You can handle other global errors here
    // e.g., 500, 404, etc.

    return Promise.reject(error);
  }
);

export default apiClient;