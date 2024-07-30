import type { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { StrictPropsWithChildren } from '@/types/common';

type ChannelListContainerProps = StrictPropsWithChildren<{ as?: 'ul' | 'ol' }>;

export const ChannelListContainer = ({ as: Component = 'ul', children }: ChannelListContainerProps) => {
  return <Component className="space-y-4">{children}</Component>;
};

type ChannelListItemProps = StrictPropsWithChildren<{ as?: 'li' | 'a'; href: string }>;

export const ChannelListItem = ({ as: Component = 'li', href, children }: ChannelListItemProps) => {
  return (
    <Component>
      <Link href={href} className="flex items-center gap-2">
        {children}
      </Link>
    </Component>
  );
};

type ChannelListImageProps = Required<Pick<ComponentProps<'img'>, 'src'>>;

export const ChannelListImage = ({ src = '' }: ChannelListImageProps) => {
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

export const ChannelListContent = ({ children }: StrictPropsWithChildren) => {
  return <div>{children}</div>;
};

export const ChannelListHeader = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const ChannelListTitle = ({ children }: StrictPropsWithChildren) => {
  return <strong>{children}</strong>;
};

export const ChannelListUserState = ({ children }: StrictPropsWithChildren) => {
  return <span className="text-sm text-gray-500">{children}</span>;
};

export const ChannelListMessage = ({ children }: StrictPropsWithChildren) => {
  return <p>{children}</p>;
};
