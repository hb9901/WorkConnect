import { BottomBar, PageAside, PageMain, PCHeader, PCWrapper } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import DateSelect from '../../_components/DateSelect';
import PcHeader from '../../_components/PcHeader';

interface TodoAddLayoutProps {
  todolist: React.ReactNode;
}

const TodoAddLayout = ({ children, todolist }: StrictPropsWithChildren<TodoAddLayoutProps>) => {
  return (
    <>
      <PCWrapper>
        <PCHeader className="grid lg:!fixed" />
        <PageAside>
          <DateSelect />
        </PageAside>
        <PageMain className="hidden lg:flex lg:flex-col">
          <PcHeader />
          {todolist}
        </PageMain>
        <div
          className="w-full lg:w-auto lg:absolute lg:inline-grid lg:grid-cols-3 
          lg:bottom-0 lg:left-[360px] lg:top-[84px] lg:right-0 "
        >
          <div />
          <div />
          <div
            className="lg:h-full lg:w-full lg:bg-white lg:border-[#E5E7EB] lg:border-l-[1px]
            lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:scroll-container"
          >
            {children}
          </div>
        </div>
        <BottomBar />
      </PCWrapper>
    </>
  );
};

export default TodoAddLayout;
