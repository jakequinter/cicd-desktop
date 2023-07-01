import Link from 'next/link';
import { FileCode, GitBranch } from '@phosphor-icons/react';

import type { Repo } from '@/types/org';
import useOrgs from '@/hooks/useOrgs';

type Props = {
  repo: Repo;
};

export default function RepoItem({ repo }: Props) {
  const { org } = useOrgs();

  return (
    <li className="flex h-40 flex-col justify-between rounded-md bg-gray-100 p-4 shadow">
      <p className="text-center text-xl font-medium text-gray-900">{repo.name}</p>

      <div className="flex flex-col items-center justify-center space-y-2">
        <div>
          <Link
            href={`/${org?.login}/${repo.name}/readme`}
            className="inline-flex items-center gap-x-1 text-sm font-medium hover:underline"
          >
            <FileCode size={14} />
            Docs
          </Link>
        </div>
        <div>
          <Link
            href={`/${org?.login}/${repo.name}/actions`}
            className="inline-flex items-center gap-x-1 rounded-full bg-orange-400 px-2 py-1 text-sm font-medium text-white hover:bg-orange-500"
          >
            <GitBranch size={14} />
            Workflows
          </Link>
        </div>
      </div>
    </li>
  );
}
