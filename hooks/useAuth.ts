import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';

const useAuth = () => {
  const { token, user, authGitHubToken, logout, error, setError } = useContext(AuthContext);

  return { token, user, authGitHubToken, logout, error, setError };
};

export default useAuth;
