'use client';
import LoadingSpinner2 from '@/components/LoadingSpinner2';
import TodoEmpty from '@/components/TodoEmpty';
import useTodoList from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import useUserStore from '@/store/userStore';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import DateSelect from '../DateSelect';
import { isDateSelected } from '../ToDoList/function';
import ToDoList from '../ToDoList/ToDoList';
import TodoListTitle from '../TodoListTitle';

const ToDoListMain = () => {
  const urlPath = usePathname();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { todoList, isPending, isError } = useTodoList(workspaceUserId);
  const selectedDate = useDateStore((state) => state.selectedDate);
  if (isPending) return <LoadingSpinner2 />;

  if (!todoList || isError) return;
  console.log(urlPath.split('/').length > 4);
  const selectedTodoList = todoList.filter((todo) => isDateSelected(todo.start_date, todo.end_date, selectedDate));
  if (selectedTodoList.length === 0)
    return (
      <>
        <main
          className="flex flex-col lg:w-full lg:h-full
      lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:scroll-container
      "
        >
          <div className="lg:grid lg:grid-cols-3 lg:pl-[16px] lg:pr-[17px] lg:pt-[24px] lg:gap-[12px] lg:w-full ">
            <div className={todoListClass({ title: '진행 전' })}>
              <TodoListTitle title="진행 전" />
            </div>
            <div className={todoListClass({ title: '진행 중' })}>
              <TodoListTitle title="진행 중" />
            </div>
            <div className={todoListClass({ title: '완료' })}>
              <TodoListTitle title="완료" />
            </div>
          </div>

          <TodoEmpty isOpen={urlPath.split('/')[4] === 'new'} />
        </main>
      </>
    );

  const beforeTodoList = selectedTodoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = selectedTodoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = selectedTodoList.filter((todo) => todo.status === '완료');

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

const todoListClass = cva('flex flex-col mt-[24px] lg:mt-0 lg:px-[12px] lg:py-[24px] lg:bottom-0 lg:rounded-[6px]', {
  variants: {
    title: {
      '진행 전': 'lg:bg-[#FAFAFF]',
      '진행 중': 'lg:bg-[#EBECFE]',
      완료: 'lg:bg-[#F7F7F7]'
    }
  }
});
