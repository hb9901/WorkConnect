import Edit2Icon from '@/icons/Edit2.svg';
import Typography from '../Typography';

export interface TextFieldButtonProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  onClick?: () => void;
}

const TextFieldButton = ({
  label,
  onChange,
  onClick,
  LabelColor = 'grey700Black',
  value,
  type,
  ...props
}: TextFieldButtonProps) => {
  return (
    <button className="relative flex flex-col cursor-pointer w-full" {...props} onClick={onClick}>
      {label && (
        <Typography variant="Body14px" color="grey400" className="mb-2">
          {label}
        </Typography>
      )}
      <div className="flex flex-row items-center justify-between h-[48px] text-start w-full py-[12px] px-[16px]">
        <Typography variant="Subtitle16px" color="grey700Black" className="outline-none w-full pr-[20px]">
          {value}
        </Typography>
        <span className="absolute right-3 transform">
          <Edit2Icon className="stroke-[#2F323C]" />
        </span>
      </div>
    </button>
  );
};

export default TextFieldButton;
