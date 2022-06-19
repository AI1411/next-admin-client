import React from 'react';
import Head from "next/head";
import Nav from "../../components/layouts/Nav";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from 'axios';
import {useRouter} from "next/router";
import {BASE_URL} from "../../../lib/utils/const";
import {toast} from "react-toastify";

type Product = {
  product_name: string;
  product_name_required: string;
  price: number | null;
  remarks: string | null;
  quantity: number;
}

const AddProductForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Product>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Product> = data => {
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    axios.post(`${BASE_URL}/products`, data).then((res: any) => {
      toast.success('商品を追加しました。');
      return router.push('/products');
    }).catch((err: any) => {
      console.log(err)
    })
  };

  return (
    <>
      <Head>
        <title>商品追加</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">商品追加</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="first_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">商品名</label>
                  <input type="text"
                         {...register('product_name', {required: true, maxLength: 64})}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="商品名"/>
                  {errors.product_name && <span className="text-xs italic text-red-500">商品名は必須です</span>}
                </div>
                <div>
                  <label htmlFor="last_name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">価格</label>
                  <input type="text"
                         defaultValue={100}
                         {...register('price', {required: true, min: 0})}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="価格"/>
                  {errors.price && <span className="text-xs italic text-red-500">価格は必須です</span>}
                </div>
                <div>
                  <label htmlFor="phone"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">数量</label>
                  <input
                    type="tel"
                    defaultValue={1}
                    {...register('quantity', {required: true, min: 0})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="数量"
                  />
                  {errors.quantity && <span className="text-xs italic text-red-500">数量は必須です</span>}
                </div>
                <div>
                  <label htmlFor="company"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    defaultValue={undefined}
                    {...register('remarks', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.remarks && <span className="text-xs italic text-red-500">説明は255文字以内です</span>}
                </div>
              </div>
              <button type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
              </button>
            </form>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
