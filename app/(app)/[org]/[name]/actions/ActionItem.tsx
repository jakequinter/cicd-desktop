import cn from '@/utils/cn';

type Props = {
  conclusion?: string;
  created_at: string;
  name: string;
  url: string;
  status: string;
};

export default function ActionItem({ conclusion, created_at, name, url, status }: Props) {
  const handleConclusionColor = () => {
    if (status === 'in_progress') {
      return ['yellow-300', 'bg-yellow-50', 'text-yellow-800', 'bg-yellow-500'];
    } else {
      switch (conclusion) {
        case 'success':
          return ['ring-emerald-300', 'bg-emerald-50', 'text-emerald-800', 'bg-emerald-500'];
        case 'action_required':
        case 'failure':
        case 'timed_out':
          return ['ring-rose-300', 'bg-rose-50', 'text-rose-800', 'bg-rose-500'];
        case 'in_progress':
        case 'skipped':
        case 'queued':
        case 'requested':
        case 'waiting':
        case 'pending':
          return ['yellow-300', 'bg-yellow-50', 'text-yellow-800', 'bg-yellow-500'];
        default:
          return ['ring-gray-300', 'bg-gray-50', 'text-gray-800', 'bg-gray-500'];
      }
    }
  };

  return (
    <li className="flex items-center justify-between rounded-md bg-white p-2 shadow">
      <div className="min-w-0">
        <div className="flex items-start gap-x-2">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
          <div
            className={cn(
              handleConclusionColor()[0],
              handleConclusionColor()[1],
              handleConclusionColor()[2],
              'mt-0.5 inline-flex items-center gap-x-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
            )}
          >
            <div className={cn(handleConclusionColor()[3], 'h-2 w-2 rounded-full')} />

            {conclusion ?? status}
          </div>
        </div>

        <p className="whitespace-nowrap text-xs leading-5 text-gray-500">{created_at}</p>
      </div>

      <div className="flex flex-none items-center gap-x-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:block"
        >
          View<span className="sr-only">, {name}</span>
        </a>
      </div>
    </li>
  );
}
