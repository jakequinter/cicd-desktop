import {
  Calendar,
  CheckCircle,
  CircleNotch,
  Clock,
  WarningOctagon,
  XCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { WorkflowRun } from '../types/org';

type Props = {
  action: WorkflowRun;
};

export default function ActionItem({ action }: Props) {
  const handleConclusionColor = () => {
    if (action.status === 'in_progress') {
      return <CircleNotch size={18} weight="fill" className="mt-1 animate-spin text-yellow-600" />;
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
          return (
            <CircleNotch size={18} weight="fill" className="mt-1 animate-spin text-yellow-600" />
          );
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
    <li className="flex flex-col justify-between overflow-hidden rounded-md border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 md:flex-row md:items-center">
      <div className="flex gap-x-1">
        <div>{handleConclusionColor()}</div>
        <div className="flex flex-col space-y-2">
          <Link
            to={action.html_url}
            className="max-w-sm overflow-x-hidden truncate whitespace-nowrap text-xl font-semibold text-gray-900 hover:text-blue-700 hover:underline dark:text-gray-50"
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
              <Clock size={14} />
              <p>{calculateTimeDifference(action.created_at, action.updated_at)}</p>
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
