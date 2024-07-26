'use client';
import { StrictPropsWithChildren } from '@/types/common';
import { useState } from 'react';

interface inputGroupProps {
  title: string;
}

const InputGroup = ({ title, children }: StrictPropsWithChildren<inputGroupProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-6 border-b-[1px] py-5 border-slate-200">
      <div className="flex flex-row justify-between">
        <div className="font-semibold">{title}</div>
        <button onClick={handleClick}>{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  );
};

export default InputGroup;
