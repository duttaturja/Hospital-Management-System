import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type AuthResponse } from '../types';
import apiClient from '../services/api';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Auth restoration failed', error);
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data: AuthResponse) => {
    setUser(data.user);
    setToken(data.access);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access);
    localStorage.setItem('refresh', data.refresh);
    
    // Redirect logic is handled in the component, but context state is now set
  };

  const logout = async () => {
    try {
      await apiClient.post('/user/logout/');
    } catch (e) {
      console.error("Logout API call failed", e);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.clear();
      toast.success("Logged out successfully");
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};