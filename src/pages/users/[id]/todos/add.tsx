import React from 'react';
import Head from "next/head";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';
import {useRouter} from "next/router";
import {Todo} from "../../../../types/todo";
import {BASE_URL} from "../../../../../lib/utils/const";
import {TODO_STATUS} from '../../../../../lib/enums/todo_status';
import Nav from "../../../../components/layouts/Nav";
import Sidebar from "../../../../components/layouts/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import useSWR from "swr";
import {User} from "../../../../types/user";
import Loading from "../../../../components/layouts/parts/Loading";
import {toast} from "react-toastify";

const AddTodoForm = () => {
  const router = useRouter();
  const user_id = router.query.id

  const {register, handleSubmit, formState: {errors}} = useForm<Todo>();
  const onSubmit: SubmitHandler<Todo> = data => {
    data.user_id = String(user_id);
    axios.post(`${BASE_URL}/todos`, data).then((res: any) => {
      toast.success('タスクを作成しました。');
      return router.push(`/users/${user_id}`);
    }).catch((err: any) => {
      alert(err)
    })
  };

  const {data, error} = useSWR<User | undefined>(user_id ? `${BASE_URL}/users/${user_id}` : null);
  if (error) return <div>failed to load products</div>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>ToDo追加</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">ToDo追加</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ToDo名</label>
                  <input
                    type="text"
                    {...register('title', {required: true, maxLength: 64})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ToDo名"/>
                  {errors.title && <span className="text-xs italic text-red-500">ToDo名は必須です</span>}
                </div>
                <div>
                  <label htmlFor="last_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ステータス</label>
                  <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("status", {required: true})}>
                    {TODO_STATUS.map((status) =>
                      <option key={status.id} value={status.title}>{status.title}</option>
                    )}
                  </select>
                  {errors.status && <span className="text-xs italic text-red-500">ステータスは必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ユーザID</label>
                  <h4 className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {data.last_name + ' ' + data.first_name}
                  </h4>
                </div>
                <div>
                  <label htmlFor="body"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    defaultValue={undefined}
                    {...register('body', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.body && <span className="text-xs italic text-red-500">説明は255文字以内です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
              </button>
            </form>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default AddTodoForm;
