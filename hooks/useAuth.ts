import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';

const useAuth = () => {
  const { token, authGitHubToken } = useContext(AuthContext);

  return { token, authGitHubToken };
};

export default useAuth;
