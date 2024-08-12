'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { useShallow } from 'zustand/react/shallow';
import PcHeader from '../_components/PcHeader';

function TodoListHomeLayout({ children }: { children: React.ReactNode }) {
  const workspaceId = useWorkspaceId();
  const { workspaceList } = useUserStore(
    useShallow((state) => ({
      workspaceList: state.workspaceList
    }))
  );

  if (!(workspaceId && workspaceList)) return <></>;

  return (
    <>
      <PcHeader />
      {children}
    </>
  );
}

export default TodoListHomeLayout;
