import BottomNavigationBar from '@/components/BottomNavigationBar';
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
      <main>
        <SelectHeader workspaceId={workspaceId} isTodoList isHidden />

        <div className="hidden lg:grid lg:w-full lg:pl-[87px]">
          <PcHeader />
          {todolist}
        </div>
        <div className="w-full lg:w-auto lg:absolute lg:inline-grid lg:grid-cols-3 lg:gap-[12px] lg:bottom-0 lg:left-[400px] lg:top-[84px] lg:right-[17px] lg:rounded-[6px]">
          <div />
          <div />
          <div className="lg:h-full lg:w-full lg:bg-white lg:border-[#E5E7EB] lg:border-l-[1px] overflow-y-scroll">
            {children}
          </div>
        </div>
      </main>
      <>
        <div className="h-[87px]" />
        <BottomNavigationBar className="hidden fixed bottom-0 left-0 z-30 xs:w-full lg:top-[84px] lg:flex lg:items-start lg:w-[87px] lg:h-[vh100%] lg:bg-[#F4F4F6] lg:border-r-[1px] lg:border-grey50" />
      </>
    </>
  );
};

export default TodoAddLayout;
