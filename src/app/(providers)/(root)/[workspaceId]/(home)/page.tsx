'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import HomeMemberCard from '../_components/HomeMemberCard';
import MemberExistComponent from '../_components/MemberExistComponent';
import MemberNotExistComponent from '../_components/MemberNotExistComponent';

const Homepage = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const { workspaceUserList } = useWorkspaceUserList(workspaceId);

  if (!(workspaceUser && workspaceUserList)) return;

  return (
    <div>
      <main className="px-[16px] mt-[26px]">
        <HomeMemberCard
          profileImg={workspaceUser.profile_image}
          name={workspaceUser.name}
          status={workspaceUser.state}
          workspaceId={workspaceId}
          workspaceUserId={workspaceUserId}
        />

        {workspaceUserList.length <= 1 ? (
          <MemberNotExistComponent />
        ) : (
          <MemberExistComponent workspaceUserList={workspaceUserList} />
        )}
      </main>
    </div>
  );
};

export default Homepage;
