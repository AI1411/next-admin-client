import React from 'react';
import Head from "next/head";
import Nav from "../../components/layouts/Nav";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import {useForm, SubmitHandler, useFieldArray} from "react-hook-form";
import axios from 'axios';
import {useRouter} from "next/router";
import {BASE_URL} from "../../../lib/utils/const";
import {Order} from "../../types/order";
import {ORDER_STATUS} from "../../../lib/enums/status";
import useSWR from "swr";
import {User} from "../../types/user";
import AddOrderDetailForm from "../../components/orderDetails/AddOrderDetailForm";
import Loading from "../../components/layouts/parts/Loading";
import {toast} from "react-toastify";

const AddOrderForm: React.FC = () => {
  const {register, handleSubmit, formState: {errors}, control} = useForm<Order>();
  const {fields, append} = useFieldArray({
    control,
    name: 'order_details',
    keyName: 'key'
  })
  const router = useRouter();
  const onSubmit: SubmitHandler<Order> = data => {
    data.order_details.map((detail) => {
      detail.quantity = Number(detail.quantity);
      detail.price = Number(detail.price);
    })
    if (!confirm('注文を作成してもよろしいですか？')) {
      return;
    }
    data.quantity = Number(data.quantity);
    data.total_price = Number(data.total_price);
    axios.post(`${BASE_URL}/orders`, data).then((res: any) => {
      toast.success('注文を作成しました。');
      return router.push('/orders');
    }).catch((err: any) => {
      alert(err)
    })
  };

  const addOrderDetailForm = () => {
    append({
      'product_id': '',
      'price': 0,
      'quantity': 0,
      'order_detail_status': 'new',
    })
  }

  const {data, error} = useSWR<User[] | undefined>("/api/users/all");
  if (error) return <div>loading...</div>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>注文追加</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">注文追加</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="user_id"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ユーザ</label>
                  <select
                    defaultValue={``}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("user_id", {required: true})}>
                    {data?.map((user: User) =>
                      <option key={user.id} value={user.id}>{user.last_name + ' ' + user.first_name}</option>
                    )}
                  </select>
                  {errors.user_id && <span className="text-xs italic text-red-500">ユーザは必須です</span>}
                </div>
                <div>
                  <label htmlFor="total_price"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">合計金額</label>
                  <input type="text"
                         defaultValue={100}
                         {...register('total_price', {required: true, min: 100})}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="合計金額"/>
                  {errors.total_price && <span className="text-xs italic text-red-500">合計金額は必須です</span>}
                </div>
                <div>
                  <label htmlFor="total_price"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">注文ステータス</label>
                  <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("order_status", {required: true})}>
                    {ORDER_STATUS.map((status) =>
                      <option key={status.id} value={status.status_name}>{status.status_name}</option>
                    )}
                  </select>
                  {errors.order_status && <span className="text-xs italic text-red-500">注文ステータスは必須です</span>}
                </div>
                <div>
                  <label htmlFor="phone"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">数量</label>
                  <input
                    type="tel"
                    defaultValue={1}
                    {...register('quantity', {required: true, min: 1})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="数量"
                  />
                  {errors.quantity && <span className="text-xs italic text-red-500">数量は必須です</span>}
                </div>
                <div>
                  <label htmlFor="company"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">注文備考</label>
                  <textarea
                    defaultValue={undefined}
                    {...register('remarks', {maxLength: 255})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.remarks && <span className="text-xs italic text-red-500">注文備考は255文字以内です</span>}
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">注文明細追加</h1>
              <button
                type="button"
                onClick={addOrderDetailForm}
                data-modal-toggle="add-user-modal"
                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto mb-2"
              >
                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"/>
                </svg>
                Add
              </button>
              {fields.map((field, index) => (
                <AddOrderDetailForm
                  key={index}
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                />
              ))}
              {fields.length > 0 ? <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button> : ''}
            </form>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default AddOrderForm;
