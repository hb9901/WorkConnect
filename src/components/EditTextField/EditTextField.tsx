import clsx from 'clsx';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import Label from '../Label';

export interface EditTextFieldProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  labelColor?: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  onClick?: () => void;
}

const EditTextField = ({
  id,
  label,
  labelClassName,
  className,
  onChange,
  labelColor = 'grey400',
  children,
  value,
  type = 'text',
  ...props
}: EditTextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');
  const valueRef = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    valueRef.current = value;
    setState(value ? 'typing' : 'default');
  }, [value]);

  const handleClickDelete = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setState('focus');
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (valueRef.current) {
      setState('typing');
    } else {
      setState('default');
    }
  };

  const renderIcon = () => {
    if (state === 'default') {
      return (
        <svg
          onClick={handleFocus}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2962_7388)">
            <path
              d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z"
              stroke="#737B91"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2962_7388">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    } else if (state === 'focus') {
      return null;
    } else if (state === 'typing') {
      return (
        <svg
          onClick={handleClickDelete}
          width="11"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1.5L1 9.5M1 1.5L9 9.5"
            stroke="#737B91"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

  const inputClassNames = clsx({
    'bg-[#F5F6FF]': state === 'focus' || state === 'typing',
    'border-transparent': state !== 'focus'
  });

  return (
    <div className="relative flex flex-col gap-2 w-full" {...props}>
      {label && (
        <Label htmlFor={customId} color={labelColor} className={clsx('pl-1', labelClassName, className)}>
          {label}
        </Label>
      )}
      <div
        className={clsx('flex flex-row items-center w-full gap-1 px-1 hover:bg-[#F5F6FF] rounded-md', inputClassNames)}
      >
        <input
          ref={inputRef}
          id={customId}
          value={value}
          type={type}
          className={clsx('flex-1 pl-2 py-[12px] w-[calc(100% - 9px)] outline-none bg-transparent h-[45px]', className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            valueRef.current = e.target.value;
            onChange(e);
          }}
        />
        <button className="w-5 h-5 mx-[2px] transform cursor-pointer">{renderIcon()}</button>
      </div>
    </div>
  );
};

export default EditTextField;
