import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../../../components/layouts/Nav";
import Sidebar from "../../../../../components/layouts/Sidebar";
import Link from "next/link";
import Footer from "../../../../../components/layouts/Footer";
import {Epic} from "../../../../../types/epic";
import Checkbox from "../../../../../components/layouts/parts/Checkbox";

const EpicDetail = () => {
  const router = useRouter();
  const {epicid} = router.query;

  const {data, error} = useSWR<Epic | undefined>(epicid ? `/api/epics/detail?epic_id=${epicid}` : null);
  if (error) return <div>failed to load epics</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>エピック詳細</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">エピック詳細</h1>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">エピック名</label>
                <input
                  type="text"
                  readOnly
                  value={data.epic_title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="エピック名"/>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ラベル</label>
                <input
                  type="text"
                  readOnly
                  value={data.label}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ラベル"/>
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
                  readOnly
                  value={data.assignee_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="担当者"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">プロジェクト</label>
                <input
                  readOnly
                  value={data.project_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="プロジェクト"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">解放フラグ</label>
                <Checkbox
                  checked={data.is_open}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                <textarea
                  readOnly
                  value={data.epic_description}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="説明"
                />
              </div>
            </div>
            <Link href={`/epics/${epicid}/edit`}>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Edit
              </button>
            </Link>
            <Link href={`/projects/${data.project_id}/epics`}>
              <button
                type="submit"
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

export default EpicDetail;
