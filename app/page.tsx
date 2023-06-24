'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    invoke<any>('get_user_orgs').then(posts => {
      setPosts(posts);
    });
  }, []);

  return (
    <main className="">
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}
