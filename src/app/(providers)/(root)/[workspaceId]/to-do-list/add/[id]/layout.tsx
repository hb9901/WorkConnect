import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import { StrictPropsWithChildren } from '@/types/common';
import PcHeader from '../../_components/PcHeader';

interface TodoAddLayoutProps {
  todolist: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const TodoAddLayout = ({ children, todolist, params }: StrictPropsWithChildren<TodoAddLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      {/*모바일 레이아웃 */}
      <div className="lg:hidden">
        <div className="hidden lg:grid lg:w-full">
          <PcHeader />
          {todolist}
        </div>
        <div className="w-full">{children}</div>
      </div>
      {/*PC 레이아웃 */}
      <div className="hidden lg:grid">
        <PageLayout title="" showTopBar={false}>
          <SelectHeader workspaceId={workspaceId} isTodoList />
          <div className="hidden lg:grid lg:w-full lg:pl-[87px]">
            <PcHeader />
            {todolist}
          </div>
          <div className="hidden lg:absolute lg:inline-grid lg:grid-cols-3 lg:gap-[12px] lg:bottom-0 lg:left-[400px] lg:top-[84px] lg:right-[17px] lg:rounded-[6px]">
            <div />
            <div />
            <div className="lg:h-full lg:w-full lg:bg-white lg:border-[#E5E7EB] lg:border-l-[1px]"> {children}</div>
          </div>
        </PageLayout>
      </div>
    </>
  );
};

export default TodoAddLayout;
