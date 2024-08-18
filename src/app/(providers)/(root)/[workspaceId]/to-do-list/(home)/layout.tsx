import { BottomBar, PageAside, PageMain, PCHeader, PCWrapper } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import DateSelect from '../_components/DateSelect';
import PcHeader from '../_components/PcHeader';

function TodoListHomeLayout({ children }: StrictPropsWithChildren) {
  return (
    <>
      <PCWrapper>
        <PCHeader isTodoList className="!flex !w-full !relative lg:!w-auto lg:!fixed" />
        <PageAside>
          <DateSelect />
        </PageAside>
        <PageMain>
          <PcHeader />
          {children}
        </PageMain>
        <BottomBar />
      </PCWrapper>
    </>
  );
}

export default TodoListHomeLayout;
