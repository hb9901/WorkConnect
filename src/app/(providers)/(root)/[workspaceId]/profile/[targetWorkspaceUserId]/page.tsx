'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import ContactInfo from './_components/ContactInfo';
import EditOrMessageButton from './_components/EditOrMessageButton';
import Header from './_components/Header';
import MainInfo from './_components/MainInfo';

const Profile = () => {
  const params = useParams();
  const workspaceId = useWorkspaceId();
  const targetWorkspaceUserId = params.targetWorkspaceUserId as string;
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);

  if (!workspaceUser) return;
  const profileImg = workspaceUser.profile_image;
  const name = workspaceUser.name;
  const isOpen = workspaceUser.is_open;
  const state = workspaceUser.state;
  const email = workspaceUser.email;
  const phoneNum = workspaceUser.phone;
  const isMyPage = targetWorkspaceUserId === workspaceUserId;

  return (
    <>
      <Header title={isMyPage ? '내 프로필' : name} type={isMyPage ? 'myPage' : 'profile'} />
      <main>
        <div className="m-auto mx-5">
          <MainInfo profileImg={profileImg} name={name} />
          <EditOrMessageButton
            isMyPage={isMyPage}
            targetWorkspaceUserId={targetWorkspaceUserId}
            workspaceUserId={workspaceUserId}
            workspaceId={workspaceId}
          />
          <ContactInfo isMyPage={isMyPage} isOpen={isOpen} state={state} email={email} phoneNum={phoneNum} />
        </div>
      </main>
    </>
  );
};

export default Profile;
