'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { StrictPropsWithChildren } from '@/types/common';
import clsx from 'clsx';
import BottomNavigationBar from '../../BottomNavigationBar';
import SelectHeader from '../SelectHeader';

interface HomeOrTodoProps {
  isFull?: boolean;
  isHome?: boolean;
  isTodo?: boolean;
}

export const PageLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PCWrapper>
      <PCHeader />
      {children}
    </PCWrapper>
  );
};

export const PageAside = ({ children, className }: StrictPropsWithChildren & { className?: string }) => {
  return (
    <aside
      className={clsx(
        `hidden lg:block bg-[#F4F4F6] w-[300px] h-[100dvh] lg:pt-[84px] overflow-hidden lg:overflow-y-scroll lg:flex-shrink-0 lg:scroll-container lg:sticky lg:top-0`,
        className
      )}
    >
      {children}
    </aside>
  );
};

export const PageMain = ({ children, className }: StrictPropsWithChildren & { className?: string }) => {
  return (
    <main
      className={clsx(
        'w-full lg:w-[calc(100%-300px)] overflow-hidden lg:h-dvh lg:overflow-y-scroll lg:scroll-container',
        className
      )}
    >
      {children}
    </main>
  );
};

export const PCWrapper = ({ isHome = false, children }: StrictPropsWithChildren<HomeOrTodoProps>) => {
  return <div className={`${isHome ? '' : 'lg:pl-[85px] lg:flex'}`}>{children}</div>;
};

export const PCHeader = ({
  isFull = false,
  isTodoList = false,
  isChannels = false,
  className
}: {
  isFull?: boolean;
  isTodoList?: boolean;
  isChannels?: boolean;
  className?: string;
}) => {
  const workspaceId = useWorkspaceId();

  return (
    <SelectHeader
      workspaceId={workspaceId}
      isFull={isFull}
      isTodoList={isTodoList}
      isChannels={isChannels}
      className={clsx('hidden !fixed top-0 left-0 z-30 lg:block', className)}
    />
  );
};

export const BottomBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="h-[78px] lg:hidden" />
      <BottomNavigationBar className="fixed bottom-0 left-0 z-10 xs:w-full w-full lg:top-0 lg:pt-[84px] lg:w-[85px] lg:h-[vh100%] lg:bg-[#F4F4F6] lg:border-r-[1px] lg:border-grey50" />
    </div>
  );
};
