import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Container from '../components/Container';
import Loading from '../components/Loading';
import RepoItem from '../components/RepoItem';
import useAuth from '../hooks/useAuth';
import fetcher from '../lib/fetcher';
import type { Repo } from '../types/org';

export default function OrgPage() {
  const { org } = useParams();
  const { token } = useAuth();
  const {
    data: repos,
    isLoading,
    error,
  } = useSWR<Repo[]>(['get_org_repos', { token, orgName: org }], fetcher);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      {org && (
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          {org.charAt(0).toUpperCase() + org.slice(1)} Repositories
        </h1>
      )}
      <ul className="space-y-2">{repos?.map(repo => <RepoItem key={repo.id} repo={repo} />)}</ul>
    </Container>
  );
}
