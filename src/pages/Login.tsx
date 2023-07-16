import React, { useState } from 'react';

import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const { authGitHubToken, error, setError } = useAuth();
  const [token, setToken] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('token', token);
    authGitHubToken(token);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setToken(e.target.value);
  };

  return (
    <section className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">flowlog</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-1">
          <input
            id="token"
            name="token"
            type="password"
            autoFocus
            className="rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-gray-400 focus:ring-gray-400 sm:text-sm sm:leading-6"
            placeholder="Enter your GitHub token"
            value={token}
            onChange={handleOnChange}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-black py-1.5 text-white hover:bg-opacity-90"
        >
          Enter
        </button>
      </form>
    </section>
  );
}
