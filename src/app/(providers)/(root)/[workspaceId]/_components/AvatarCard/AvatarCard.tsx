import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import AvatarIcon from '@/icons/Avatar.svg';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

interface AvatarCardProps {
  workspaceUser: Tables<'workspace_user'>;
}

const AvatarCard = ({ workspaceUser }: AvatarCardProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Link href={`/${workspaceId}/profile/${workspaceUser.id}`}>
      <div className="flex flex-row items-center justify-between py-[16px]">
        <div className="flex flex-row items-center gap-[12px]">
          <div className="flex items-center justify-center size-[48px] rounded-full bg-[#BDBDBD] relative sm:size-[67px]">
            {workspaceUser.profile_image ? (
              <Image
                src={workspaceUser.profile_image}
                alt={workspaceUser.name}
                className="object-cover size-[48px] rounded-full sm:size-[67px]"
                fill
                priority
              />
            ) : (
              <AvatarIcon className="size-[28.8px] sm:size-[40.3px]" />
            )}
          </div>
          <div>
            {/*모바일*/}
            <Typography variant="Title18px" color="grey700Black" className="sm:hidden">
              {workspaceUser.name}
            </Typography>
            {/*pc*/}
            <Typography variant="Title20px" color="grey700Black" className="hidden sm:flex">
              {workspaceUser.name}
            </Typography>
          </div>
        </div>
        <div>
          {/*모바일*/}
          <Typography variant="Title14px" color="grey700Black" className="sm:hidden">
            {workspaceUser.state}
          </Typography>
          {/*pc*/}
          <Typography variant="Title16px" color="grey700Black" className="hidden sm:flex">
            {workspaceUser.state}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default AvatarCard;
