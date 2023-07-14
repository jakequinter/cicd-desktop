import Link from 'next/link';
import { GitBranch, GitPullRequest, Star } from '@phosphor-icons/react';

import type { Repo } from '@/types/org';
import useOrgs from '@/hooks/useOrgs';
import cn from '@/utils/cn';

type Props = {
  repo: Repo;
};

export default function RepoItem({ repo }: Props) {
  const { org } = useOrgs();

  function determineLangColor(lang: string): string {
    switch (lang) {
      case 'TypeScript':
        return 'bg-[#2b7489]';
      case 'JavaScript':
        return 'bg-[#f1e05a]';
      case 'HTML':
        return 'bg-[#e34c26]';
      case 'CSS':
        return 'bg-[#563d7c]';
      case 'Java':
        return 'bg-[#b07219]';
      default:
        return 'bg-[#ccc]';
    }
  }

  function getLastUpdated(date: string): string {
    const now = new Date();
    const updated = new Date(date);
    const diff = Math.abs(now.getTime() - updated.getTime());
    const diffDays = diff / (1000 * 3600 * 24);

    if (diffDays < 1) {
      const diffHours = Math.ceil(diff / (1000 * 3600));

      if (diffHours === 1) {
        return 'Updated 1 hour ago';
      } else {
        return `Updated ${diffHours} hours ago`;
      }
    } else if (diffDays >= 1 && diffDays < 2) {
      return 'Updated yesterday';
    } else if (diffDays > 2 && diffDays < 365) {
      return `Updated ${Math.floor(diffDays)} days ago`;
    } else {
      return `Updated ${Math.floor(diffDays / 365)} years ago`;
    }
  }

  return (
    <li className="flex flex-col justify-between rounded-md border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 flex items-center gap-x-2">
          <Link
            href={`/${org?.login}/${repo.name}/readme`}
            className="text-xl font-semibold text-blue-700 hover:underline"
          >
            {repo.name}
          </Link>
          <button className="inline-flex items-center rounded-full border border-gray-300 px-2 text-sm font-medium text-gray-900">
            {repo.visibility.charAt(0).toUpperCase() + repo.visibility.slice(1)}
          </button>
        </div>

        <div className="flex items-center gap-x-4">
          {repo.language && (
            <div className="flex items-center gap-x-1">
              <div className={cn(determineLangColor(repo.language), 'h-2.5 w-2.5 rounded-full')} />
              <p>{repo?.language}</p>
            </div>
          )}
          <div className="hidden items-center gap-x-1 sm:flex">
            <Star size={14} />
            <p>{repo.stargazers_count}</p>
          </div>
          <div className="hidden items-center gap-x-1 sm:flex">
            <GitPullRequest size={14} />
            <p>{repo.open_issues_count}</p>
          </div>
          <p>{getLastUpdated(repo.pushed_at)}</p>
        </div>
      </div>

      <div>
        <Link
          href={`/${org?.login}/${repo.name}/actions`}
          className="mt-2 inline-flex items-center gap-x-1 rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:mt-0"
        >
          <GitBranch size={14} />
          Workflows
        </Link>
      </div>
    </li>
  );
}
