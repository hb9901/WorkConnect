'use client';

import Loading from '@/components/Loading';
import NotFoundError from '@/components/NotFoundError';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ContactInfo from './_components/ContactInfo';
import EditOrMessageButton from './_components/EditOrMessageButton';
import Header from './_components/Header';
import LogoutButton from './_components/LogoutButton';
import LogoutModal from './_components/LogoutModal';
import MainInfo from './_components/MainInfo';

const Profile = () => {
  const params = useParams();
  const workspaceId = useWorkspaceId();
  const targetWorkspaceUserId = params.targetWorkspaceUserId as string;
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { workspaceUser, isPending, isError } = useWorkspaceUser(targetWorkspaceUserId);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  if (isPending) return <Loading />;
  if (isError) return <NotFoundError />;
  if (!workspaceUser) return;

  const profileImg = workspaceUser.profile_image;
  const name = workspaceUser.name;
  const isOpen = workspaceUser.is_open;
  const state = workspaceUser.state;
  const email = workspaceUser.email;
  const phoneNum = workspaceUser.phone;
  const isMyPage = targetWorkspaceUserId === workspaceUserId;

  const handleLogoutClick = () => {
    setIsLogoutModalOpen((prev) => !prev);
  };

  return (
    <>
      <Header title={isMyPage ? '내 프로필' : name} type={isMyPage ? 'myPage' : 'profile'} />
      <main className="pb-[42px] px-[18px]">
        <div className="h-full">
          <MainInfo profileImg={profileImg} name={name} />
          <EditOrMessageButton
            isMyPage={isMyPage}
            targetWorkspaceUserId={targetWorkspaceUserId}
            workspaceUserId={workspaceUserId}
            workspaceId={workspaceId}
          />
          <ContactInfo isMyPage={isMyPage} isOpen={isOpen} state={state} email={email} phoneNum={phoneNum} />
        </div>
        {isMyPage && (
          <div className="flex flex-row justify-start w-full pt-[42px]">
            <LogoutButton handleLogoutClick={handleLogoutClick} />
          </div>
        )}
        {isLogoutModalOpen && <LogoutModal isOpen={isLogoutModalOpen} handleLogoutClick={handleLogoutClick} />}
      </main>
    </>
  );
};

export default Profile;
