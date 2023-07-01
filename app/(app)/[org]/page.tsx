'use client';

import { useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import useSWR from 'swr';

import type { Repo } from '@/types/org';
import { fetcher } from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';

import RepoItem from './RepoItem';

export default function OrgPage({ params }: { params: { org: string } }) {
  const { token } = useAuth();
  const {
    data: repos,
    isLoading,
    error,
  } = useSWR<Repo[]>(['get_org_repos', { token, orgName: params.org }], fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {params.org.charAt(0).toUpperCase() + params.org.slice(1)} Repositories
      </h1>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {repos?.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
    </main>
  );
}
