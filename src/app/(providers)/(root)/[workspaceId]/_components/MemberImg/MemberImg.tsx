import { AvatarIcon } from '@/icons';
import Image from 'next/image';

interface MemberImgProps {
  profileImage: string | null;
  name: string;
}

const MemberImg = ({ profileImage, name }: MemberImgProps) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-center size-[48px] rounded-full bg-[#BDBDBD] relative lg:size-[67px]">
      {profileImage ? (
        <Image
          src={profileImage}
          alt={name}
          className="object-cover size-[48px] rounded-full lg:size-[67px]"
          fill
          sizes="(max-width:1024px) 48px, 67px"
        />
      ) : (
        <AvatarIcon className="size-[28.8px] lg:size-[40.3px]" />
      )}
    </div>
  );
};

export default MemberImg;
