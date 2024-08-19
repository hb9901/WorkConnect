import { useSnackBar } from '@/providers/SnackBarContext';
import clsx from 'clsx';
import { ChangeEvent, useEffect, useId, useRef, useState } from 'react';
import InputXIcon from '../../icons/InputX.svg';
import PencilIcon from '../../icons/Pencil.svg';
import Label from '../Label';
export interface EditTextFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  labelColor?: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  onClick?: () => void;
  isRequired?: boolean;
}

const EditTextField = ({
  id,
  label,
  labelClassName,
  className,
  onChange,
  labelColor = 'grey400',
  value,
  type = 'text',
  isRequired = false,
  ...props
}: EditTextFieldProps) => {
  const INPUT_REQUIRED_MAX = 20;
  const INPUT_MAX = 30;
  const { openSnackBar } = useSnackBar();
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
    onChange(event.target.value);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    valueRef.current = e.target.value;
    const value = e.target.value;
    if (isRequired && value.length > INPUT_REQUIRED_MAX) {
      openSnackBar({ message: '20자를 초과하였습니다' });
      return;
    }
    if (value.length > INPUT_MAX) {
      openSnackBar({ message: '30자를 초과하였습니다' });
      return;
    }
    onChange(value);
  };

  const renderIcon = () => {
    if (state === 'default') {
      return <PencilIcon onClick={handleFocus} />;
    } else if (state === 'focus') {
      return null;
    } else if (state === 'typing') {
      return <InputXIcon onClick={handleClickDelete} />;
    }
  };

  const inputClassNames = clsx({
    'bg-[#F5F6FF]': state === 'focus' || state === 'typing',
    'border-transparent': state !== 'focus'
  });

  return (
    <div className="relative flex flex-col gap-2 w-full" {...props}>
      {label && (
        <Label htmlFor={customId} color={labelColor} className={clsx('pl-1', labelClassName)}>
          {label}
          {isRequired && <span className="text-error"> (필수)</span>}
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
          onChange={handleInputChange}
        />
        <button className="w-5 h-5 mx-[2px] transform cursor-pointer">{renderIcon()}</button>
      </div>
    </div>
  );
};

export default EditTextField;
