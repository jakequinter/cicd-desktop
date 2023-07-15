'use client';

import { Spinner } from '@phosphor-icons/react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size={20} className="animate-spin text-orange-500" />
    </div>
  );
}
