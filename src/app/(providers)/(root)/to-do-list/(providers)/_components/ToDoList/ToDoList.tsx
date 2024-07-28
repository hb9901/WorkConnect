'use client';

import useDateStore from '@/store/dateStore';
import { Tables } from '@/types/supabase';
import Todo from '../Todo/Todo';
import ToDoAddButton from '../ToDoAddButton';
import { isDateSelected } from './function';

interface ToDoListProps {
  todoList: Tables<'todo'>[] | undefined;
  title: string;
}

const ToDoList = ({ todoList, title }: ToDoListProps) => {
  const { selectedDate } = useDateStore();
  const selectedTodoList =
    todoList && todoList.filter((todo) => isDateSelected(todo.start_date, todo.end_date, selectedDate));

  if (!selectedTodoList) return;
  return (
    <div className="flex flex-col gap-y-4 mt-5">
      <div className="flex flex-row justify-between">
        <strong>{title}</strong>
        <ToDoAddButton />
      </div>
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
  );
};

export default ToDoList;
