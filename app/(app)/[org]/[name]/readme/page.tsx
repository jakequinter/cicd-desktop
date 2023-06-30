'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { invoke } from '@tauri-apps/api/tauri';
import ReactMarkdown from 'react-markdown';

import type { RepoReadMe } from '@/types/org';
import useAuth from '@/hooks/useAuth';

export default function ReadMePage({ params }: { params: { name: string; org: string } }) {
  const { token } = useAuth();
  const router = useRouter();
  const [readmeContent, setReadmeContent] = useState('');
  const { org, name } = params;

  useEffect(() => {
    invoke<RepoReadMe>('get_readme', { token, orgName: org, repoName: name }).then(readme => {
      const decodedContent = atob(readme.content);
      setReadmeContent(decodedContent);
    });
  }, [token, org, name]);

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <div className="markdown-body p-4">
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      </div>
    </div>
  );
}
