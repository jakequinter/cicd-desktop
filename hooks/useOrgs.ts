import { useContext } from 'react';

import { OrgContext } from '@/context/OrgContext';

const useOrgs = () => {
  const { orgs, fetchUserOrgs } = useContext(OrgContext);

  return { orgs, fetchUserOrgs };
};

export default useOrgs;
