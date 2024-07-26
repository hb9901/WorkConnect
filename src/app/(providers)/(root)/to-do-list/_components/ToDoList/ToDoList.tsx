'use client';

import useDateStore from '@/store/dateStore';
import { Tables } from '@/types/supabase';
import ToDoAddButton from '../ToDoAddButton';
import { changeDateStr, isDateSelected } from './function';

interface ToDoListProps {
  todoList: Tables<'todo'>[];
  title: string;
}

const ToDoList = ({ todoList, title }: ToDoListProps) => {
  const { selectedDate } = useDateStore();

  return (
    <div className="flex flex-col gap-y-4 mt-5">
      <div className="flex flex-row justify-between">
        <strong>{title}</strong>
        <ToDoAddButton />
      </div>
      {todoList &&
        todoList.map(
          (todo) =>
            isDateSelected(todo.start_date, todo.end_date, selectedDate) && (
              <div key={todo.id} className="border border-black">
                <strong>{todo.title}</strong>
                <div>
                  {changeDateStr(todo.start_date, todo.end_date)} | {todo.place}
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default ToDoList;
