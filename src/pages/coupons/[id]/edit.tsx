import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Nav from "../../../components/layouts/Nav";
import Sidebar from "../../../components/layouts/Sidebar";
import Footer from "../../../components/layouts/Footer";
import Link from 'next/link';
import {BASE_URL} from "../../../../lib/utils/const";
import {Coupon} from "../../../types/coupon";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {DatePicker} from "../../../components/datepicker";
import Loading from "../../../components/layouts/parts/Loading";
import {toast} from "react-toastify";

const CouponEdit = () => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<Coupon>();
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR<Coupon | undefined>(id ? `${BASE_URL}/coupons/${id}` : null);
  if (error) return <div>failed to load coupons</div>
  if (!data) return <Loading />

  const onSubmit: SubmitHandler<Coupon> = data => {
    if (!confirm('編集しますか？')) {
      return;
    }
    data.discount_amount = Number(data.discount_amount);
    data.discount_rate = Number(data.discount_rate);
    data.max_discount_amount = Number(data.max_discount_amount);
    axios.put(`${BASE_URL}/coupons/${id}`, data).then(() => {
      toast.success('クーポンを編集しました。');
      return router.push(`/coupons/${id}`);
    }).catch((err: any) => {
      console.log(err)
    })
  };
  return (
    <>
      <Head>
        <title>クーポン編集</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main className="py-10 px-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">クーポン編集</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">タイトル</label>
                  <input
                    type="text"
                    defaultValue={data.title}
                    {...register('title', {required: true, maxLength: 64})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="タイトル"
                  />
                  {errors.title && <span className="text-xs italic text-red-500">タイトルは必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">値引額</label>
                  <input
                    type="text"
                    defaultValue={data.discount_amount}
                    {...register('discount_amount', {min: 1})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="値引額"
                  />
                  {errors.discount_amount && <span className="text-xs italic text-red-500">値引額は1以上です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">割引率</label>
                  <input
                    type="text"
                    defaultValue={data.discount_rate}
                    {...register('discount_rate', {min: 1})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="割引率"
                  />
                  {errors.discount_rate && <span className="text-xs italic text-red-500">割引率は1以上です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">最大値引額</label>
                  <input
                    type="text"
                    defaultValue={data.max_discount_amount}
                    {...register('max_discount_amount', {min: 1})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="最大値引額"
                  />
                  {errors.max_discount_amount && <span className="text-xs italic text-red-500">最大値引額は1以上です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">利用開始日</label>
                  <DatePicker
                    name="use_start_at"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    control={control}
                    error={errors.use_start_at?.message}
                  />
                  {errors.use_start_at && <span className="text-xs italic text-red-500">利用開始日は必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">利用終了日</label>
                  <DatePicker
                    name="use_end_at"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    control={control}
                    error={errors.use_end_at?.message}
                  />
                  {errors.use_end_at && <span className="text-xs italic text-red-500">利用終了日は必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">利用終了日</label>
                  <DatePicker
                    name="public_start_at"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    control={control}
                    error={errors.public_start_at?.message}
                  />
                  {errors.public_start_at && <span className="text-xs italic text-red-500">公開開始日は必須です</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">公開終了日</label>
                  <DatePicker
                    name="public_end_at"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    control={control}
                    error={errors.public_end_at?.message}
                  />
                  {errors.public_end_at && <span className="text-xs italic text-red-500">公開終了日は必須です</span>}
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    defaultValue={data.is_public}
                    {...register('is_public')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    公開フラグ
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    defaultValue={data.is_premium}
                    {...register('is_premium')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    プレミアムフラグ
                  </label>
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">説明</label>
                  <textarea
                    defaultValue={data.remarks}
                    {...register('remarks', {required: true})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="説明"
                  />
                  {errors.remarks && <span className="text-xs italic text-red-500">説明は必須です</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Update
              </button>
              <Link href={`/coupons`}>
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

export default CouponEdit;
