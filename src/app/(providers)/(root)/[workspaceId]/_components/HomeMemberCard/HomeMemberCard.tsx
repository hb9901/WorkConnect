import Typography from '@/components/Typography';
import AvatarIcon from '@/icons/Avatar.svg';
import Image from 'next/image';
import Link from 'next/link';

interface HomeMemberCardProps {
  profileImg: string | null;
  name: string;
  status: string | null;
  workspaceId: string;
  workspaceUserId: string;
}

const HomeMemberCard = ({ profileImg, name, status, workspaceId, workspaceUserId }: HomeMemberCardProps) => {
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
            {status}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default HomeMemberCard;
