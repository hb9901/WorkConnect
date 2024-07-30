import Typography from '@/components/Typography';
import AvatarIcon from '@/icons/Avatar.svg';

interface HomeMemberCardProps {
  name: string;
  status: string | null;
}

const HomeMemberCard = ({ name, status }: HomeMemberCardProps) => {
  return (
    <div className="flex flex-row gap-[16px] items-center">
      <div className="flex items-center justify-center size-[56px] rounded-full bg-[#BDBDBD]">
        <AvatarIcon className="size-[33.6px]" />
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
