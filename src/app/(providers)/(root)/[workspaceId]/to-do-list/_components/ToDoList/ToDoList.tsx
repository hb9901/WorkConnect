'use client';

import { Tables } from '@/types/supabase';
import { useDroppable } from '@dnd-kit/core';
import { cva, VariantProps } from 'class-variance-authority';
import Todo from '../Todo/Todo';
import TodoListTitle from '../TodoListTitle';

type ToDoListProps = {
  todoList: Tables<'todo'>[] | undefined;
} & VariantProps<typeof todoListClass>;

const ToDoList = ({ todoList, title }: ToDoListProps) => {
  if (!todoList || !title)
    return (
      <div className={todoListClass({ title })}>
        <TodoListTitle title={title} />
      </div>
    );

  const { setNodeRef } = useDroppable({
    id: 'todo' + title,
    data: {
      status: title
    }
  });

  return (
    <div className={todoListClass({ title })} ref={setNodeRef}>
      <TodoListTitle title={title} />
      <div className="flex flex-col gap-[8px] mt-[12px] lg:mt-[18px]">
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            startDate={todo.start_date}
            endDate={todo.end_date}
            place={todo.place}
            priority={todo.priority}
            status={todo.status}
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
