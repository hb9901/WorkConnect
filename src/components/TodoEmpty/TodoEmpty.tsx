import clsx from 'clsx';
import Link from 'next/link';
import TodoEmptyIcon from '../../icons/TodoEmptyIcon.svg';
import Button from '../Button';
import Typography from '../Typography';

export interface TodoEmptyProps {
  className?: string;
  isOpen?: boolean;
}

const TodoEmpty = ({ isOpen = false, className }: TodoEmptyProps) => {
  return (
    <div
      className={clsx(
        'hidden lg:flex flex-col h-full items-center justify-center text-center my-auto gap-[26px]',
        className
      )}
    >
      <TodoEmptyIcon />
      <Typography color="grey700Black" className="sm:text-[32px] text-[24px] text-center">
        새로운 할 일을 추가해보세요!
      </Typography>
      <Button theme={isOpen ? 'grey' : 'primary'} className="w-[343px] h-[56px] lg:!px-0">
        {isOpen ? (
          <div>할 일 추가하기</div>
        ) : (
          <Link href={'to-do-list/add/new'} className="flex h-full w-full items-center justify-center">
            할 일 추가하기
          </Link>
        )}
      </Button>
    </div>
  );
};

export default TodoEmpty;
