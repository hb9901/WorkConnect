import { StrictPropsWithChildren } from '@/types/common';
import clsx from 'clsx';
import Image from 'next/image';
import type { ComponentProps } from 'react';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

export const ChatContainer = ({ className, children }: StrictPropsWithChildren<ClassNameProps>) => {
  return <div className={clsx('flex flex-col', className)}>{children}</div>;
};

type ChatImageProps = Required<Pick<ComponentProps<'img'>, 'src'>>;

export const ChatImage = ({ src = '' }: ChatImageProps) => {
  return (
    <Image
      src={src}
      width={50}
      height={50}
      className="rounded-full object-cover w-[50px] h-[50px]"
      alt=""
      unoptimized
    />
  );
};

export const ChatOtherProfileContainer = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const ChatOtherProfileName = ({ children }: StrictPropsWithChildren) => {
  return <div className="font-semibold">{children}</div>;
};

export const ChatMessage = ({ children, className }: StrictPropsWithChildren<ClassNameProps>) => {
  return (
    <div className={clsx(`max-w-xs px-3 py-2 rounded-lg text-white`, className)}>
      <div>{children}</div>
    </div>
  );
};
