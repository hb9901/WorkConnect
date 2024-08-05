'use client';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useUserStore from '@/store/userStore';
import { useShallow } from 'zustand/react/shallow';

function TodoListHomeLayout({ children }: { children: React.ReactNode }) {
  const { workspaceId, workspaceList } = useUserStore(
    useShallow((state) => ({
      workspaceId: state.workspaceId,
      workspaceList: state.workspaceList
    }))
  );

  if (!(workspaceId && workspaceList))
    return (
      <PageLayout title="" showTopBar={false}>
        <></>
      </PageLayout>
    );

  return (
    <PageLayout title="" showTopBar={false}>
      <SelectHeader workspaceList={workspaceList} workspaceId={workspaceId} isTodoList />
      {children}
    </PageLayout>
  );
}

export default TodoListHomeLayout;