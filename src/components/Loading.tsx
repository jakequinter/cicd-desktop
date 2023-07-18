import { Spinner } from '@phosphor-icons/react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner weight="bold" size={24} className="animate-spin text-gray-900 dark:text-gray-50" />
    </div>
  );
}
