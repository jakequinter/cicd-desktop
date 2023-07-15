'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
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
      <button
        className="inline-flex items-center gap-x-1 rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
        onClick={() => router.back()}
      >
        <ArrowLeft size={13} />
        Back
      </button>
      <div className="markdown-body p-4">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </div>
    </div>
  );
}
