import './globals.css';

import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import cn from '@/utils/cn';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-100 text-base text-gray-600')}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
