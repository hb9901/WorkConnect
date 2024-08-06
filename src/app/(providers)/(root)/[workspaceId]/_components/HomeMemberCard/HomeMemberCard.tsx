'use client';
import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import AvatarIcon from '@/icons/Avatar.svg';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';

const HomeMemberCard = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const { workspaceUser, isPending, isError } = useWorkspaceUser(workspaceUserId);

  if (!workspaceUser || isError) return;

  if (isPending) return;

  const profileImg = workspaceUser.profile_image;
  const name = workspaceUser.name;
  const state = workspaceUser.state;

  return (
    <Link href={`${workspaceId}/profile/${workspaceUserId}`} className="flex flex-row gap-[16px] items-center">
      <div className="flex items-center justify-center relative size-[56px] rounded-full bg-[#BDBDBD]">
        {profileImg ? (
          <Image src={profileImg} alt={name} className="object-cover size-[56px] rounded-full" fill priority />
        ) : (
          <AvatarIcon className="size-[33.6px]" />
        )}
      </div>
      <div className="flex flex-col gap-[4px]">
        <div>
          <Typography variant="Title18px" color="grey700Black">
            {name}
          </Typography>
        </div>
        <div>
          <Typography variant="Title14px" color="grey500">
            {state}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default HomeMemberCard;
