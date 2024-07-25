type ButtonTheme = 'primary200' | 'primary300' | 'grey50' | 'grey200' | 'text' | 'underlineText'; // key

interface ButtonProps {
  theme: ButtonTheme;
  children: string;
  isDisabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const primary200 = 'bg-primary200Main text-white';
const primary300 = 'bg-primary300 text-white';
const grey50 = 'bg-grey50 text-grey700Black';
const grey200 = 'bg-grey200 text-grey700Black';
const text = 'bg-transparent text-grey700Black';
const underlineText = 'bg-transparent text-grey700Black underline';
const disabledStyle = 'disabled:bg-mono200 disabled:text-white opacity-35';

const color: Record<ButtonTheme, string> = {
  primary200,
  primary300,
  grey50,
  grey200,
  text,
  underlineText
};

const Button = ({ theme, children, isDisabled, onClick }: ButtonProps) => {
  return (
    <button
      className={`rounded-md w-full h-[59px] ${color[theme]} ${isDisabled ? disabledStyle : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
