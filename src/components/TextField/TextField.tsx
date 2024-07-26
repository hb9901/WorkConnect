import Input from '../Input/Input'; // Input 컴포넌트를 적절히 import 해야 해
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
