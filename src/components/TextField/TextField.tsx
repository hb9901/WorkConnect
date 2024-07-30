import clsx from 'clsx';
import { useId, useState } from 'react';
import Input from '../Input/Input';
import Label from '../Label';
import Typography from '../Typography';

export interface TextFieldProps {
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string;
  isError: boolean;
  isSuccess: boolean;
  children: string;
  id: string;
  label: string;
  labelClassName?: string;
  LabelColor: 'primary200Main' | 'grey700Black' | 'error' | undefined;
  message: string;
  onFocus?: () => void;
  onBlur?: () => void;
  status?: 'default' | 'error' | 'success';
  type?: string;
}

const TextField = ({
  id,
  label,
  labelClassName,
  LabelColor = 'primary200Main',
  children,
  message,
  value,
  isError,
  isSuccess,
  onChange,
  onFocus,
  onBlur,
  status,
  type,
  ...props
}: TextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');

  const messageColor = isError ? 'error' : isSuccess ? 'success' : 'grey200';
  const labelColor = isError
    ? 'error'
    : state === 'focus'
      ? 'primary200Main'
      : state === 'typing'
        ? 'grey700Black'
        : LabelColor;
  const InputBorderColor = isError
    ? 'error'
    : state === 'focus'
      ? 'primary200Main'
      : state === 'typing'
        ? 'grey700Black'
        : 'grey200';

  const handleFocus = () => {
    setState('focus');
  };

  const handleBlur = () => {
    setState(value ? 'typing' : 'default');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setState(e.target.value ? 'typing' : 'default');
  };

  return (
    <div className="relative text-field flex flex-col gap-2">
      <Label htmlFor={customId} color={labelColor} className={clsx(labelClassName, 'mx-2')}>
        {label}
      </Label>
      <Input
        id={customId}
        value={value}
        type={type}
        className={`${isError ? 'border-error' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        status={status}
        {...props}
      />
      {message && (
        <Typography variant="Body14px" color={messageColor} className="px-[6px]">
          {message}
        </Typography>
      )}
    </div>
  );
};

export default TextField;
