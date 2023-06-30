'use client';

import { useEffect, useState } from 'react';
import { client, useQuery } from '@/src/rspc';

export default function Home() {
  const [posts, setPosts] = useState([]);

  // const { data, isLoading, error } = useQuery(['get_posts', 'hi']);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await client.query(['my_custom_command', 'hi']);
  //     const data = JSON.parse(response);
  //     setPosts(data);
  //   };
  //
  //   getPosts();
  // }, []);

  return (
    <main className="">
      <a href="/test">org</a>
    </main>
  );
}
