'use client';
import PlusCircleIcon from '@/icons/PlusCircle.svg';
import { useRouter } from 'next/navigation';

const ToDoAddButton = () => {
  const router = useRouter();
  const handleClickAdd = () => {
    router.push(`to-do-list/add/new`);
  };
  return (
    <button onClick={handleClickAdd} className="w-[24px] h-[24px]">
      <PlusCircleIcon className="w-full h-full #2F323C" />
    </button>
  );
};

export default ToDoAddButton;
