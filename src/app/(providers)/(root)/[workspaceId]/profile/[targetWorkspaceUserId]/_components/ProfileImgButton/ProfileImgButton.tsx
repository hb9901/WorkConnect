import { AvatarIcon, CameraIcon } from '@/icons';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface ProfileImgButtonProps {
  imageURL: string | ArrayBuffer | undefined | null;
  handleProfileImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImgButton = ({ imageURL, handleProfileImageChange }: ProfileImgButtonProps) => {
  return (
    <div className={AvatarVariants({ isImageExist: imageURL ? true : false })}>
      {imageURL ? (
        <Image
          src={imageURL.toString()}
          alt="프로필이미지"
          className="object-cover rounded-full"
          fill
          priority
          sizes="140px"
        />
      ) : (
        <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />
      )}
      <button className="absolute bottom-0 right-0">
        <label htmlFor="profile" className="hover:cursor-pointer">
          <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#FAFAFA]">
            <CameraIcon className="w-[24px] h-[24px]" />
          </div>
        </label>
      </button>
      <input id="profile" type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
    </div>
  );
};

export default ProfileImgButton;

const AvatarVariants = cva(
  'flex items-center justify-center w-[140px] h-[140px] mt-[26px] mb-[38px] aspect-auto relative rounded-full lg:mt-[32px] lg:mb-[32px]',
  {
    variants: {
      isImageExist: {
        true: '',
        false: 'bg-[#BDBDBD]'
      }
    },
    defaultVariants: {
      isImageExist: false
    }
  }
);
