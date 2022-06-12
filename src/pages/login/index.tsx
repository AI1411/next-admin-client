import React from 'react';
import Head from "next/head";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import axios from "axios";
import {BASE_URL} from "../../../lib/utils/const";
import Link from 'next/link';
import {setCookie} from 'nookies';
import useSWR from "swr";

type LoginParams = {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<LoginParams>();
  const onSubmit: SubmitHandler<LoginParams> = async data => {
    await axios.post(`${BASE_URL}/auth/login`, data).then((res: any) => {
      setCookie(null, 'jwt', res.data.value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      return router.push('/users');
    }).catch(err => {
      alert(err);
    })
  };

  const {data, error} = useSWR("/api/auth/me");
  if (error) return <div>loading...</div>
  if (!data) return <div>loading...</div>
  if (data.message === 'its me!') {
    router.push('/').then(r => {
      if (!r) {
        alert('遷移失敗')
      }
    });
  }
  return (
    <div>
      <Head>
        <title>
          ログイン
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
                    type="password"
                    {...register('password', {required: true})}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                  {errors.password && <span className="text-xs italic text-red-500">パスワードは必須です</span>}
                </div>
                <button type="submit"
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Login
                  to your account
                </button>
                <div className="text-sm font-medium text-gray-500">
                  Not registered?
                  <Link href={`/register`}>
                    <a className="text-teal-500 hover:underline">
                      Create account
                    </a>
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

export default Login;
