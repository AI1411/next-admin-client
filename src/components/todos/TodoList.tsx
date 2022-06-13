import React from 'react';
import Paginator from "../../components/layouts/Paginator";

import TodoTableRow from "./TodoTableRow";
import {Todo} from "../../types/todo";

const TodoList = ({todos, handleDelete}: any) => {
  return (
    <main>
      <div className="flex flex-col mt-5">
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
                    タイトル
                  </th>
                  <th scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    ステータス
                  </th>
                  <th scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    本文
                  </th>
                  <th scope="col" className="p-4">
                  </th>
                  <th scope="col" className="p-4">
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {todos ? (
                  todos.map((todo: Todo) =>
                    <TodoTableRow todo={todo} handleDelete={handleDelete} />
                  )
                ) : (
                  <div className="hover:bg-gray-100 justify-center">
                    <p className={`my-3 mx-4`}>注文はありません</p>
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
  );
};

export default TodoList;
