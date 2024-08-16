import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import InputXIcon from '../../icons/InputX.svg';
import PencilIcon from '../../icons/Pencil.svg';
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
      return <Image src={PencilIcon} onClick={handleFocus} alt="Pencil Icon" />;
    } else if (state === 'focus') {
      return null;
    } else if (state === 'typing') {
      return <Image src={InputXIcon} onClick={handleClickDelete} alt="X Icon" />;
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
