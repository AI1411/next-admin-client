import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import axios from "axios";
import {BASE_URL} from "../../../lib/utils/const";
import {toast} from "react-toastify";

type RegisterParams = {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;
  password_confirmation: string;
};

const Register = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<RegisterParams>();
  const router = useRouter();
  const onSubmit: SubmitHandler<RegisterParams> = data => {
    data.age = Number(data.age);
    axios.post(`${BASE_URL}/auth/register`, data).then(() => {
      toast.success('登録しました。');
      return router.push('/users');
    }).catch(err => {
      alert(err);
    })
  };
  return (
    <div>
      <Head>
        <title>
          新規登録
        </title>
      </Head>
      <main className="bg-gray-50">
        <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
          <a href="https://demo.themesberg.com/windster/"
             className="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10">
            <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-10 mr-4"
                 alt="Windster Logo"/>
            <span className="self-center text-2xl font-bold whitespace-nowrap">Windster</span>
          </a>
          <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
            <div className="p-6 sm:p-8 lg:p-16 space-y-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Sign in to platform
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                    First Name</label>
                  <input
                    {...register('first_name', {required: true, maxLength: 64})}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="First Name"
                  />
                  {errors.first_name && <span className="text-xs italic text-red-500">名は必須です</span>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                    Last Name</label>
                  <input
                    {...register('last_name', {required: true, maxLength: 64})}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Last Name"
                  />
                  {errors.last_name && <span className="text-xs italic text-red-500">姓は必須です</span>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                    Age</label>
                  <input
                    {...register('age', {required: true, min: 18})}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="37"
                  />
                  {errors.age && <span className="text-xs italic text-red-500">年齢は必須です</span>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                    email</label>
                  <input
                    {...register('email', {required: true})}
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {errors.email && <span className="text-xs italic text-red-500">メールアドレスは必須です</span>}
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Your
                    password</label>
                  <input
                    {...register('password', {required: true})}
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                  {errors.password && <span className="text-xs italic text-red-500">パスワードは必須です</span>}
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Your
                    password confirm</label>
                  <input
                    {...register('password_confirmation', {required: true})}
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                  {errors.password_confirmation && <span className="text-xs italic text-red-500">パスワード確認は必須です</span>}
                </div>
                <button type="submit"
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Login
                  to your account
                </button>
                <div className="text-sm font-medium text-gray-500">
                  <Link href={"/login"}>
                    <a href="https://demo.themesberg.com/windster/authentication/sign-up/"
                       className="text-teal-500 hover:underline">すでに登録している方はこちら</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
