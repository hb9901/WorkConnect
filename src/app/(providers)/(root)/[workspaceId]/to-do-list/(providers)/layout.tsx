'use client';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface TodoParallelLayoutProps {
  add: React.ReactNode;
}

const TodoParallelLayout = ({ children, add }: PropsWithChildren<TodoParallelLayoutProps>) => {
  const paths = usePathname().split('/');

  if (paths.length === 3 && paths[2] === 'to-do-list')
    return (
      <>
        <div className="">{children}</div>
      </>
    );

  return (
    <>
      <div className="hidden lg:grid lg:w-full">{children}</div>
      <div className="w-full lg:max-w-[calc((100dvw-297px)/3)] lg:absolute lg:top-[84px] lg:right-0 lg:transition-all lg:duration-200">
        {add}
      </div>
    </>
  );
};

export default TodoParallelLayout;
