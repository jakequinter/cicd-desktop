import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';

const useAuth = () => {
  const { token, user, authGitHubToken, error, setError } = useContext(AuthContext);

  return { token, user, authGitHubToken, error, setError };
};

export default useAuth;
