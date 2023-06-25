'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { invoke } from '@tauri-apps/api/tauri';

import type { User } from '@/types/user';

type AuthContextProps = {
  token: string | null;
  user: User | null;
  authGitHubToken: (token: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: null,
  authGitHubToken: () => {},
  error: null,
  setError: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const authGitHubToken = async (token: string) => {
    const user = await invoke<User>('validate_token', { token });

    if (user) {
      setToken(token);
      setUser(user);
    } else {
      setError('Invalid token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authGitHubToken,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
