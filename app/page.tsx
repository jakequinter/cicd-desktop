'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import useAuth from '@/hooks/useAuth';

export default function Home() {
  const { token } = useAuth();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    if (token) {
      invoke<any>('get_user_orgs').then(orgs => {
        setOrgs(orgs);
      });
    }
  }, [token]);

  return (
    <main className="">
      <pre>{JSON.stringify(orgs, null, 2)}</pre>
    </main>
  );
}
