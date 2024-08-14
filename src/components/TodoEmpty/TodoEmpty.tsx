import clsx from 'clsx';
import TodoEmptyIcon from '../../icons/TodoEmptyIcon.svg';
import Typography from '../Typography';

export interface TodoEmptyProps {
  className?: string;
}

const TodoEmpty = ({ className }: TodoEmptyProps) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center my-auto gap-[26px]', className)}>
      <TodoEmptyIcon />
      <Typography color="grey700Black" className="text-[32px] text-center">
        새로운 할 일을 추가해보세요!
      </Typography>
    </div>
  );
};

export default TodoEmpty;
