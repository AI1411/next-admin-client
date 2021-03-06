import React from 'react';
import Sidebar from "../../components/layouts/Sidebar";
import Nav from "../../components/layouts/Nav";
import Footer from "../../components/layouts/Footer";
import Paginator from "../../components/layouts/Paginator";

import useSWR from 'swr';
import {Product} from "../../types/product";
import Head from "next/head";
import Link from 'next/link';
import ProductTableRow from "../../components/products/ProductTableRow";
import {BASE_URL} from "../../../lib/utils/const";
import axios from "axios";
import Breadcrumbs from "../../components/layouts/Breadcrumbs";
import Loading from "../../components/layouts/parts/Loading";
import {parseCookies} from "nookies";
import {NextPageContext} from "next";

const breadcrumbs = [
  {
    id: 1,
    name: 'Home',
    route: '/',
    is_disabled: false
  },
  {
    id: 2,
    name: "List",
    route: '',
    is_disabled: true
  }
]

const Products = (ctx?: NextPageContext) => {
  const {data, error} = useSWR<Product[] | undefined>("/api/products/all");
  if (error) return <div>failed to load products</div>
  if (!data) return <Loading />

  const deleteProduct = (e: any) => {
    if (!confirm('この商品を削除してもよろしいですか？')) {
      return;
    }
    const id = e.target.value;
    const cookie = parseCookies(ctx);
    axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cookie.jwt}`
      },
      withCredentials: true,
    }).then(() => {
      alert('商品を削除しました');
    }).catch(err => {
      alert(err);
    })
  }
  return (
    <div>
      <Head>
        <title>商品一覧</title>
      </Head>
      <Nav/>
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
            <div
              className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
              <div className="mb-1 w-full">
                <Breadcrumbs title={`products`} breadcrumbs={breadcrumbs} />
                <div className="sm:flex">
                  <div
                    className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                      <label className="sr-only">Search</label>
                      <div className="mt-1 relative lg:w-64 xl:w-96">
                        <input type="text" name="email" id="users-search"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               placeholder="Search for products"/>
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <Link href={`/products/add`}>
                      <button type="button" data-modal-toggle="add-user-modal"
                              className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"/>
                        </svg>
                        Add product
                      </button>
                    </Link>
                    <a href="#"
                       className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                      <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                              clipRule="evenodd"/>
                      </svg>
                      Export
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                    <table className="table-fixed min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1"
                                   type="checkbox"
                                   className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          商品名
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          価格
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          説明
                        </th>
                        <th scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                          数量
                        </th>
                        <th scope="col" className="p-4">
                        </th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                      {data.length !== 0 ? (
                        data.map((product: Product) =>
                          <ProductTableRow handleDelete={deleteProduct} product={product} key={product.id}/>
                        )
                      ) : (
                        <div className="hover:bg-gray-100 justify-center">
                          <p className={`my-3 mx-4`}>商品はありません</p>
                        </div>
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Paginator/>
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Products;
