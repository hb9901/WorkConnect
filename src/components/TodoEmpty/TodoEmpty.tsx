import TodoEmptyIcon from '../../icons/TodoEmptyIcon.svg';
import Typography from '../Typography';

const TodoEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center my-auto gap-[26px]">
      <TodoEmptyIcon />
      <Typography color="grey700Black" className="text-[32px] text-center">
        새로운 할 일을 추가해보세요!
      </Typography>
    </div>
  );
};

export default TodoEmpty;
