import { useState, useCallback } from 'react';
import axiosInstance from '../axiosInstance';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await axiosInstance.post('/auth/login', { email, password });
      // Handle successful login (e.g., update state, redirect)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
      // Handle logout (e.g., clear state, redirect)
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
    }
  }, []);

  return { login, logout, isLoading, error };
};