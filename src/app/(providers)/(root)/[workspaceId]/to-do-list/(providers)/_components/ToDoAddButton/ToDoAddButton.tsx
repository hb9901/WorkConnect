'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import PlusCircleIcon from '@/icons/PlusCircle.svg';
import Link from 'next/link';

const ToDoAddButton = () => {
  const workspaceId = useWorkspaceId();

  return (
    <button className="w-[24px] h-[24px]">
      <Link href={`/${workspaceId}/to-do-list/add/new`}>
        <PlusCircleIcon className="w-full h-full #2F323C" />
      </Link>
    </button>
  );
};

export default ToDoAddButton;
