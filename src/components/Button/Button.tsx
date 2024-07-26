import clsx from 'clsx';
import React from 'react';

type ButtonTheme = 'primary200' | 'primary300' | 'grey50' | 'grey200' | 'text' | 'underlineText';

interface ButtonProps {
  className?: string;
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

const Button = ({ className, theme, children, isDisabled, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx('rounded-md w-full', color[theme], className, { [disabledStyle]: isDisabled })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
