import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import ActionItem from '../components/ActionItem';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import fetcher from '../lib/fetcher';
import type { Action } from '../types/org';

export default function Actions() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { org, repo } = useParams();
  const { data, isLoading, error } = useSWR<Action>(
    ['get_repo_actions', { token, orgName: org, repoName: repo }],
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error || !data) return <div>failed to load</div>;

  return (
    <>
      <button
        className="mb-4 inline-flex items-center gap-x-1 rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={13} />
        Back
      </button>
      <ul className="space-y-2">
        {data.workflow_runs.map(action => (
          <ActionItem key={action.id} action={action} />
        ))}
      </ul>
    </>
  );
}
