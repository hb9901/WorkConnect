'use client';
import useTodoList from '@/hooks/useTodo';
import { Tables } from '@/types/supabase';

import Header from './_components/Header';
import ToDoList from './_components/ToDoList';
import WeekButtons from './_components/WeekButtons';
import WeekDate from './_components/WeekDate';

const ToDoListPage = () => {
  const { todoList }: { todoList: Tables<'todo'>[] | undefined } = useTodoList();
  const beforeTodoList = todoList && todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList && todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList && todoList.filter((todo) => todo.status === '진행 완료');

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mt-5 px-4">
        <WeekButtons />
        <WeekDate />
        <ToDoList title="진행 전" todoList={beforeTodoList} />
        <ToDoList title="진행 중" todoList={progressTodoList} />
        <ToDoList title="진행 완료" todoList={completedTodoList} />
      </main>
    </>
  );
};

export default ToDoListPage;
