import './globals.css';

import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import { OrgProvider } from '@/context/OrgContext';
import cn from '@/utils/cn';

import 'github-markdown-css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-white text-base text-gray-600')}>
        <AuthProvider>
          <OrgProvider>{children}</OrgProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
