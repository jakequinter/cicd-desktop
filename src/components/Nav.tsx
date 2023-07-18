import { Fragment } from 'react';
import { SignOut } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useOrgs from '../hooks/useOrgs';
import cn from '../utils/cn';

export default function Nav() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const { orgs } = useOrgs();

  return (
    <div className="flex h-screen flex-grow flex-col overflow-y-auto bg-white dark:bg-black">
      <h1 className="py-4 text-center text-3xl font-semibold text-gray-900 dark:text-gray-50">
        flowlog
      </h1>
      <div className="flex flex-grow flex-col">
        <nav className="mt-2.5 px-2" aria-label="Sidebar">
          <ul className="space-y-1">
            {orgs.map(org => (
              <Fragment key={org.id}>
                <li>
                  <Link
                    to={`/${org.login}`}
                    className={cn(
                      pathname.includes(org.login)
                        ? `bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-50`
                        : '',
                      'group relative flex w-full cursor-default items-center rounded-md p-1.5 text-left font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0 dark:hover:bg-gray-900 dark:hover:text-gray-50'
                    )}
                  >
                    <img
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

      <div className="p-2">
        <button
          className="inline-flex items-center gap-x-2 text-base text-gray-500 hover:text-gray-600 dark:text-gray-700 dark:hover:text-gray-600"
          onClick={() => logout()}
        >
          <SignOut />
          Sign out
        </button>
      </div>
    </div>
  );
}
