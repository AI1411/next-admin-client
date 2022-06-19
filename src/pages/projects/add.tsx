import React from 'react';
import Head from "next/head";
import Nav from "../../components/layouts/Nav";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';
import {useRouter} from "next/router";
import {BASE_URL} from "../../../lib/utils/const";
import {Project} from "../../types/projects";
import Link from "next/link";
import {toast} from "react-toastify";

const AddProjectForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Project>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Project> = data => {
    if (!confirm('プロジェクトを追加しますか？')) {
      return;
    }
    axios.post(`${BASE_URL}/projects`, data).then((res: any) => {
      toast.success('プロジェクトを作成しました。');
      return router.push('/projects');
    }).catch((err: any) => {
      alert(err)
    });
  };

  return (
    <>
      <Head>
        <title>プロジェクト追加</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">プロジェクト追加</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="first_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">プロジェクト名</label>
                  <input type="text"
                         {...register('project_title', {required: true, maxLength: 64})}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="プロジェクト名"/>
                  {errors.project_title && <span className="text-xs italic text-red-500">プロジェクト名は必須です</span>}
                </div>
                <div>
                  <label htmlFor="company"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    rows={10}
                    defaultValue={undefined}
                    {...register('project_description', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.project_description && <span className="text-xs italic text-red-500">説明は255文字以内です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
              </button>
              <Link href={`/projects`}>
                <button
                  type="submit"
                  className="ml-2 text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back
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

export default AddProjectForm;
