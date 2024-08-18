import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import { StrictPropsWithChildren } from '@/types/common';
import Link from 'next/link';
import { memo } from 'react';

export const Time = ({ children }: StrictPropsWithChildren) => {
  return <span className="text-grey300 text-[10px] leading-[130%]">{children}</span>;
};

type OtherProfileProps = {
  profileImage: string | null;
  name: string;
  profileUrl: string;
};

export const OtherProfile = memo(({ profileImage, name, profileUrl }: OtherProfileProps) => {
  return (
    <div className="inline-flex items-center gap-2 w-full">
      <Link href={profileUrl}>
        <Avatar src={profileImage ?? undefined} size="32px" />
      </Link>
      <Typography variant="Title16px" color="grey900">
        {name}
      </Typography>
    </div>
  );
});

export const ReadBadge = () => {
  return (
    <Typography variant="Body12px" color="primary700" className="opacity-60 text-right">
      읽음
    </Typography>
  );
};
