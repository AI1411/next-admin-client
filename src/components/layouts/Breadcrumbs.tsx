import Link from 'next/link';
import React from 'react';

type Props = {
  title?: string
  breadcrumbs: Breadcrumb[]
};

type Breadcrumb = {
  id: number;
  name: string;
  route: string;
  is_disabled: boolean;
};

const Breadcrumbs = (props: Props) => {
  return (
    <div className="mb-4">
      <nav className="flex mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {props.breadcrumbs.map((bread: Breadcrumb) =>
            <li className="inline-flex items-center" key={bread.id}>
              {!bread.is_disabled ?
                <Link href={bread.route}>
                  <a className="text-gray-700 hover:text-gray-900 inline-flex items-center">
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor">
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    {bread.name}
                  </a>
                </Link>
                :
                <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                      aria-current="page">List</span>
              }
            </li>
          )}
        </ol>
      </nav>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">All {props.title}</h1>
    </div>
  );
};

export default Breadcrumbs;
