'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useUserStore from '@/store/userStore';
import { useShallow } from 'zustand/react/shallow';
import Header from './_components/Header';
import HomeMemberCard from './_components/HomeMemberCard';
import MemberExistComponent from './_components/MemberExistComponent';
import MemberNotExistComponent from './_components/MemberNotExistComponent';

const Homepage = () => {
  const userInfo = {
    name: '이름',
    position: 'Position',
    status: 'Status'
  };
  const workspaceUserList = [];

  const { workspaceUserId, workspaceList } = useUserStore(
    useShallow((state) => ({
      workspaceUserId: state.workspaceUserId,
      workspaceList: state.workspaceList
    }))
  );
  console.log(workspaceUserId);
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  console.log(workspaceUser);
  if (!workspaceUser) return;
  return (
    <div>
      <Header />
      <main className="px-[16px] mt-[26px]">
        <HomeMemberCard name={workspaceUser.name} position={workspaceUser.position} status={workspaceUser.state} />

        {workspaceUserList.length === 0 ? <MemberNotExistComponent /> : <MemberExistComponent />}
      </main>
    </div>
  );
};

export default Homepage;
