'use client';
import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import ToDoAddButton from '../ToDoAddButton';

const Header = () => {
  const workspaceList = useUserStore((state) => state.workspaceList);
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const workspaceId = useWorkspaceId();
  const setWorkspaceUserIdData = useUserStore((state) => state.setWorkspaceUserIdData);
  const router = useRouter();
  const handleWorkspaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newWorkspaceUserId = e.target.value.split('/')[0];
    const newWorkspaceId = e.target.value.split('/')[1];
    setWorkspaceUserIdData(newWorkspaceUserId);
    router.push(`/${newWorkspaceId}/to-do-list`);
  };

  if (!workspaceList || !workspaceUserId) return;

  return (
    <header className="flex flex-row items-center justify-between mt-[14px] mx-[16px] mb-[12px]">
      <Typography variant="Title20px" color="grey700Black">
        <select
          defaultValue={workspaceUserId + '/' + workspaceId}
          className="gap-[2px]"
          onChange={handleWorkspaceChange}
        >
          {workspaceList.map((workspace) => (
            <option key={workspace.id} value={workspace.workspace_user_id + '/' + workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </Typography>
      <ToDoAddButton />
    </header>
  );
};

export default Header;
