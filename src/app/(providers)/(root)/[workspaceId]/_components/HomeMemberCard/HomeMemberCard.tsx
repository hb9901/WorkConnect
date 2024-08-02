import Typography from '@/components/Typography';
import AvatarIcon from '@/icons/Avatar.svg';
import Image from 'next/image';

interface HomeMemberCardProps {
  profileImg: string | null;
  name: string;
  status: string | null;
}

const HomeMemberCard = ({ profileImg, name, status }: HomeMemberCardProps) => {
  return (
    <div className="flex flex-row gap-[16px] items-center">
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
    </div>
  );
};

export default HomeMemberCard;
