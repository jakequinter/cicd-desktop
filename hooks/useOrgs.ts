import { useContext } from 'react';

import { OrgContext } from '@/context/OrgContext';

const useOrgs = () => {
  const { orgs, org, fetchUserOrgs } = useContext(OrgContext);

  return { orgs, org, fetchUserOrgs };
};

export default useOrgs;
