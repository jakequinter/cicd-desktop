import { ReactNode } from 'react';

import Container from '@/components/Container';

type Props = {
  children: ReactNode;
};

export default async function AppLayout({ children }: Props) {
  return <Container>{children}</Container>;
}
