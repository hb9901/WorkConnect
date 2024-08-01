import { useRouter } from 'next/navigation';
import Typography from '../Typography';
import { ArrowLeftIcon } from '@/icons';
import type { ComponentProps, ReactNode } from 'react';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
};

type TopBarProps = {
  LeftIcon1?: ReactNode;
  LeftIcon2?: ReactNode;
  RightIcon1?: ReactNode;
  RightIcon2?: ReactNode;
  title: string;
} & ComponentProps<'header'>;

export const TopBar = ({ LeftIcon1, LeftIcon2, RightIcon1, RightIcon2, title, ...props }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between h-[52px] px-4 gap-x-4 bg-white z-10" {...props}>
      <div className="flex items-center gap-x-4 w-[62px]">
        {LeftIcon1}
        {LeftIcon2}
      </div>
      <Typography as="h1" variant="Title20px" color="grey900" className="flex-1 text-center">
        {title}
      </Typography>
      <div className="flex items-center justify-end gap-x-4 w-[62px]">
        {RightIcon2}
        {RightIcon1}
      </div>
    </header>
  );
};
