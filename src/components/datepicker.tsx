import 'react-datepicker/dist/react-datepicker.css';

import React, {useState} from "react";
import ReactDatePicker from 'react-datepicker';
import {Control, Controller, Path} from 'react-hook-form'

type Props<T> = {
  name: Path<T>;
  className?: string;
  error?: string;
  control: Control<T>
  timeIntervals?: number;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = <T, >(
  {
    name,
    className,
    control,
    error,
    timeIntervals = 15,
    minDate,
    maxDate,
  }: Props<T>) => {
  return (
    <>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              className={className}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              timeIntervals={timeIntervals}
              onChange={onChange}
              selected={value as Date}
              minDate={minDate as Date}
              maxDate={maxDate as Date}
              isClearable
            />
          )}
        />
      </div>
      <span>{error}</span>
    </>
  )
}
