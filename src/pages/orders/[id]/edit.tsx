import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {BASE_URL} from "../../../../lib/utils/const";
import {Order} from "../../../types/order";

const EditOrder = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Order>();
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR(id ? `${BASE_URL}/orders/${id}` : null);
  if (error) return <div>failed to load orders</div>
  if (!data) return <div>loading...</div>

  const onSubmit: SubmitHandler<Order> = data => {
    data.quantity = Number(data.quantity);
    data.total_price = Number(data.total_price);
    axios.put(`${BASE_URL}/orders/${id}`, data).then(() => {
      return router.push(`/orders/${id}`);
    }).catch((err: any) => {
      alert(err)
    })
  };
  return (
    <>
      <Head>
        <title>注文編集</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">注文編集</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="first_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ユーザID</label>
                  <input
                    type="text"
                    defaultValue={data.user_id}
                    {...register('user_id', {required: true})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ユーザID"
                  />
                  {errors.user_id && <span className="text-xs italic text-red-500">ユーザIDは必須です</span>}
                </div>
                <div>
                  <label htmlFor="last_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">数量</label>
                  <input
                    type="text"
                    defaultValue={data.quantity}
                    {...register('quantity', {required: true, min: 0})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="数量"
                  />
                  {errors.quantity && <span className="text-xs italic text-red-500">数量は必須です</span>}
                </div>
                <div>
                  <label htmlFor="phone"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">合計金額</label>
                  <input
                    type="text"
                    defaultValue={data.total_price}
                    {...register('total_price', {required: true, min: 0})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="合計金額"
                  />
                  {errors.total_price && <span className="text-xs italic text-red-500">合計金額は必須です</span>}
                </div>
                <div>
                  <label htmlFor="phone"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ステータス</label>
                  <input
                    type="text"
                    defaultValue={data.order_status}
                    {...register('order_status', {required: true})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ステータス"
                  />
                  {errors.order_status && <span className="text-xs italic text-red-500">ステータスは必須です</span>}
                </div>
                <div>
                  <label
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">備考</label>
                  <textarea
                    defaultValue={data.remarks}
                    {...register('remarks', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="備考"
                  />
                  {errors.remarks && <span className="text-xs italic text-red-500">備考は255文字以内です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Update
              </button>
              <Link href={`/orders`}>
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

export default EditOrder;
