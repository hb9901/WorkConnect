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
      <div className="flex items-center justify-center relative w-[56px] h-[56px] min-w-[56px] rounded-full bg-[#BDBDBD] sm:size-[67px] sm:min-w-[67px] ">
        {profileImg ? (
          <Image
            src={profileImg}
            alt={name}
            className="object-cover min-w-[56px] size-[56px] rounded-full sm:min-x-[67px] sm:size-[67px] "
            fill
            priority
          />
        ) : (
          <AvatarIcon className="w-[33.6px] h-[33.6px] min-w-[33.6px] sm:w-[40.3px] sm:h-[40.3px]" />
        )}
      </div>
      <div className="flex flex-col gap-[4px] w-full sm:flex-row sm:justify-between">
        {/*모바일*/}
        <Typography variant="Title18px" color="grey700Black" className="sm:hidden">
          {workspaceUser.name}
        </Typography>
        {/*pc*/}
        <Typography variant="Title20px" color="grey700Black" className="hidden sm:flex">
          {workspaceUser.name}
        </Typography>

        {/*모바일*/}
        <Typography variant="Title14px" color="grey700Black" className="sm:hidden">
          {workspaceUser.state}
        </Typography>
        {/*pc*/}
        <Typography variant="Title16px" color="grey700Black" className="hidden sm:flex">
          {workspaceUser.state}
        </Typography>
      </div>
    </Link>
  );
};

export default HomeMemberCard;
