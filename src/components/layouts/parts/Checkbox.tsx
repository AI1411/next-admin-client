import React, {ChangeEvent} from 'react';
import {useForm} from "react-hook-form";
import {Project} from "../../../types/projects";

interface BaseProps {
  onChange?(event: ChangeEvent): void;
}

interface ControlledProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: never;
  value: string;
}

interface UncontrolledProps extends BaseProps {
  checked?: never;
  defaultChecked?: boolean;
  value: string;
}

type Props = ControlledProps | UncontrolledProps;

const Checkbox: React.FC<Props> = (
  {
    checked,
    defaultChecked,
    value,
    onChange = () => {
    }
  }) => {
  const {register} = useForm<any>();
  return (
    <div className="flex">
      <label htmlFor="toogleButton" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            {...register(value)}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            id="toogleButton"
            type="checkbox"
            className="hidden"
          />
          <div
            className="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
          />
          <div
            className="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
          />
        </div>
      </label>
    </div>
  )
};

export default Checkbox;
