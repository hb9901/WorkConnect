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
      <div className="flex items-center justify-center relative w-[56px] h-[56px] min-w-[56px] rounded-full bg-[#BDBDBD] lg:size-[67px] lg:min-w-[67px] ">
        {profileImg ? (
          <Image
            src={profileImg}
            alt={name}
            className="object-cover min-w-[56px] size-[56px] rounded-full lg:min-x-[67px] lg:size-[67px] "
            fill
            priority
          />
        ) : (
          <AvatarIcon className="w-[33.6px] h-[33.6px] min-w-[33.6px] lg:w-[40.3px] lg:h-[40.3px]" />
        )}
      </div>
      <div className="flex flex-col gap-[4px] w-full lg:flex-row lg:justify-between">
        {/*모바일*/}
        <Typography variant="Title18px" color="grey700Black" className="lg:hidden">
          {workspaceUser.name}
        </Typography>
        {/*pc*/}
        <Typography variant="Title20px" color="grey700Black" className="hidden lg:flex">
          {workspaceUser.name}
        </Typography>

        {/*모바일*/}
        <Typography variant="Title14px" color="grey700Black" className="lg:hidden">
          {workspaceUser.state}
        </Typography>
        {/*pc*/}
        <Typography variant="Title16px" color="grey700Black" className="hidden lg:flex">
          {workspaceUser.state}
        </Typography>
      </div>
    </Link>
  );
};

export default HomeMemberCard;
