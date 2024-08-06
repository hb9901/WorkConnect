'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import MemberExistComponent from '../MemberExistComponent';
import MemberNotExistComponent from '../MemberNotExistComponent';

const MemberList = () => {
  const workspaceId = useWorkspaceId();

  const { workspaceUserList, isPending, isError } = useWorkspaceUserList(workspaceId);

  if (!workspaceUserList || isError) return;

  if (isPending) return;

  return (
    <>
      {workspaceUserList.length <= 1 ? (
        <MemberNotExistComponent />
      ) : (
        <MemberExistComponent workspaceUserList={workspaceUserList} />
      )}
    </>
  );
};

export default MemberList;
