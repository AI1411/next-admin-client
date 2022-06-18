import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {Todo} from "../../../types/todo";
import Loading from "../../../components/layouts/parts/Loading";

const TodoDetail = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR<Todo | undefined>(id ? `/api/todos/detail?todo_id=${id}` : null);
  if (error) return <div>failed to load todo</div>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>TODO詳細</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">ToDo詳細</h1>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">タイトル</label>
                <input
                  type="text"
                  readOnly
                  value={data.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="タイトル"/>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ステータス</label>
                <input
                  type="text"
                  readOnly
                  value={data.status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ステータス"/>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ユーザID</label>
                <input
                  type="text"
                  readOnly
                  value={data.user_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ユーザID"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">本文</label>
                <input
                  readOnly
                  value={data.body}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="本文"
                />
              </div>
            </div>
            <Link href={`/todos/${id}/edit`}>
              <button
                type="button"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Edit
              </button>
            </Link>
            <Link href={`/users/${data.user_id}`}>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back
              </button>
            </Link>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
