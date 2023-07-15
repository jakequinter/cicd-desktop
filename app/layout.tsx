import './globals.css';

import { AuthProvider } from '@/context/AuthContext';
import { OrgProvider } from '@/context/OrgContext';

import 'github-markdown-css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-base text-gray-600">
        <AuthProvider>
          <OrgProvider>{children}</OrgProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
