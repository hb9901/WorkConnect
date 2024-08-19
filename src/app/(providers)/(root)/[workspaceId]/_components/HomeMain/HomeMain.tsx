'use client';
import Loading from '@/components/Loading';
import NotFoundError from '@/components/NotFoundError';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import HomeMemberCard from '../HomeMemberCard';
import MemberList from '../MemberList';

const HomeMain = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const { workspaceUser, isPending: userIsPending, isError: userIsError } = useWorkspaceUser(workspaceUserId);
  const {
    workspaceUserList,
    isPending: userListIsPending,
    isError: userListIsError
  } = useWorkspaceUserList(workspaceId, workspaceUserId);

  if (userIsPending || userListIsPending) return <Loading />;

  if (!workspaceUser || userIsError || userListIsError) return <NotFoundError />;

  return (
    <div className="px-[16px] mt-[26px] lg:mt-[22px] lg:pl-[42px] lg:pr-[16px] lg:gap-[42px]">
      <HomeMemberCard workspaceId={workspaceId} workspaceUserId={workspaceUserId} workspaceUser={workspaceUser} />
      <MemberList workspaceUserList={workspaceUserList} />
    </div>
  );
};

export default HomeMain;
