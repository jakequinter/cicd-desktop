'use client';

import useSWR from 'swr';

import type { Action } from '@/types/org';
import fetcher from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';

import ActionItem from './ActionItem';

export default function ActionsPage({ params }: { params: { name: string; org: string } }) {
  const { token } = useAuth();
  const { name, org } = params;
  const { data, isLoading, error } = useSWR<Action>(
    ['get_repo_actions', { token, orgName: org, repoName: name }],
    fetcher
  );

  if (isLoading) return <div>loading...</div>;
  if (error || !data) return <div>failed to load</div>;

  return (
    <ul>
      {data.workflow_runs.map(action => (
        <ActionItem
          key={action.id}
          conclusion={action.conclusion}
          created_at={action.created_at}
          name={action.name}
          status={action.status}
          url={action.url}
        />
      ))}
    </ul>
  );
}
