type Props = {
  conclusion: string;
  created_at: string;
  name: string;
  status: string;
  url: string;
};

export default function ActionItem({ conclusion, created_at, name, status, url }: Props) {
  return (
    <li className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
          <p className="mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset">
            {status}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">{created_at}</p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <a
          href="/"
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          View project<span className="sr-only">, {name}</span>
        </a>
      </div>
    </li>
  );
}
