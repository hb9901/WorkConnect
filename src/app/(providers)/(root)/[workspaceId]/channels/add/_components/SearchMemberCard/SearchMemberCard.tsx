import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import { StrictPropsWithChildren } from '@/types/common';
import type { ComponentProps } from 'react';

export const SearchCardWrapper = ({ children, ...props }: StrictPropsWithChildren<ComponentProps<'li'>>) => {
  return (
    <li
      className="flex items-center justify-between p-4 border-b border-white bg-transparent w-full lg:p-0 lg:w-[calc(16.66%)] lg:justify-center"
      {...props}
    >
      {children}
    </li>
  );
};

export const SearchCardContent = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex items-center lg:flex-col lg:justify-center w-full overflow-hidden whitespace-nowrap text-ellipsis">
      {children}
    </div>
  );
};

export const SearchCardThumbnail = ({ src }: { src: string | undefined }) => {
  return (
    <div className="flex items-center justify-center mr-4 flex-shrink-0 lg:mr-0">
      <Avatar size="48px" src={src} className="lg:hidden" />
      <Avatar size="106px" src={src} className="hidden lg:flex" />
    </div>
  );
};

export const SearchCardTitle = ({ children }: StrictPropsWithChildren) => {
  return (
    <Typography
      variant="Title18px"
      color="grey700Black"
      className="whitespace-nowrap overflow-hidden overflow-ellipsis lg:mt-[6px] w-full lg:text-center"
    >
      {children}&nbsp;
    </Typography>
  );
};

export const SearchCardStatus = ({ children }: StrictPropsWithChildren) => {
  return (
    <Typography variant="Title14px" color="grey500" className="flex flex-row gap-1 flex-shrink-0 lg:hidden">
      {children}
    </Typography>
  );
};
