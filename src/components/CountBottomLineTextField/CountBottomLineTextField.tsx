import { ChangeEvent, useId, useState } from 'react';
import Typography from '../Typography';

export interface CountBottomLineTextFieldProps {
  className?: string;
  id?: string;
  label: string;
  labelClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  buttonTitle?: string;
  defaultValue?: string;
  onClick?: () => void;
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
    <div className="relative flex flex-col gap-[8px] w-full">
      <label htmlFor={customId} color={LabelColor} className={labelClassName}>
        <Typography variant="Title18px" color="grey700Black">
          {label}
        </Typography>
      </label>

      <input
        className="px-[8px] py-[12px] w-full border-[#7173FA] border-b-[1px] focus:outline-none"
        id={customId}
        value={inputValue}
        type={type}
        onChange={handelInputChange}
        placeholder={label}
        {...props}
      />
      <div className="flex flex-row w-full justify-end">
        <Typography variant="Subtitle14px" color="grey300">{`${textCount}/20`}</Typography>
      </div>
    </div>
  );
};

export default CountBottomLineTextField;
