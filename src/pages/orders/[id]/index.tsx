import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import OrderDetailList from "../../../components/orderDetails/OrderDetailList";
import axios from "axios";
import {BASE_URL} from "../../../../lib/utils/const";
import Loading from "../../../components/layouts/parts/Loading";
import {parseCookies} from "nookies";
import {NextPageContext} from "next";

const ProductDetail = (ctx?: NextPageContext) => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR(id ? `/api/orders/detail?order_id=${id}` : null);
  if (error) return <div>failed to load order...</div>
  if (!data) return <Loading />

  const deleteOrderDetail = (e: any) => {
    if (!confirm('この注文明細を削除してもよろしいですか？')) {
      return;
    }
    const id = e.target.value;
    const cookie = parseCookies(ctx);
    axios.delete(`${BASE_URL}/orderDetails/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cookie.jwt}`
      },
      withCredentials: true,
    }).then(() => {
      alert('注文を削除しました');
    }).catch(err => {
      alert(err);
    })
  }
  return (
    <>
      <Head>
        <title>注文詳細</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">注文詳細</h1>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label htmlFor="first_name"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">注文ID</label>
                <input
                  type="text"
                  readOnly
                  value={data.user_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ユーザID"/>
              </div>
              <div>
                <label htmlFor="last_name"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">数量</label>
                <input
                  type="text"
                  readOnly
                  value={data.quantity}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="数量"/>
              </div>
              <div>
                <label htmlFor="phone"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">合計金額</label>
                <input
                  type="text"
                  readOnly
                  value={data.total_price}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="合計金額"
                />
              </div>
              <div>
                <label htmlFor="phone"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ステータス</label>
                <input
                  type="text"
                  readOnly
                  value={data.order_status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ステータス"
                />
              </div>
              <div>
                <label htmlFor="company"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">備考</label>
                <textarea
                  readOnly
                  value={data.remarks}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="備考"
                />
              </div>
            </div>
            <Link href={`/orders/${id}/edit`}>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Edit
              </button>
            </Link>
            <Link href={`/orders`}>
              <button
                type="submit"
                className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back
              </button>
            </Link>
            {data.order_details.length > 0
              ? <OrderDetailList
                orderDetails={data.order_details}
                handleDelete={deleteOrderDetail}
              />
              : <div>test</div>}
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
