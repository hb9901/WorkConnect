import React from 'react';
import Image from 'next/image';
import { AvatarIcon, CameraIcon } from '@/icons';

type ThumbnailInputProps = {
  thumbnail: string;
  handleClick: () => void;
};

const ThumbnailInput = ({ thumbnail, handleClick }: ThumbnailInputProps) => (
  <div className="relative">
    <div
      className="w-[140px] h-[140px] bg-[#BDBDBD] rounded-full flex flex-col items-center justify-center overflow-hidden"
      onClick={handleClick}
    >
      <Thumbnail thumbnail={thumbnail} />
    </div>
    <div className="absolute bottom-0 right-0 z-10 flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#FAFAFA] pointer-events-none">
      <CameraIcon className="w-[24px] h-[24px]" />
    </div>
  </div>
);

const Thumbnail = ({ thumbnail }: { thumbnail: string }) => {
  if (thumbnail) {
    return <Image src={thumbnail} alt="" className="w-[140px] h-[140px] object-cover" width={140} height={140} />;
  }

  return <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />;
};

export default ThumbnailInput;
