'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import Header from './_components/Header';
import HomeMemberCard from './_components/HomeMemberCard';
import MemberExistComponent from './_components/MemberExistComponent';
import MemberNotExistComponent from './_components/MemberNotExistComponent';

const Homepage = () => {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const { workspaceUserId, workspaceList } = useUserStore(
    useShallow((state) => ({
      workspaceUserId: state.workspaceUserId,
      workspaceList: state.workspaceList
    }))
  );
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const { workspaceUserList } = useWorkspaceUserList(Number(workspaceId));

  if (!(workspaceUser && workspaceList && workspaceUserList)) return;

  return (
    <div>
      <Header workspaceList={workspaceList} workspaceId={workspaceId} />
      <main className="px-[16px] mt-[26px]">
        <HomeMemberCard name={workspaceUser.name} status={workspaceUser.state} />

        {workspaceUserList.length === 0 ? (
          <MemberNotExistComponent />
        ) : (
          <MemberExistComponent workspaceUserList={workspaceUserList} />
        )}
      </main>
    </div>
  );
};

export default Homepage;
