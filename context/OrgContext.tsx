'use client';

import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { invoke } from '@tauri-apps/api/tauri';

import type { Org } from '@/types/org';
import useAuth from '@/hooks/useAuth';

type OrgContextProps = {
  orgs: Org[];
  fetchUserOrgs: (token: string) => Promise<void>;
};

export const OrgContext = createContext<OrgContextProps>({
  orgs: [],
  fetchUserOrgs: async () => {},
});

type OrgProviderProps = {
  children: ReactNode;
};

export const OrgProvider = ({ children }: OrgProviderProps) => {
  const router = useRouter();
  const { token } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);

  const fetchUserOrgs = useCallback(async () => {
    const userOrgs = await invoke<Org[]>('get_user_orgs', { token });
    setOrgs(userOrgs);

    if (userOrgs.length > 0) {
      router.push(`/${userOrgs[0].login}`);
    }
  }, [router, token]);

  useEffect(() => {
    if (token) {
      fetchUserOrgs();
    }
  }, [fetchUserOrgs, token]);

  return (
    <OrgContext.Provider
      value={{
        orgs,
        fetchUserOrgs,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};
