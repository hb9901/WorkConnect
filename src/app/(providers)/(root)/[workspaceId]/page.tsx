'use client';
import api from '@/api';
import { PageLayout } from '@/components/PageLayout';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import { TWorkspaceInfo } from '@/types/workspace';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Header from './_components/Header';
import HomeMemberCard from './_components/HomeMemberCard';
import MemberExistComponent from './_components/MemberExistComponent';
import MemberNotExistComponent from './_components/MemberNotExistComponent';

const Homepage = () => {
  const workspaceId = useWorkspaceId();
  const [workspaceUserId, setWorkspaceUserId] = useState('');
  const [workspaceList, setWorkspaceList] = useState<TWorkspaceInfo[] | undefined>();
  const { userId, setWorkspaceData } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      setWorkspaceData: state.setWorkspaceData
    }))
  );
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const { workspaceUserList } = useWorkspaceUserList(workspaceId);

  const getWorkspacaeList = async (workspaceId: number, userId: string) => {
    const data = await api.workspaceList.getWorkspaceList(workspaceId, userId);
    const workspaceUserId = data.userData[0].id;
    const workspaceList = data.workspaceListData;
    setWorkspaceData(workspaceUserId, workspaceList);
    setWorkspaceUserId(workspaceUserId);
    setWorkspaceList(workspaceList);
  };
  useEffect(() => {
    if (workspaceId && userId) getWorkspacaeList(workspaceId, userId);
  }, [userId, workspaceId]);

  if (!(workspaceUser && workspaceList && workspaceUserList)) return;

  return (
    <PageLayout title="" showTopBar={false}>
      <div>
        <Header workspaceList={workspaceList} workspaceId={workspaceId} />
        <main className="px-[16px] mt-[26px]">
          <HomeMemberCard
            profileImg={workspaceUser.profile_image}
            name={workspaceUser.name}
            status={workspaceUser.state}
          />

          {workspaceUserList.length === 0 ? (
            <MemberNotExistComponent />
          ) : (
            <MemberExistComponent workspaceUserList={workspaceUserList} />
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default Homepage;
