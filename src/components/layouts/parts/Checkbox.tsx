import React, {ChangeEvent} from 'react';

interface Props {
  checked?: boolean;
  defaultChecked?: boolean;

  onChange?(event: ChangeEvent): void;
}

const Checkbox: React.FC<Props> = (
  {
    checked,
    defaultChecked = false,
    onChange = () => {
    }
  }) => (
  <div className="flex">
    <label htmlFor="toogleButton" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={event => onChange(event)}
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
);

export default Checkbox;
