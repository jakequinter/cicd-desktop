'use client';

import useSWR from 'swr';

import type { Repo } from '@/types/org';
import fetcher from '@/lib/fetcher';
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
      <ul className="space-y-2">
        {repos?.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
    </main>
  );
}
