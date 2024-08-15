'use client';

import { ArrowLeftIcon } from '@/icons';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import Typography from '../../Typography';

export type TopBarProps = {
  Icon1?: ReactNode;
  Icon2?: ReactNode;
  Icon3?: ReactNode;
  Icon4?: ReactNode;
  title: ReactNode | string;
} & Omit<ComponentProps<'header'>, 'title'>;

export const TopBar = ({ Icon1, Icon2, Icon3, Icon4, title, className, ...props }: TopBarProps) => {
  return (
    <header
      className={clsx(
        'relative grid grid-cols-[1fr_3fr_1fr] h-[52px] items-center px-4 gap-x-4 bg-white z-10 lg:border-b lg:border-b-grey50 lg:h-[84px] sticky top-0',
        className
      )}
      {...props}
    >
      <TopBarContent Icon1={Icon1} Icon2={Icon2} Icon3={Icon3} Icon4={Icon4}>
        <TopBarTitle>{title}</TopBarTitle>
      </TopBarContent>
    </header>
  );
};

const TopBarTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      as="h1"
      variant="Title20px"
      color="grey900"
      className="flex-1 text-center whitespace-nowrap overflow-hidden overflow-ellipsis lg:text-left"
    >
      {children}
    </Typography>
  );
};

type TopBarContentProps = {
  children: ReactNode;
  Icon1?: ReactNode;
  Icon2?: ReactNode;
  Icon3?: ReactNode;
  Icon4?: ReactNode;
};

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
};

const TopBarContent = ({ children, Icon1, Icon2, Icon3, Icon4 }: TopBarContentProps) => {
  return (
    <>
      <div className="flex items-center gap-x-4 flex-shrink-0 lg:order-1 lg:flex-row-reverse">
        {Icon1 || <BackButton className="lg:hidden" aria-label="뒤로가기" />}
        {Icon2}
      </div>
      {children}
      <div className="flex items-center justify-end gap-x-4 flex-shrink-0 lg:order-1">
        {Icon3}
        {Icon4}
      </div>
    </>
  );
};
