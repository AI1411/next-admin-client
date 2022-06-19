import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Link from 'next/link';
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {Epic} from "../../../../../types/epic";
import Nav from "../../../../../components/layouts/Nav";
import Sidebar from "../../../../../components/layouts/Sidebar";
import Footer from "../../../../../components/layouts/Footer";
import {BASE_URL} from "../../../../../../lib/utils/const";
import Loading from "../../../../../components/layouts/parts/Loading";
import {toast} from "react-toastify";

const EditEpic = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Epic>();
  const router = useRouter();
  const {epicid} = router.query;

  const {data, error} = useSWR<Epic | undefined>(epicid ? `/api/epics/detail?epic_id=${epicid}` : null);
  if (error) return <div>failed to load epics</div>
  if (!data) return <Loading />

  const onSubmit: SubmitHandler<Epic> = data => {
    if (!confirm('編集してもよろしいですか？')) {
      return;
    }
    axios.put(`${BASE_URL}/epics/${epicid}`, data).then(() => {
      toast.success('エピックを編集しました。');
      return router.push(`projects/${data.project_id}/epics/${epicid}`);
    }).catch((err: any) => {
      alert(err)
    })
  };
  return (
    <>
      <Head>
        <title>エピック編集</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">エピック編集</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">エピック名</label>
                  <input
                    type="text"
                    {...register('epic_title', {maxLength: 64})}
                    defaultValue={data.epic_title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="エピック名"/>
                  {errors.epic_title && <span className="text-xs italic text-red-500">エピック名は必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ラベル</label>
                  <input
                    type="text"
                    {...register('label', {maxLength: 64})}
                    defaultValue={data.label}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ラベル"/>
                  {errors.label && <span className="text-xs italic text-red-500">ラベルは必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">マイルストーン</label>
                  <input
                    type="text"
                    readOnly
                    value={data.milestone_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="マイルストーン"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">担当者</label>
                  <input
                    {...register('assignee_id')}
                    defaultValue={data.assignee_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="担当者"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">プロジェクト</label>
                  <input
                    {...register('project_id')}
                    defaultValue={data.project_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="プロジェクト"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">解放フラグ</label>
                  <label htmlFor="toogleButton" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        defaultChecked={data.is_open}
                        {...register('is_open')}
                        id="toogleButton"
                        type="checkbox"
                        className="hidden"
                      />
                      <div
                        className="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                      />
                      <div
                        className="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    {...register('epic_description', {maxLength: 255})}
                    defaultValue={data.epic_description}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.epic_description && <span className="text-xs italic text-red-500">説明は必須です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Edit
              </button>
              <Link href={`/projects/${data.project_id}/epics`}>
                <button
                  type="submit"
                  className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back
                </button>
              </Link>
            </form>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default EditEpic;
