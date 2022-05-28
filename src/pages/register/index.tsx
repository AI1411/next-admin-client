import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
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
            <form className="mt-8 space-y-6" action="#">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                  First Name</label>
                <input type="text" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                       placeholder="First Name"/>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                  Last Name</label>
                <input type="text" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                       placeholder="Last Name"/>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                  Age</label>
                <input type="text" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                       placeholder="37"/>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your
                  email</label>
                <input type="email" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                       placeholder="name@company.com"/>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Your
                  password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" name="remember" type="checkbox"
                         className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                  />
                </div>
                <div className="text-sm ml-3">
                  <label htmlFor="remember" className="font-medium text-gray-900">Remember me</label>
                </div>
                <a href="#" className="text-sm text-teal-500 hover:underline ml-auto">Lost Password?</a>
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
  );
};

export default Register;
