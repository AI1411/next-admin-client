import React, {MouseEventHandler} from 'react';
import {ORDER_STATUS} from "../../../lib/enums/status";

type Props = {
  onclickPrevious?: MouseEventHandler;
  onclickNext?: MouseEventHandler;
  onChangeLimit?: any
}

type selectValuesProps = {
  id: number | string;
  value: number | string;
  label: string;
}

const selectValues: selectValuesProps[] = [
  {
    id: 1,
    value: 5,
    label: '5'
  },
  {
    id: 2,
    value: 10,
    label: '10'
  },
  {
    id: 3,
    value: 25,
    label: '25'
  }
];

const Paginator = ({onclickPrevious, onclickNext, onChangeLimit}: Props) => {
  return (
    <div
      className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <a href="#"
           className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"/>
          </svg>
        </a>
        <a href="#"
           className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"/>
          </svg>
        </a>
        <span className="text-sm font-normal text-gray-500">Showing <span
          className="text-gray-900 font-semibold">1-20</span> of <span
          className="text-gray-900 font-semibold">2290</span></span>
      </div>
      <div className="flex items-center space-x-3">
        <select
          onChange={onChangeLimit}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          {selectValues.map((sv: selectValuesProps) =>
            <option key={sv.id} value={sv.value}>{sv.label}</option>
          )}
        </select>
        <button
          onClick={onclickPrevious}
          className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
          <svg className="-ml-1 mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"/>
          </svg>
          Previous
        </button>
        <button
          onClick={onclickNext}
          className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
          Next
          <svg className="-mr-1 ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Paginator;
