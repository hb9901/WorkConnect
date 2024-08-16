'use client';
import useTodoList from '@/hooks/useTodo';
import useUserStore from '@/store/userStore';
import DateSelect from '../DateSelect';
import ToDoList from '../ToDoList/ToDoList';

const ToDoListMain = () => {
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { todoList, isPending, isError } = useTodoList(workspaceUserId);
  if (!todoList || isError) return;
  if (isPending) return;
  const beforeTodoList = todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList.filter((todo) => todo.status === '완료');

  return (
    <>
      <main
        className="flex flex-col px-[16px] lg:inline-flex lg:flex-row lg:px-0 lg:h-full lg:w-full
      lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:scroll-container
      "
      >
        <div className="lg:hidden">
          <DateSelect />
        </div>

        <div className="flex flex-col lg:inline-grid lg:grid-cols-3 lg:pl-[16px] lg:pr-[17px] lg:pt-[24px] lg:gap-[12px] lg:w-full lg:h-full">
          <ToDoList title="진행 전" todoList={beforeTodoList} />
          <ToDoList title="진행 중" todoList={progressTodoList} />
          <ToDoList title="완료" todoList={completedTodoList} />
        </div>
      </main>
    </>
  );
};

export default ToDoListMain;
