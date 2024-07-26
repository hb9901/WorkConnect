import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  active?: boolean;
  as?: ElementType;
  className?: string;
}

interface TabsProps {
  children: ReactNode;
  className?: string;
}

const Tabs = ({ children, className, ...props }: TabsProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <nav
      className={clsx(
        `grid grid-cols-${childrenArray.length} gap-4 items-center justify-center text-center`,
        className
      )}
      {...props}
    >
      {childrenArray}
    </nav>
  );
};

const Tab = ({ children, active = false, as: Component = 'div', className, ...props }: TabProps) => {
  return (
    <Component
      className={clsx(
        ' flex items-center justify-center p-4 border-b-2 whitespace-nowrap',
        active ? 'text-primary200Main border-primary200Main' : 'border-transparent',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default { Tab, Tabs };
