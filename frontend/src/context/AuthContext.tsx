import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthUser } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Get user profile with token
          const res = await apiService.auth.getProfile();

          if (res.success && res.data) {
            setUser({ ...res.data, token });
          } else {
            // Token invalid, clear localStorage
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiService.auth.login({ email, password });

      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('token', res.data.token);
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiService.auth.register(userData);

      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('token', res.data.token);
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiService.auth.updateProfile(userData);

      if (res.success && res.data) {
        // Update user but keep the same token
        setUser(prev => prev ? { ...res.data, token: prev.token } : null);
      } else {
        setError(res.message || 'Profile update failed');
      }
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        error,
        login,
        register,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
