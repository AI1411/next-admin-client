import React from 'react';
import {ORDER_STATUS} from "../../../lib/enums/status";

const AddOrderDetailForm = ({index, register, errors}: any) => {
  return (
    <>
      <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        明細{index + 1}
      </label>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label htmlFor="product_id"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">商品ID</label>
          <input
            type="text"
            defaultValue={100}
            {...register(`order_details.${index}.product_id`, {required: true})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="合計金額"
          />
          {errors.product_id && <span className="text-xs italic text-red-500">商品IDは必須です</span>}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            価格
          </label>
          <input
            type="text"
            defaultValue={1}
            {...register(`order_details.${index}.price`, {required: true, min: 1})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="価格"
          />
          {errors.quantity && <span className="text-xs italic text-red-500">価格は必須です</span>}
        </div>
        <div>
          <label htmlFor="quantity"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">数量</label>
          <input
            type="text"
            defaultValue={1}
            {...register(`order_details.${index}.quantity`, {required: true, min: 1})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="数量"
          />
          {errors.quantity && <span className="text-xs italic text-red-500">数量は必須です</span>}
        </div>
        <div>
          <label htmlFor="order_detail_status"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">注文明細ステータス</label>
          <select
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            {...register(`order_details.${index}.order_detail_status`, {required: true})}>
            {ORDER_STATUS.map((status) =>
              <option key={status.id} value={status.status_name}>{status.status_name}</option>
            )}
          </select>
          {errors.order_detail_status && <span className="text-xs italic text-red-500">注文明細ステータスは必須です</span>}
        </div>
      </div>
      <hr className={`mb-3`}/>
    </>
  );
};

export default AddOrderDetailForm;
