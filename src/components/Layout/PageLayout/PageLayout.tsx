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

// TODO: 더이상 여기에 헤더를 넣을 고민을 하지말자 다신 두번 다신 못 넣음 그냥 children에 넣어 이제 더 고민 하지마 안되는건 안되는거야..
export const PageLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PCWrapper>
      <PCHeader />
      {children}
    </PCWrapper>
  );
};

export const PageAside = ({ children }: StrictPropsWithChildren) => {
  return (
    <aside
      className={`hidden lg:block bg-[#F4F4F6] w-[300px] h-[100dvh] lg:pt-[84px] overflow-hidden lg:overflow-y-scroll lg:flex-shrink-0 lg:scroll-container lg:sticky lg:top-0`}
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

export const PCHeader = ({ isFull = false, className }: { isFull?: boolean; className?: string }) => {
  const workspaceId = useWorkspaceId();

  return (
    <SelectHeader
      workspaceId={workspaceId}
      isFull={isFull}
      className={clsx('hidden !fixed top-0 left-0 z-30 lg:block', className)}
    />
  );
};

export const BottomBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="h-[78px] lg:hidden" />
      <BottomNavigationBar className="fixed bottom-0 left-0 z-10 xs:w-full w-full lg:top-[84px] lg:w-[85px] lg:h-[vh100%] lg:bg-[#F4F4F6] lg:border-r-[1px] lg:border-grey50" />
    </div>
  );
};
