'use client';

import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import { useParams } from 'next/navigation';
import ContactInfo from './_components/ContactInfo';
import Header from './_components/Header';
import MainInfo from './_components/MainInfo';

const FAKE_USER_ID_1 = '8062212a-f117-4492-a8ac-c642afab4a41';
const FAKE_USER_ID_2 = '82400d9c-fc50-426c-b8d8-0761eeb81198';

const Profile = () => {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const { workspaceUser } = useWorkspaceUser(workspaceId);
  const workspaceUserId = workspaceUser && workspaceUser.user_id;
  const name = workspaceUser && workspaceUser.name;
  // const isOpen = workspaceUser && workspaceUser.isOpen;
  const isMyPage = FAKE_USER_ID_1 === workspaceUserId;

  if (!name) return;
  return (
    <>
      <Header title={isMyPage ? '내 프로필' : name} type={isMyPage ? 'myPage' : 'profile'} />
      <main>
        <div className="m-auto mx-5">
          <MainInfo isMyPage={isMyPage} />
          <ContactInfo isMyPage={isMyPage} />
        </div>
      </main>
    </>
  );
};

export default Profile;
