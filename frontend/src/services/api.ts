import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Endpoints that do not need the token
const publicEndpoints = ['/user/login/', '/user/register/'];

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Only add token if it exists AND the endpoint is not public
    // We check if the config.url matches any public endpoint
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only logout if we are NOT on the login page already
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;