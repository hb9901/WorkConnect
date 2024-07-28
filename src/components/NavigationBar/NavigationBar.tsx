import { ElementType, ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  active?: boolean;
  as?: ElementType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface NavbarProps {
  children: ReactNode;
}

const NavigationBar = ({ children, ...props }: NavbarProps) => {
  return (
    <nav className="flex border-b border-gray-300 bg-white shadow-md w-full" {...props}>
      {children}
    </nav>
  );
};

const Tab = ({ children, active = false, as: Component = 'div', ...props }: TabProps) => {
  return (
    <Component
      className={`flex-1 flex items-center justify-center h-12 px-6 cursor-pointer transition-colors duration-300 ${
        active ? 'border-b-2 border-primary200Main text-primary200Main' : 'border-b-2 border-transparent text-gray-600'
      }`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default { Tab, NavigationBar };
