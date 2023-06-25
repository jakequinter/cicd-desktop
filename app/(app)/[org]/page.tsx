'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Repo } from '@/types/org';
import useAuth from '@/hooks/useAuth';

export default function OrgPage({ params }: { params: { org: string } }) {
  const { token } = useAuth();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    invoke<Repo[]>('get_org_repos', { token, orgName: params.org }).then(repos => {
      setRepos(repos);
    });
  }, [params.org, token]);

  return (
    <div>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
