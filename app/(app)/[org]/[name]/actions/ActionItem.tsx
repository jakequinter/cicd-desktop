import Link from 'next/link';
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  WarningOctagon,
  XCircle,
} from '@phosphor-icons/react';

import { WorkflowRun } from '@/types/org';

type Props = {
  action: WorkflowRun;
};

export default function ActionItem({ action }: Props) {
  const handleConclusionColor = () => {
    if (action.status === 'in_progress') {
      <Circle size={18} weight="fill" className="mt-1 text-yellow-600" />;
    } else {
      switch (action.conclusion) {
        case 'success':
          return <CheckCircle size={18} weight="fill" className="mt-1 text-green-600" />;
        case 'action_required':
        case 'failure':
        case 'timed_out':
          return <XCircle size={18} weight="fill" className="mt-1 text-red-600" />;
        case 'in_progress':
        case 'skipped':
        case 'queued':
        case 'requested':
        case 'waiting':
        case 'pending':
          <Circle size={18} weight="fill" className="mt-1 text-yellow-600" />;
        default:
          return <WarningOctagon size={18} weight="fill" className="mt-1 text-gray-600" />;
      }
    }
  };

  function createFormattedTime(date: string): string {
    const now = new Date();
    const updated = new Date(date);

    now.setHours(0, 0, 0, 0);
    updated.setHours(0, 0, 0, 0);

    const diff = Math.floor((now.getTime() - updated.getTime()) / (1000 * 3600 * 24));

    if (diff === 0) {
      return 'Today';
    } else if (diff === 1) {
      return 'Yesterday';
    } else {
      return `${diff} days ago`;
    }
  }

  function calculateTimeDifference(start: string, end: string): string {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffInMilliseconds = endTime.getTime() - startTime.getTime();

    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return `${minutes}m ${seconds}s`;
  }

  return (
    <li className="flex flex-col justify-between rounded-md border bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div>
        <div className="flex gap-x-1">
          {handleConclusionColor()}
          <div className="flex flex-col space-y-2">
            <Link
              href={action.html_url}
              className="max-w-xs truncate whitespace-nowrap text-xl font-semibold text-gray-900 hover:text-blue-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.name}
            </Link>
            <p>
              <span className="font-medium">Deploy #275:</span> Manually run by {action.actor.login}
            </p>
            <div className="flex gap-x-4 md:hidden md:flex-col md:gap-x-0">
              <div className="inline-flex items-center gap-x-1 text-sm">
                <Calendar size={14} />
                <p>{createFormattedTime(action.created_at)}</p>
              </div>
              <div className="inline-flex items-center gap-x-1 text-sm">
                <Calendar size={14} />
                <p>{calculateTimeDifference(action.created_at, action.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden flex-col gap-x-4 md:flex">
        <div className="inline-flex items-center gap-x-1 text-sm">
          <Calendar size={14} />
          <p>{createFormattedTime(action.created_at)}</p>
        </div>
        <div className="inline-flex items-center gap-x-1 text-sm">
          <Clock size={14} />
          <p>{calculateTimeDifference(action.created_at, action.updated_at)}</p>
        </div>
      </div>
    </li>
  );
}
