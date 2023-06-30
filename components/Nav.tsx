'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useOrgs from '@/hooks/useOrgs';
import cn from '@/utils/cn';

export default function Nav() {
  const { orgs } = useOrgs();
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-grow flex-col overflow-y-auto bg-gray-100">
      <h1 className="p-2 py-4 text-left text-3xl font-semibold text-orange-500">flowlog</h1>
      <div className="flex flex-grow flex-col">
        <nav className="mt-1 px-2" aria-label="Sidebar">
          <ul className="space-y-1">
            {orgs.map(org => (
              <Fragment key={org.id}>
                <li>
                  <Link
                    href={`/${org.login}`}
                    className={cn(
                      pathname.includes(`/${org.login}`) ? `bg-gray-200 text-gray-900` : '',
                      'group relative flex w-full cursor-default items-center rounded-md p-1.5 text-left hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-0'
                    )}
                  >
                    <Image
                      src={org.avatar_url}
                      height={20}
                      width={20}
                      className="mr-2 rounded-full"
                      alt={org.login}
                    />
                    <span className="flex-1">
                      {org.login.charAt(0).toUpperCase() + org.login.slice(1)}
                    </span>
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
