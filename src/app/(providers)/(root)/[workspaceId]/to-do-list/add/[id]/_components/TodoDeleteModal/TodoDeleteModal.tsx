'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import useTodoList from '@/hooks/useTodo';
import { useRouter } from 'next/navigation';

interface TodoDeleteModalProps {
  isOpen: boolean;
  workspaceId: number;
  workspaceUserId: string | null;
  todoId: string;
  handleIsOpen: () => void;
}
const TodoDeleteModal = ({ isOpen, workspaceId, workspaceUserId, todoId, handleIsOpen }: TodoDeleteModalProps) => {
  const { delTodo } = useTodoList(workspaceUserId);
  const router = useRouter();
  const handleDelelteClick = async () => {
    await delTodo(todoId);
    router.push(`/${workspaceId}/to-do-list`);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleIsOpen} isModal={false}>
      <div className="flex flex-col justify-center w-[335px] py-[10px] lg:w-[538px] lg:py-[42px]">
        {/*모바일*/}
        <div className="mt-[20px] mb-[10px] text-center lg:hidden">일정을 삭제하시나요?</div>
        {/*PC*/}
        <div className="hidden lg:flex flex-col items-center">
          <Typography
            variant="Title18px"
            color="error"
            className="flex items-center justify-center size-[41px] rounded-full bg-[#FFE4E1] mb-[22px]"
          >
            !
          </Typography>
          <Typography variant="Title18px" color="grey700Black" className="mb-[12px]">
            일정을 삭제하시겠어요?
          </Typography>
          <Typography variant="Subtitle14px" color="grey400" className="mb-[13px]">
            지금까지 입력하신 정보가 모두 사라져요
          </Typography>
        </div>
        {/*버튼*/}
        <div className="flex flex-row px-[16px] gap-[8px] mt-[10px] mb-[20px] lg:mb-0 lg:items-center justify-center">
          <Button theme="grey" isFullWidth onClick={handleIsOpen} className="lg:!w-[138px]">
            취소
          </Button>
          <Button theme="primary" isFullWidth onClick={handleDelelteClick} className="lg:!w-[138px]">
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoDeleteModal;
