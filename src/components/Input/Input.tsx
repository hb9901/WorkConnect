import React from 'react';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id: string;
}

const Input = ({ id, type = 'text', placeholder, value, onChange, className }: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 px-3 border text-grey200 rounded-lg shadow-md focus:outline-none focus:border-2 focus:border-primary200Main ${className}`}
    />
  );
};

export default Input;
