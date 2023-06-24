'use client';

import { useState } from 'react';

import useAuth from '@/hooks/useAuth';

export default function LoginPage() {
  const { authGitHubToken } = useAuth();
  const [token, setToken] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authGitHubToken(token);
  };

  return (
    <section className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-semibold text-orange-500">flowlog</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-1">
          <input
            id="token"
            name="token"
            type="password"
            className="rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-gray-400 focus:ring-gray-400 sm:text-sm sm:leading-6"
            placeholder="Enter your GitHub token"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-orange-400 py-1.5 text-orange-50 hover:bg-orange-500"
        >
          Enter
        </button>
      </form>
    </section>
  );
}
