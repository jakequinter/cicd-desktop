'use client';

import { useQuery } from '@/src/rspc';

export default function Home() {
  const { data, isLoading, error } = useQuery(['greet', 'yooooooooooooooooo tauriiiiiiiiiiii']);

  return (
    <main className="">
      <p>{data}</p>
    </main>
  );
}
