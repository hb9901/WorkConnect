'use client';

import { ArrowLeftIcon } from '@/icons';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import Typography from '../Typography';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
};

export type TopBarProps = {
  TopBarLeftIcon1?: ReactNode;
  TopBarLeftIcon2?: ReactNode;
  TopBarRightIcon1?: ReactNode;
  TopBarRightIcon2?: ReactNode;
  title: string;
} & ComponentProps<'header'>;

export const TopBar = ({
  TopBarLeftIcon1,
  TopBarLeftIcon2,
  TopBarRightIcon1,
  TopBarRightIcon2,
  title,
  className,
  ...props
}: TopBarProps) => {
  return (
    <header
      className={clsx('flex items-center justify-between h-[52px] px-4 gap-x-4 bg-white z-10', className)}
      {...props}
    >
      <div className="flex items-center gap-x-4 w-[62px] flex-shrink-0">
        {TopBarLeftIcon1 || <BackButton aria-label="뒤로가기" />}
        {TopBarLeftIcon2}
      </div>
      <Typography
        as="h1"
        variant="Title20px"
        color="grey900"
        className="flex-1 text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
      >
        {title}
      </Typography>
      <div className="flex items-center justify-end gap-x-4 w-[62px] flex-shrink-0">
        {TopBarRightIcon2}
        {TopBarRightIcon1}
      </div>
    </header>
  );
};
