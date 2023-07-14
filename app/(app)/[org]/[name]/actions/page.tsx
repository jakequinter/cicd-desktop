'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import type { Action } from '@/types/org';
import fetcher from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';

import ActionItem from './ActionItem';

export default function ActionsPage({ params }: { params: { name: string; org: string } }) {
  const router = useRouter();
  const { token } = useAuth();
  const { name, org } = params;
  const { data, isLoading, error } = useSWR<Action>(
    ['get_repo_actions', { token, orgName: org, repoName: name }],
    fetcher
  );

  if (isLoading) return <div>loading...</div>;
  if (error || !data) return <div>failed to load</div>;

  return (
    <>
      <button className="mb-4 hover:underline" onClick={() => router.back()}>
        Back
      </button>
      <ul className="space-y-2">
        {data.workflow_runs.map(action => (
          <ActionItem
            key={action.id}
            conclusion={action.conclusion}
            created_at={action.created_at}
            name={action.name}
            url={action.html_url}
            status={action.status}
          />
        ))}
      </ul>
    </>
  );
}
