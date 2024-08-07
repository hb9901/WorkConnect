'use client';
import ToDoAddButton from '@/app/(providers)/(root)/[workspaceId]/to-do-list/(providers)/_components/ToDoAddButton';
import TopSelect from '@/components/TopSelect';
import Typography from '@/components/Typography';
import useWorkspaceList from '@/hooks/useWorkspaceList';
import ChevronDownIcon from '@/icons/ChevronDownIcon.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { useState } from 'react';

interface SelectHeaderProps {
  workspaceId: number;
  isTodoList?: boolean;
  isMainPage?: boolean;
}

const SelectHeader = ({ workspaceId, isTodoList = false }: SelectHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userId = useUserStore((state) => state.userId);
  const { workspaceInfo, isPending, isError } = useWorkspaceList(workspaceId, userId);

  if (isError || !workspaceInfo) {
    return;
  }

  if (isPending) {
    return;
  }

  const workspaceList = workspaceInfo.workspaceListData;
  const selectedWorkspace = workspaceList.filter((workspace) => workspace.id === workspaceId)[0];

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 flex flex-row justify-between z-10 w-full bg-white pt-[14px] px-[16px] pb-[12px]">
      <button onClick={handleClick} className="flex flex-row gap-[4px] items-center">
        <Typography variant="Title20px" color="grey700Black">
          {selectedWorkspace.name}
        </Typography>
        {isOpen ? <ChevronUpIcon className="stroke-[#2F323C]" /> : <ChevronDownIcon className="stroke-[#2F323C]" />}
      </button>
      <TopSelect workspaceList={workspaceList} isOpen={isOpen} onClick={handleClick} />
      {isTodoList && <ToDoAddButton />}
    </header>
  );
};

export default SelectHeader;
