'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import type { Repo } from '@/types/org';
import useAuth from '@/hooks/useAuth';

import RepoItem from './RepoItem';

export default function OrgPage({ params }: { params: { org: string } }) {
  const { token } = useAuth();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    invoke<Repo[]>('get_org_repos', { token, orgName: params.org }).then(repos => {
      setRepos(repos);
    });
  }, [params.org, token]);

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {params.org.charAt(0).toUpperCase() + params.org.slice(1)} Repositories
      </h1>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {repos.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
    </main>
  );
}
