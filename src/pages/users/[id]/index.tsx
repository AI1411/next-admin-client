import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {BASE_URL} from "../../../../lib/utils/const";
import {User} from "../../../types/user";
import TodoList from "../../../components/todos/TodoList";
import axios from "axios";
import Loading from "../../../components/layouts/parts/Loading";

const UserDetail = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR<User | undefined>(id ? `/api/users/detail?id=${id}` : null);
  if (error) return <div>failed to load products</div>
  if (!data) return <Loading />

  const deleteTodo = (e: any) => {
    if (!confirm('このtodoを削除してもよろしいですか？')) {
      return;
    }
    const id = e.target.value;
    axios.delete(`${BASE_URL}/todos/${id}`).then(() => {
      alert('todoを削除しました');
    }).catch(err => {
      alert(err);
    })
  }
  return (
    <>
      <Head>
        <title>ユーザ詳細</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">ユーザ詳細</h1>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">名</label>
                <input
                  type="text"
                  readOnly
                  value={data.first_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="商品名"/>
              </div>
              <div>
                <label htmlFor="last_name"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">姓</label>
                <input
                  type="text"
                  readOnly
                  value={data.last_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="価格"/>
              </div>
              <div>
                <label htmlFor="phone"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">年齢</label>
                <input
                  type="text"
                  readOnly
                  value={data.age}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="数量"
                />
              </div>
              <div>
                <label htmlFor="company"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">メールアドレス</label>
                <input
                  readOnly
                  value={data.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="説明"
                />
              </div>
            </div>
            <Link href={`/users/${id}/edit`}>
              <button
                type="button"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Edit
              </button>
            </Link>
            <Link href={`/users`}>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back
              </button>
            </Link>
            <hr className={`my-3`}/>
            {data.todos.length > 0
              ? <TodoList
                todos={data.todos}
                user={data}
                handleDelete={deleteTodo}
              />
              : <div>todoがありません</div>}
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
