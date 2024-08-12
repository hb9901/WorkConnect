import clsx from 'clsx';
import { ChangeEvent, useId, useState } from 'react';
import Label from '../Label';
import Typography from '../Typography';
export interface CountBottomLineTextFieldProps {
  className?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor?: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  buttonTitle?: string;
  defaultValue?: string;
  onClick?: () => void;
  placeholder?: string;
}

const CountBottomLineTextField = ({
  id,
  label,
  labelClassName,
  className,
  onChange,
  LabelColor = 'grey700Black',
  type,
  defaultValue,
  placeholder,
  ...props
}: CountBottomLineTextFieldProps) => {
  const initlength = defaultValue ? defaultValue.length : 0;
  const [textCount, setTextCount] = useState<number>(initlength);
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  const inputId = useId();
  const customId = id || inputId;

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 20) {
      setInputValue(newValue);
      setTextCount(newValue.length);
      onChange(e);
    }
  };

  return (
    <div className="relative flex flex-col gap-[8px] w-full" {...props}>
      {label && (
        <Label htmlFor={customId} color={LabelColor} className={clsx(labelClassName, className)}>
          {label}
        </Label>
      )}

      <div className="flex flex-row gap-3 border-[#7173FA] border-b-[1px] items-center">
        <input
          className="py-[12px] w-full focus:outline-none"
          id={customId}
          value={inputValue}
          type={type}
          onChange={handelInputChange}
          placeholder={placeholder}
          {...props}
        />
        <Typography variant="Subtitle14px" color="grey300">{`${textCount}/20`}</Typography>
      </div>
    </div>
  );
};

export default CountBottomLineTextField;
