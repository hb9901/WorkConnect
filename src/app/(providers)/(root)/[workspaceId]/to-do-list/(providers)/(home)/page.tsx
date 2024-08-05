'use client';
import { PageLayout } from '@/components/PageLayout';
import useTodoList from '@/hooks/useTodo';
import useUserStore from '@/store/userStore';
import ToDoList from '../_components/ToDoList';
import WeekButtons from '../_components/WeekButtons';
import WeekDate from '../_components/WeekDate';

const ToDoListPage = () => {
  const { workspaceUserId } = useUserStore();
  const { todoList } = useTodoList(workspaceUserId);
  if (!todoList) return;
  const beforeTodoList = todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList.filter((todo) => todo.status === '완료');

  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <main className="px-[16px]">
          <WeekButtons />
          <WeekDate />
          <ToDoList title="진행 전" todoList={beforeTodoList} />
          <ToDoList title="진행 중" todoList={progressTodoList} />
          <ToDoList title="완료" todoList={completedTodoList} />
        </main>
      </PageLayout>
    </>
  );
};

export default ToDoListPage;