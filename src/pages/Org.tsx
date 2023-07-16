import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import type { Repo } from '../types/org';
import fetcher from '../lib/fetcher';
import useAuth from '../hooks/useAuth';

// import RepoItem from './RepoItem';

export default function OrgPage() {
  const { org } = useParams();
  const { token } = useAuth();
  // const {
  //   data: repos,
  //   isLoading,
  //   error,
  // } = useSWR<Repo[]>(['get_org_repos', { token, orgName: params.org }], fetcher);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
    {org && (
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {org.charAt(0).toUpperCase() + org.slice(1)} Repositories
      </h1>
    )}
      {/*<ul className="space-y-2">
        {repos?.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>*/}
    </main>
  );
}
