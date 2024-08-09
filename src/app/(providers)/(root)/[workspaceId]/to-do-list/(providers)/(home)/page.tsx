'use client';
import useTodoList from '@/hooks/useTodo';
import useUserStore from '@/store/userStore';
import ToDoList from '../_components/ToDoList';
import WeekButtons from '../_components/WeekButtons';
import WeekDate from '../_components/WeekDate';

const ToDoListPage = () => {
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { todoList, isPending, isError } = useTodoList(workspaceUserId);
  if (!todoList || isError) return;
  if (isPending) return;
  const beforeTodoList = todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList.filter((todo) => todo.status === '완료');

  return (
    <>
      <main className="flex flex-col px-[16px] lg:inline-flex lg:flex-row lg:px-0 lg:h-full">
        <div className="lg:w-[297px] lg:bg-[#F4F4F6]">
          <WeekButtons />
          <WeekDate />
        </div>
        <div className="flex flex-col lg:flex-row">
          <ToDoList title="진행 전" todoList={beforeTodoList} />
          <ToDoList title="진행 중" todoList={progressTodoList} />
          <ToDoList title="완료" todoList={completedTodoList} />
        </div>
      </main>
    </>
  );
};

export default ToDoListPage;
