import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import type { Org } from '../types/org';

type OrgContextProps = {
  orgs: Org[];
  org: Org | null;
  fetchUserOrgs: (token: string) => Promise<void>;
};

export const OrgContext = createContext<OrgContextProps>({
  orgs: [],
  org: null,
  fetchUserOrgs: async () => {},
});

type OrgProviderProps = {
  children: ReactNode;
};

export const OrgProvider = ({ children }: OrgProviderProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [org, setOrg] = useState<Org | null>(null);

  const fetchUserOrgs = useCallback(async () => {
    const userOrgs = await invoke<Org[]>('get_user_orgs', { token });
    setOrgs(userOrgs);

    if (userOrgs.length > 0) {
      setOrg(userOrgs[0]);
      navigate(`/${userOrgs[0].login}`);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserOrgs();
    }
  }, [fetchUserOrgs, token]);

  return (
    <OrgContext.Provider
      value={{
        orgs,
        org,
        fetchUserOrgs,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};
