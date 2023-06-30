'use client';

import { useEffect, useState } from 'react';
import { client, useQuery } from '@/src/rspc';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const { data, isLoading, error } = useQuery([
    'get_repos',
    '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',
  ]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await client.query(['my_custom_command', 'hi']);
  //     const data = JSON.parse(response);
  //     setPosts(data);
  //   };
  //
  //   getPosts();
  // }, []);
  //
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="">
      <a href="/">Login</a>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
