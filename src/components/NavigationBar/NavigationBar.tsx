import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  active?: boolean;
  as?: ElementType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: ReactNode;
}

export interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export const NavigationBar = ({ children, className, ...props }: NavbarProps) => {
  return (
    <nav className={clsx('flex w-full px-4 pb-2', className)} {...props}>
      {React.Children.map(children, (child) => (
        <div className="flex-1">{child}</div>
      ))}
    </nav>
  );
};

export const Tab = ({
  children,
  className,
  onClick,
  active = false,
  as: Component = 'div',
  icon,
  ...props
}: TabProps) => {
  return (
    <Component
      className={`bg-white flex-1 flex text-center items-center justify-center border-t-4 text-[12px] pt-[14px] pb-[42px] cursor-pointer transition-colors duration-300 whitespace-nowrap min-w-[100px] ${
        active ? 'border-primary200Main text-primary200Main' : 'border-transparent text-grey500'
      }`}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-y-3">{children}</div>
    </Component>
  );
};
