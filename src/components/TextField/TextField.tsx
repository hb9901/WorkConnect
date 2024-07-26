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
}

const TextField = ({ id, children, errorMessage, onChange, placeholder, value, isError }: TextFieldProps) => {
  return (
    <div className="relative text-field">
      {/* 형빈님 Label 컴포넌트 받아서 넣을 예정 */}
      <Typography className="p-1" color="grey200">
        {children}
      </Typography>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={onChange}
        className={`border ${isError ? 'border-error' : ''}`}
      />
      {isError && (
        <Typography variant="Body14px" color="error" className="p-1">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default TextField;
