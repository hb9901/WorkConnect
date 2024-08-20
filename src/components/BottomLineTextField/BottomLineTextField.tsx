//TODO 수정 필요
import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import InputXCircleIcon from '../../icons/InputXCircle.svg';
import PencilIcon from '../../icons/Pencil.svg';
import Label from '../Label';

export interface BottomTextFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  onClick?: () => void;
}

const BottomLineTextField = ({
  id,
  label,
  labelClassName,
  className,
  onChange,
  LabelColor = 'grey700Black',
  value,
  type,
  ...props
}: BottomTextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');
  const valueRef = useRef(value);

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
      return <PencilIcon onClick={handleFocus} />;
    } else if (state === 'focus') {
      return null;
    } else if (state === 'typing') {
      return <InputXCircleIcon onClick={handleClickDelete} />;
    }
  };

  const inputClassNames = clsx(
    'py-[12px] px-[16px] pr-[40px] outline-none border-b',
    {
      'border-primary200Main': state === 'focus',
      'border-transparent': state !== 'focus'
    },
    className
  );

  return (
    <div className="relative flex flex-col gap-2 w-full" {...props}>
      {label && (
        <Label htmlFor={customId} color={LabelColor} className={clsx(labelClassName)}>
          {label}
        </Label>
      )}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          id={customId}
          value={value}
          type={type}
          className={inputClassNames}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            valueRef.current = e.target.value;
            onChange(e);
          }}
        />
        <span className="absolute right-3 transform cursor-pointer">{renderIcon()}</span>
      </div>
    </div>
  );
};

export default BottomLineTextField;
