import { ElementType, ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  active?: boolean;
  as?: ElementType;
}

interface TabsProps {
  children: ReactNode;
}

const Tabs = ({ children, ...props }: TabsProps) => {
  return (
    <nav className="flex border-b border-gray-300" {...props}>
      {children}
    </nav>
  );
};

const Tab = ({ children, active = false, as: Component = 'div', ...props }: TabProps) => {
  return (
    <Component
      className={`flex items-center justify-center h-12 px-6 border-b-2 ${
        active ? 'border-black' : 'border-transparent'
      }`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default { Tab, Tabs };
