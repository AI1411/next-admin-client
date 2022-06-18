import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {SubmitHandler, useForm} from "react-hook-form";
import {Project} from "../../../types/projects";
import axios from "axios";
import {BASE_URL} from "../../../../lib/utils/const";
import Loading from "../../../components/layouts/parts/Loading";

const EditProject = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Project>();
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR(id ? `${BASE_URL}/projects/${id}` : null);
  if (error) return <div>failed to load projects</div>
  if (!data) return <Loading />

  const onSubmit: SubmitHandler<Project> = data => {
    if (!confirm('編集してもよろしいですか？')) {
      return;
    }
    axios.put(`${BASE_URL}/projects/${id}`, data).then(() => {
      return router.push(`/projects/${id}`);
    }).catch((err: any) => {
      alert(err)
    })
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="first_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">プロジェクト名</label>
                  <input
                    type="text"
                    defaultValue={data.project_title}
                    {...register('project_title', {required: true, maxLength: 64})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="プロジェクト名"
                  />
                  {errors.project_title && <span className="text-xs italic text-red-500">プロジェクト名は必須です</span>}
                </div>
                <div className={`my-2`}>
                  <label htmlFor="company"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    defaultValue={data.project_description}
                    {...register('project_description', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.project_description && <span className="text-xs italic text-red-500">説明は255文字以内です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Update
              </button>
              <Link href={`/projects`}>
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

export default EditProject;
