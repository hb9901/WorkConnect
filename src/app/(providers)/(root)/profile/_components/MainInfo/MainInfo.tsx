'use client';

import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MainInfoProps {
  isMyPage: boolean;
}

const MainInfo = ({ isMyPage }: MainInfoProps) => {
  const { workspaceUser } = useWorkspaceUser();
  const profileImg = workspaceUser && workspaceUser.profile_image;
  const name = workspaceUser && workspaceUser.name;
  const state = workspaceUser && workspaceUser.user.state;
  const router = useRouter();

  const handleClick = () => {
    if (isMyPage) {
      router.push('/profile/edit');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-10 pb-10 border-b-[1px] border-slate-300">
      <div className="w-32 h-32 aspect-auto relative">
        {profileImg && (
          <Image src={profileImg} alt="프로필이미지" className="object-contain" fill priority sizes="8rem" />
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        <strong>{name}</strong>
        <div className="flex flex-row gap-2">
          <div className="text-sm">{state}</div>
          {isMyPage && <button className="text-sm ">(변경)</button>}
        </div>
      </div>
      <button className="w-full h-10 rounded-md bg-slate-800 text-white" onClick={handleClick}>
        {isMyPage ? '프로필 편집' : '메시지'}
      </button>
    </div>
  );
};

export default MainInfo;
