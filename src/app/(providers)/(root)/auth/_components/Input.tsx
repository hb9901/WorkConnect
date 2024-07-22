type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <>
      <input
        className="w-full border border-gray-800 px-2 py-1 rounded-md"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
