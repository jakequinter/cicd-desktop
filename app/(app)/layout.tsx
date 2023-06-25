import { ReactNode } from 'react';

import { OrgProvider } from '@/context/OrgContext';

import Container from '@/components/Container';

type Props = {
  children: ReactNode;
};

export default async function AppLayout({ children }: Props) {
  return (
    <OrgProvider>
      <Container>{children}</Container>
    </OrgProvider>
  );
}
