'use client';

import { useRouter } from 'next/navigation';

export default function RepoPage({ params }: { params: { name: string } }) {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <p>{params.name}</p>
    </div>
  );
}
