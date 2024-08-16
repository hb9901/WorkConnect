import React, { useState } from 'react';
import XCircleIcon from '../../icons/InputXCircle.svg';
import Label from '../Label';
import Typography from '../Typography';

export interface CountTextFieldProps {
  label?: string;
  children?: string;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const CountTextField = ({
  label,
  children,
  placeholder,
  maxLength = 20,
  value = '',
  onChange
}: CountTextFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <Label className="mx-[4px]">
        <Typography variant="Body14px" color="grey700Black">
          {label}
          <span className="text-error"> (필수)</span>
        </Typography>
      </Label>
      <div
        className={`flex items-center border rounded-md p-3 my-[8px] transition-all duration-200 text-ellipsis line-clamp-1 ${
          isFocused ? 'border-primary200Main' : 'border-gray-300'
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          children={children}
          className="flex w-full outline-none bg-transparent"
        />
        {value && (
          <button onClick={() => onChange('')} className="flex pl-2">
            <XCircleIcon />
          </button>
        )}
      </div>
      <Typography variant="Body14px" color="grey300" className="text-right">
        {value.length}/{maxLength}
      </Typography>
    </div>
  );
};

export default CountTextField;
