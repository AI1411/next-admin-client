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
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div>
        <Controller
          control={control}
          name={name}
          render={() => (
            <ReactDatePicker
              className={className}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              timeIntervals={timeIntervals}
              onChange={(date) => setStartDate(date as Date)}
              selected={startDate as Date}
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
