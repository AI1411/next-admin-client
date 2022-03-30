import React from 'react';

const Login = () => {
    return (
        <div
            className="min-h-screen bg-slate-200 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
            <span
                className="border text-4xl text-yellow-800 px-6 pt-10 pb-8 bg-white w-1/2 max-w-md mx-auto rounded-t-md sm:px-10">Sign in Form</span>
            <div
                className="border relative px-4 pt-7 pb-8 bg-white shadow-xl w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md">
                <form action="">
                    <label htmlFor="" className="block">Username or Email</label>
                    <input type="Email" className="border w-full h-10 px-3 mb-5 rounded-md"
                           placeholder="Username or Email"/>
                    <label htmlFor="" className="block">Password</label>
                    <input type="password" className="border w-full h-10 px-3 mb-5 rounded-md"
                           placeholder="password"/>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center">
                                <input id="remember" aria-describedby="remember" type="checkbox"
                                       className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                />
                            </div>
                            <div className="text-sm ml-3">
                                <label htmlFor="remember" className="font-medium text-gray-900">Remember
                                    me</label>
                            </div>
                        </div>
                        <a href="#"
                           className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">Lost
                            Password?</a>
                    </div>
                    <button
                        className="mt-5 bg-green-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded">Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
