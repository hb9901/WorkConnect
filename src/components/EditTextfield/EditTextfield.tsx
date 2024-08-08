import { ReactNode, useRef, useState } from 'react';
import Typography from '../Typography';

export interface EditTextfieldProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
}

const EditTextfield = ({
  label,
  className,
  onChange,
  LabelColor = 'grey700Black',
  children,
  value,
  type = 'text',
  ...props
}: EditTextfieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <Typography variant="Body14px" color="grey400" className="mb-2">
          {label}
        </Typography>
      )}
      <div className="flex flex-row items-center justify-between h-[48px] text-start w-full py-[12px] px-[16px] border-b border-grey50">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={!isEditing}
          onBlur={handleBlur}
          className={`outline-none w-full pr-[20px] bg-transparent ${className}`}
          {...props}
        />
        <span className="absolute right-3 transform cursor-pointer" onClick={handleIconClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Size=16" clip-path="url(#clip0_2637_3201)">
              <path
                id="Icon"
                d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8256 1.82494 14.0007 2.00004C14.1757 2.17513 14.3146 2.383 14.4094 2.61178C14.5042 2.84055 14.5529 3.08575 14.5529 3.33337C14.5529 3.58099 14.5042 3.82619 14.4094 4.05497C14.3146 4.28374 14.1757 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z"
                stroke="#2F323C"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2637_3201">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EditTextfield;
