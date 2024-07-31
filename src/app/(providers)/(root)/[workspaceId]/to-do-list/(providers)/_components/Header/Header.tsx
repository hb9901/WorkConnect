'use client';
import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import ToDoAddButton from '../ToDoAddButton';

const Header = () => {
  const workspaceList = useUserStore((state) => state.workspaceList);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const handleWorkspaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}/to-do-list`);
  };

  if (!workspaceList) return;

  return (
    <header className="flex flex-row items-center justify-between mt-[14px] mx-[16px] mb-[12px]">
      <Typography variant="Title20px" color="grey700Black">
        <select defaultValue={Number(workspaceId)} className="gap-[2px]" onChange={handleWorkspaceChange}>
          {workspaceList.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
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
