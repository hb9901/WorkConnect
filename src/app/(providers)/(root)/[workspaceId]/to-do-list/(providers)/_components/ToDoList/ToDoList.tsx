'use client';

import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import { Tables } from '@/types/supabase';
import Todo from '../Todo/Todo';
import { isDateSelected } from './function';

interface ToDoListProps {
  todoList: Tables<'todo'>[] | undefined;
  title: string;
}

const ToDoList = ({ todoList, title }: ToDoListProps) => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const selectedTodoList =
    todoList && todoList.filter((todo) => isDateSelected(todo.start_date, todo.end_date, selectedDate));

  if (!selectedTodoList) return;
  return (
    <div className="flex flex-col mt-[24px]">
      <div className="mb-[12px]">
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
