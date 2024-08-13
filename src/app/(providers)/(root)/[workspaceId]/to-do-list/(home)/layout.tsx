'use client';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';
import { useShallow } from 'zustand/react/shallow';
import PcHeader from '../_components/PcHeader';

interface TodoListHomeLayoutProps {
  add: React.ReactNode;
}

function TodoListHomeLayout({ children, add }: StrictPropsWithChildren<TodoListHomeLayoutProps>) {
  const workspaceId = useWorkspaceId();
  const { workspaceList } = useUserStore(
    useShallow((state) => ({
      workspaceList: state.workspaceList
    }))
  );

  if (!(workspaceId && workspaceList)) return <></>;

  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <SelectHeader workspaceId={workspaceId} isTodoList />
        <PcHeader />
        <div className="hidden lg:grid lg:w-full">{children}</div>
        <div className="w-full lg:max-w-[calc((100dvw-297px)/3)] lg:absolute lg:top-[84px] lg:right-0 lg:transition-all lg:duration-200">
          {add}
        </div>
      </PageLayout>
    </>
  );
}

export default TodoListHomeLayout;
