'use client';
import ResponsiveTypography from '@/components/ResponsiveTypography';
import AvatarIcon from '@/icons/Avatar.svg';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

interface HomeMemberCardProps {
  workspaceId: number;
  workspaceUserId: string | null;
  workspaceUser: Tables<'workspace_user'>;
}

const HomeMemberCard = ({ workspaceUser, workspaceId, workspaceUserId }: HomeMemberCardProps) => {
  const profileImg = workspaceUser.profile_image;
  const name = workspaceUser.name;
  const state = workspaceUser.state;

  return (
    <Link
      href={`/${workspaceId}/profile/${workspaceUserId}`}
      scroll={false}
      className="flex flex-row gap-[16px] items-center"
    >
      <div className="flex flex-shrink-0 items-center justify-center relative w-[56px] h-[56px] rounded-full bg-[#BDBDBD] lg:size-[67px] lg:w-[67px] ">
        {profileImg ? (
          <Image
            src={profileImg}
            alt={name}
            className="object-cover min-w-[56px] size-[56px] rounded-full lg:size-[67px] "
            fill
            sizes="(max-width:1024px) 48px, 67px"
            priority
          />
        ) : (
          <AvatarIcon className="w-[33.6px] h-[33.6px] lg:w-[40.3px] lg:h-[40.3px]" />
        )}
      </div>
      <div className="flex flex-col gap-[4px] w-full lg:flex-row lg:justify-between">
        <ResponsiveTypography mobileVariant="Title18px" pcVariant="Title20px" color="grey700Black">
          {name}
        </ResponsiveTypography>
        <ResponsiveTypography mobileVariant="Title14px" pcVariant="Title16px" color="grey700Black">
          {state}
        </ResponsiveTypography>
      </div>
    </Link>
  );
};

export default HomeMemberCard;
