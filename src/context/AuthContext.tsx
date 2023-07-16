'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';

import type { User } from '../types/user';

type AuthContextProps = {
  token: string | null;
  user: User | null;
  authGitHubToken: (token: string) => void;
  logout: () => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: null,
  authGitHubToken: () => {},
  logout: () => {},
  error: null,
  setError: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    const handleCookieChange = () => {
      const newToken = localStorage.getItem('token');
      if (!newToken) {
        navigate('/login');
      }
      setToken(newToken);
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  const authGitHubToken = async (token: string) => {
    const user = await invoke<User>('validate_token', { token });

    if (user) {
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } else {
      setError('Invalid token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authGitHubToken,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
