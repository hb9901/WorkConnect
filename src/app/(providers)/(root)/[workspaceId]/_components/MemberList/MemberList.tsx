'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useUserStore from '@/store/userStore';
import MemberExistComponent from '../MemberExistComponent';
import MemberNotExistComponent from '../MemberNotExistComponent';

const MemberList = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const { workspaceUserList, isPending, isError } = useWorkspaceUserList(workspaceId, workspaceUserId);

  if (isError) return;

  if (isPending) return;

  if (!workspaceUserList || workspaceUserList.length === 0) return <MemberNotExistComponent />;

  return <MemberExistComponent workspaceUserList={workspaceUserList} />;
};

export default MemberList;
