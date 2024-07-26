'use client';

import useTodo from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import { Tables } from '@/types/supabase';
import { changeDateStr, isDateSelected } from './function';

const ToDoList = () => {
  const { todoList }: { todoList: Tables<'todo'>[] } = useTodo();
  const { selectedDate } = useDateStore();
  console.log(todoList);
  return (
    <div className="flex flex-col gap-y-4 mt-5">
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
