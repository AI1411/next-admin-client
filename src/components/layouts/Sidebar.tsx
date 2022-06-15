import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <aside
      className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar">
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li>
                <Link href={`/`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/users`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>

                    <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/products`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/projects`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <rect x="3" y="7" width="18" height="13" rx="2"/>
                      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/>
                      <line x1="12" y1="12" x2="12" y2="12.01"/>
                      <path d="M3 13a20 20 0 0 0 18 0"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Projects</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/orders`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Orders</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/coupons`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <path
                        d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Coupons</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/login`}>
                  <a href="https://demo.themesberg.com/windster/authentication/sign-in/"
                     className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                      <path d="M16 11l2 2l4 -4"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/register`}>
                  <a
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                    href="">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span></a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
