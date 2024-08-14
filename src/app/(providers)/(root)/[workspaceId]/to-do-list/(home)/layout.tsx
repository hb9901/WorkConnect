import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import { StrictPropsWithChildren } from '@/types/common';
import PcHeader from '../_components/PcHeader';

interface TodoListHomeLayoutProps {
  params: {
    workspaceId: string;
  };
}

function TodoListHomeLayout({ children, params }: StrictPropsWithChildren<TodoListHomeLayoutProps>) {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <SelectHeader workspaceId={workspaceId} isTodoList />
        <PcHeader />
        <div className="grid w-full lg:pl-[87px]">{children}</div>
      </PageLayout>
    </>
  );
}

export default TodoListHomeLayout;
