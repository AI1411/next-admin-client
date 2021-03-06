import React from 'react';
import Sidebar from "../../components/layouts/Sidebar";
import Nav from "../../components/layouts/Nav";
import Footer from "../../components/layouts/Footer";
import Paginator from "../../components/layouts/Paginator";

import useSWR from 'swr';
import {User} from "../../types/user";
import UserTableRow from "../../components/users/UserTableRow";
import Head from "next/head";
import axios from "axios";
import {BASE_URL} from "../../../lib/utils/const";
import Loading from "../../components/layouts/parts/Loading";
import UnAuthorized from "../401";
import {parseCookies} from "nookies";
import {NextPageContext} from "next";

const Users = (ctx?: NextPageContext) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const {data, error} = useSWR<User[] | undefined | any>(`/api/users/all?limit=${limit}`);
  if (data === 'unauthorized!') {
    return <UnAuthorized/>
  }
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading/>

  const deleteUser = (e: any) => {
    if (!confirm('このユーザを削除してもよろしいですか？')) {
      return;
    }
    const id = e.target.value;
    const cookie = parseCookies(ctx);
    axios.delete(`${BASE_URL}/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cookie.jwt}`
      },
      withCredentials: true,
    }).then(() => {
      alert('ユーザを削除しました');
    }).catch(err => {
      alert(err);
    })
  }
  return (
    <div>
      <Head>
        <title>ユーザ一覧</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
              <div className="mb-1 w-full">
                <div className="mb-4">
                  <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                      <li className="inline-flex items-center">
                        <a href="#"
                           className="text-gray-700 hover:text-gray-900 inline-flex items-center">
                          <svg className="w-5 h-5 mr-2.5" fill="currentColor"
                               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                          </svg>
                          Home
                        </a>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor"
                               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                          </svg>
                          <a href="#"
                             className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">Users</a>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor"
                               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                                aria-current="page">List</span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">All users</h1>
                </div>
                <div className="sm:flex">
                  <div
                    className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                      <label className="sr-only">Search</label>
                      <div className="mt-1 relative lg:w-64 xl:w-96">
                        <input type="text" name="email" id="users-search"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               placeholder="Search for users"/>
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <a href="#"
                       className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                      <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                              clipRule="evenodd"/>
                      </svg>
                      Export
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                    <table className="table-fixed min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1"
                                   type="checkbox"
                                   className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          Age
                        </th>
                        <th scope="col" className="p-4">
                        </th>
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {data?.map((user: User) =>
                        <UserTableRow handleDelete={deleteUser} user={user} key={user.id}/>
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Paginator
              onclickPrevious={() => setPageIndex(pageIndex - 1)}
              onclickNext={() => setPageIndex(pageIndex + 1)}
              onChangeLimit={(e: any) => {
                setLimit(e.target.value);
              }}
            />
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Users;
