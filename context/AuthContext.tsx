'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextProps = {
  token: string | null;
  authGitHubToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  authGitHubToken: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const authGitHubToken = (token: string) => {
    setToken(token);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authGitHubToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
