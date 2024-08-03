import TopSelect from '@/components/TopSelect';
import Typography from '@/components/Typography';
import ChevronDownIcon from '@/icons/ChevronDownIcon.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import { TWorkspaceInfo } from '@/types/workspace';
import { useState } from 'react';

interface SelectHeaderProps {
  workspaceList: TWorkspaceInfo[];
  workspaceId: number;
}

const SelectHeader = ({ workspaceList, workspaceId }: SelectHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedWorkspace = workspaceList.filter((workspace) => workspace.id === workspaceId)[0];

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white pt-[14px] px-[16px] pb-[12px]">
      <button onClick={handleClick} className="flex flex-row gap-[4px] items-center">
        <Typography variant="Title20px" color="grey700Black">
          {selectedWorkspace.name}
        </Typography>
        {isOpen ? <ChevronUpIcon className="stroke-[#2F323C]" /> : <ChevronDownIcon className="stroke-[#2F323C]" />}
      </button>
      <TopSelect workspaceList={workspaceList} isOpen={isOpen} onClick={handleClick} />
    </header>
  );
};

export default SelectHeader;
