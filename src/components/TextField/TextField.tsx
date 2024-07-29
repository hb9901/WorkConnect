import { useId } from 'react';
import Input from '../Input/Input';
import Typography from '../Typography';

interface TextFieldProps {
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string;
  isError: boolean;
  children: string;
  id: string;
  message: string;
}

const TextField = ({ id, children, message, value, isError, ...props }: TextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;

  return (
    <div className="relative text-field">
      {/* 형빈님 Label 컴포넌트 받아서 넣을 예정 - 라벨로 바꿔주세요 */}
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
