import React, { useEffect, useRef, useState } from 'react';
import InputErrorIcon from '../../icons/InputError.svg';
import InputEyeIcon from '../../icons/InputEye.svg';
import InputSuccessIcon from '../../icons/InputSuccess.svg';
import InputXIcon from '../../icons/InputX.svg';
export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  status?: 'default' | 'error' | 'success';
  togglePasswordVisibility?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = ({
  id,
  type = 'text',
  value,
  className,
  status = 'default',
  togglePasswordVisibility = false,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState(value ? 'typing' : 'default');
  }, [value]);

  const handleIconClick = () => {
    if (togglePasswordVisibility === false) {
      setIsPasswordVisible((prev) => !prev);
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      setState('typing');
    } else {
      setState('default');
    }
  };

  const handleClickDelete = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const renderIcon = () => {
    if (status === 'error') {
      return <InputErrorIcon />;
    } else if (status === 'success') {
      return <InputSuccessIcon />;
    } else {
      switch (state) {
        case 'focus':
          if (type === 'password') {
            return <InputEyeIcon onClick={handleIconClick} />;
          }
        case 'typing':
          if (type === 'password') {
            return <InputEyeIcon onClick={handleIconClick} />;
          } else {
            return <InputXIcon onClick={handleClickDelete} />;
          }
        default:
          if (type === 'password') {
            return <InputEyeIcon onClick={handleIconClick} />;
          }
      }
    }
  };

  const getBorderClass = () => {
    if (state === 'focus') return 'border-primary200Main';
    if (state === 'typing') return 'border-grey700Black';
    if (status === 'error') return 'border-error';
    if (status === 'success') return 'border-grey700Black';
    return 'border-grey200';
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={isPasswordVisible && type === 'password' ? 'text' : type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        className={`px-[16px] py-[12px] pr-[40px] border rounded-lg shadow-md focus:outline-none text-[16px] w-full ${getBorderClass()}`}
        {...props}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">{renderIcon()}</span>
    </div>
  );
};

export default Input;
