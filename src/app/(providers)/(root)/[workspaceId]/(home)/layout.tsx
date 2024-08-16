import { BottomBar, PageMain, PCWrapper } from '@/components/Layout/PageLayout';
import SelectHeader from '@/components/Layout/SelectHeader';

import { StrictPropsWithChildren } from '@/types/common';

interface HomeParallelLayoutProps {
  params: {
    workspaceId: string;
  };
}

const HomeParallelLayout = ({ children, params }: StrictPropsWithChildren<HomeParallelLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      <PCWrapper isHome>
        <SelectHeader workspaceId={workspaceId} isFull />
        <PageMain className="lg:pl-[87px] lg:!w-full">{children}</PageMain>
        <BottomBar />
      </PCWrapper>
    </>
  );
};

export default HomeParallelLayout;
