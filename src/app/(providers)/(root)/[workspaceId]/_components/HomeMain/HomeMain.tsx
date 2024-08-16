'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import HomeMemberCard from '../HomeMemberCard';
import MemberList from '../MemberList';

const HomeMain = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const {
    workspaceUser,
    isPending: userIsPending,
    isLoading: userIsLoading,
    isError: userIsError
  } = useWorkspaceUser(workspaceUserId);
  const {
    workspaceUserList,
    isPending: userListIsPending,
    isLoading: userListIsLoading,
    isError: userListIsError
  } = useWorkspaceUserList(workspaceId, workspaceUserId);

  console.log({ userIsPending, userIsLoading, userListIsLoading, userListIsPending });
  if (!workspaceUser || userListIsLoading || userIsLoading) {
    return (
      <div className="flex items-center justify-center my-auto min-h-screen bg-red-200">
        <LoadingSpinner />
      </div>
    );
  }

  // if (!workspaceUser || userIsError || userListIsError) return;
  return (
    <div className="px-[16px] mt-[26px] lg:mt-[22px] lg:pl-[42px] lg:pr-[16px] lg:gap-[42px]">
      <HomeMemberCard workspaceId={workspaceId} workspaceUserId={workspaceUserId} workspaceUser={workspaceUser} />
      <MemberList workspaceUserList={workspaceUserList} />
    </div>
  );
};

export default HomeMain;
