'use client';

import { ArrowLeft } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import useAuth from '../hooks/useAuth';
import fetcher from '../lib/fetcher';

import 'github-markdown-css';

import Loading from '../components/Loading';

export default function ReadMe() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { org, repo } = useParams();

  const {
    data: readme,
    isLoading,
    error,
  } = useSWR<string>(['get_readme', { token, orgName: org, repoName: repo }], fetcher);

  if (isLoading) return <Loading />;
  if (error || !readme) return <div>Error: {error.message}</div>;

  return (
    <>
      <button
        className="mb-4 inline-flex items-center gap-x-1 rounded-full border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-950"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={13} />
        Back
      </button>
      <div className="markdown-body p-4">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </div>
    </>
  );
}
