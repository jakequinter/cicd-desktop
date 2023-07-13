'use client';

import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useAuth from '@/hooks/useAuth';

export default function ReadMePage({ params }: { params: { name: string; org: string } }) {
  const { token } = useAuth();
  const router = useRouter();
  const { org, name } = params;

  const {
    data: readme,
    isLoading,
    error,
  } = useSWR<string>(['get_readme', { token, orgName: org, repoName: name }], fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error || !readme) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button className="hover:underline" onClick={() => router.back()}>
        Back
      </button>
      <div className="markdown-body p-4">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </div>
    </div>
  );
}
