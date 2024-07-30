import Trash2Icon from '@/icons/Trash2.svg';

const DeleteButton = () => {
  return (
    <button className="flex items-center justify-start w-[24px] h-[24px]">
      <Trash2Icon className="w-full h-full" />
    </button>
  );
};

export default DeleteButton;
