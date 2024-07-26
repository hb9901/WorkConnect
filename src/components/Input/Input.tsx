import React from 'react';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id: string;
}

const Input = ({ id, type = 'text', value, className, ...props }: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      className={`px-[16px] py-[12px] border text-grey200 rounded-lg shadow-md focus:outline-none focus:border-2 focus:border-primary200Main ${className}`}
      {...props}
    />
  );
};

export default Input;
