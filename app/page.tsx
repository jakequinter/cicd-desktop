'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Org } from '@/types/org';
import useAuth from '@/hooks/useAuth';

export default function Home() {
  const { token, user } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    if (token) {
      invoke<Org[]>('get_user_orgs', { token }).then(orgs => {
        setOrgs(orgs);
      });
    }
  }, [token]);

  return (
    <main className="">
      <h1>Welcome, {user?.name}</h1>
      <pre>{JSON.stringify(orgs, null, 2)}</pre>
    </main>
  );
}
