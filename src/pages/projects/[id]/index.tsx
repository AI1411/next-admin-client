import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {Project} from "../../../types/projects";

const ProjectDetail = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR<Project | undefined>(id ? `/api/projects/detail?project_id=${id}` : null);
  if (error) return <div>failed to load projects</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>プロジェクト詳細</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">プロジェクト詳細</h1>
            <div className="gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label htmlFor="first_name"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">プロジェクト名</label>
                <input
                  type="text"
                  readOnly
                  value={data.project_title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="プロジェクト名"/>
              </div>
              <div className={`my-2`}>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  説明
                </label>
                <textarea
                  readOnly
                  rows={10}
                  value={data.project_description}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="説明"
                />
              </div>
            </div>
            <Link href={`/projects/${id}/edit`}>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
              >Edit
              </button>
            </Link>
            <Link href={`/projects`}>
              <button
                type="submit"
                className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Back
              </button>
            </Link>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
