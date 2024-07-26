'use client';
import useTodo from '@/hooks/useTodo';
import { Tables } from '@/types/supabase';
import ToDoList from './_components/ToDoList';
import WeekButtons from './_components/WeekButtons';
import WeekDate from './_components/WeekDate';
import WeekName from './_components/WeekName';

const ToDoListPage = () => {
  const { todoList }: { todoList: Tables<'todo'>[] } = useTodo();
  const beforeTodoList = todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList.filter((todo) => todo.status === '진행 완료');

  return (
    <>
      <header></header>
      <main>
        <WeekButtons />
        <WeekName />
        <WeekDate />
        <ToDoList title="진행 전" todoList={beforeTodoList} />
        <ToDoList title="진행 중" todoList={progressTodoList} />
        <ToDoList title="진행 완료" todoList={completedTodoList} />
      </main>
    </>
  );
};

export default ToDoListPage;
