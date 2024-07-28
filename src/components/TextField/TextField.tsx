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
  variant: 'primary' | 'grey' | 'error' | null | undefined;
  message: string;
}

const TextField = ({
  id,
  label,
  labelClassName,
  variant,
  children,
  message,
  value,
  isError,
  ...props
}: TextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;

  return (
    <div className="relative text-field">
      <Label htmlFor={customId} variant={variant} className={labelClassName}>
        {label}
      </Label>
      <Typography className="p-1" color="grey200">
        {children}
      </Typography>
      <Input id={customId} value={value} type="text" className={`border ${isError ? 'border-error' : ''}`} {...props} />
      {message && (
        <Typography variant="Body14px" color="error" className="p-1">
          {message}
        </Typography>
      )}
    </div>
  );
};

export default TextField;
