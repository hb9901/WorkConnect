import { StrictPropsWithChildren } from '@/types/common';
import clsx from 'clsx';

export const ResponseContainer = ({ children }: StrictPropsWithChildren) => {
  return <div className="lg:pl-[87px] lg:flex">{children}</div>;
};

export const ResponseList = ({ children, className }: StrictPropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={clsx(
        'w-full lg:max-w-[300px] lg:max-h-dvh lg:overflow-y-scroll lg:flex-shrink-0 lg:scroll-container',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ResponseContent = ({
  children,
  isFullWidth = true
}: StrictPropsWithChildren<{ isFullWidth?: boolean }>) => {
  return <div className={clsx(isFullWidth ? 'w-full' : 'lg:w-[calc(100%-300px)]')}>{children}</div>;
};
