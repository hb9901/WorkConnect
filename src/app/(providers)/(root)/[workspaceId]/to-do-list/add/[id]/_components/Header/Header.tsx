'use client';
import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import BackArrowButton from '../BackArrowButton';
import BackButton from '../BackButton';
import DeleteButton from '../DeleteButton';
import TodoDeleteModal from '../TodoDeleteModal';

const Header = () => {
  const params = useParams();

  const workspaceId = useWorkspaceId();
  const todoId = params.id as string;
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isExist = params.id !== 'new';

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
      <div
        className="flex flex-row justify-between
        items-center pt-[14px] pb-[12px] w-full 
        lg:pt-[32px] lg:pb-[32px] lg:border-grey50 lg:border-b-[1px]"
      >
        <BackButton />
        <Typography
          variant="Title20px"
          color="grey700Black"
          className="text-center text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {isExist ? '일정 상세' : '일정 추가'}
        </Typography>
        {isExist ? (
          <div className="flex flex-row gap-[12px]">
            <DeleteButton onClick={handleIsOpen} />
            <BackArrowButton />
          </div>
        ) : (
          <>
            <BackArrowButton />
            <div className="lg:hidden" />
          </>
        )}

        <TodoDeleteModal
          isOpen={isOpen}
          workspaceId={workspaceId}
          workspaceUserId={workspaceUserId}
          todoId={todoId}
          handleIsOpen={handleIsOpen}
        />
      </div>
    </header>
  );
};

export default Header;
