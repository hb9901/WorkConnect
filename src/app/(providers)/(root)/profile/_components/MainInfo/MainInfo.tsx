import Typography from '@/components/Typography';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import AvatarIcon from '@/icons/Avatar.svg';
import Image from 'next/image';
import EditOrMessageButton from '../EditOrMessageButton';

interface MainInfoProps {
  isMyPage: boolean;
}

const MainInfo = ({ isMyPage }: MainInfoProps) => {
  const { workspaceUser } = useWorkspaceUser();
  const profileImg = workspaceUser && workspaceUser.profile_image;
  const name = workspaceUser && workspaceUser.name;

  return (
    <div className="flex flex-col items-center">
      {profileImg ? (
        <div className="mt-[54px] w-[140px] h-[140px] aspect-auto relative rounded-full">
          <Image
            src={profileImg}
            alt="프로필이미지"
            className="object-contain rounded-full"
            fill
            priority
            sizes="8rem"
          />
        </div>
      ) : (
        <div className="mt-[54px] flex items-center justify-center w-[140px] h-[140px] bg-[#BDBDBD] rounded-full">
          <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />
        </div>
      )}

      <div className="flex flex-col mt-[18px] mb-[32px] items-center gap-[8px]">
        {/*title22px로 수정 필요!*/}
        <Typography variant="Title20px" color="grey700Black">
          {name}
        </Typography>{' '}
        {/*직책 넣기로 했었나요??*/}
        {/* <Typography variant="Subtitle16px" color="grey500">
          Position
        </Typography> */}
      </div>
      <EditOrMessageButton isMyPage={isMyPage} />
    </div>
  );
};

export default MainInfo;
