'use client';

import Typography from '@/components/Typography';
import CheckCircleIcon from '@/icons/CheckCircle.svg';
import LoaderIcon from '@/icons/Loader.svg';
import MinusCircleIcon from '@/icons/MinusCircle.svg';
import useDateStore from '@/store/dateStore';
import { Tables } from '@/types/supabase';
import { cva, VariantProps } from 'class-variance-authority';
import Todo from '../Todo/Todo';
import { isDateSelected } from './function';

type ToDoListProps = {
  todoList: Tables<'todo'>[] | undefined;
} & VariantProps<typeof todoListClass>;

const ToDoList = ({ todoList, title }: ToDoListProps) => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const selectedTodoList =
    todoList && todoList.filter((todo) => isDateSelected(todo.start_date, todo.end_date, selectedDate));

  if (!selectedTodoList) return;
  return (
    <div className={todoListClass({ title })}>
      {/* <div className={todoListBackdropClass({ title })} /> */}
      <div className="mb-[12px] lg:flex lg:flex-row lg:items-center lg:gap-[12px]">
        {title === '진행 전' ? (
          <MinusCircleIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
        ) : title === '진행 중' ? (
          <LoaderIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
        ) : title === '완료' ? (
          <CheckCircleIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
        ) : (
          <></>
        )}
        <Typography variant="Subtitle16px" color="grey700Black">
          {title}
        </Typography>
      </div>
      <div className="flex flex-col gap-[8px]">
        {selectedTodoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            startDate={todo.start_date}
            endDate={todo.end_date}
            place={todo.place}
            priority={todo.priority}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;

const todoListClass = cva('flex flex-col mt-[24px] lg:mt-0 lg:px-[12px] lg:py-[24px] lg:bottom-0 lg:rounded-[6px]', {
  variants: {
    title: {
      '진행 전': 'lg:bg-[#FAFAFF]',
      '진행 중': 'lg:bg-[#EBECFE]',
      완료: 'lg:bg-[#F7F7F7]'
    }
  }
});

const todoListBackdropClass = cva(
  'lg:absolute lg:top-[82px] lg:bottom-0 lg:w-[calc((100%-362px)/3)] lg:rounded-[6px] lg:-z-[1]',
  {
    variants: {
      title: {
        '진행 전': 'lg:bg-[#FAFAFF] lg:left-[313px]',
        '진행 중': 'lg:bg-[#EBECFE] lg:left-[calc(313px+((100%-316px)/3))]',
        완료: 'lg:bg-[#F7F7F7] lg:left-[calc(313px+(2*(100%-316px)/3))]'
      }
    }
  }
);
