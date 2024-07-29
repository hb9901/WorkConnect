import clsx from 'clsx';
import { useId } from 'react';
import Input from '../Input/Input';
import Label from '../Label';
import Typography from '../Typography';

interface TextFieldProps {
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string;
  isError: boolean;
  children: string;
  id: string;
  label: string;
  labelClassName?: string;
  color: 'primary200Main' | 'grey700Black' | 'error' | undefined;
  message: string;
}

const TextField = ({
  id,
  label,
  labelClassName,
  color = 'primary200Main',
  children,
  message,
  value,
  isError,
  ...props
}: TextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;

  return (
    <div className="relative text-field flex flex-col gap-2">
      <Label htmlFor={customId} color={color} className={clsx(labelClassName, 'mx-2')}>
        {label}
      </Label>
      <Input id={customId} value={value} type="text" className={`${isError ? 'border-error' : ''}`} {...props} />
      {message && (
        <Typography variant="Body14px" color="error" className="p-1">
          {message}
        </Typography>
      )}
    </div>
  );
};

export default TextField;
