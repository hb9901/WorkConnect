import { BottomBar, PageMain, PCWrapper } from '@/components/Layout/PageLayout';
import SelectHeader from '@/components/Layout/SelectHeader';

import { StrictPropsWithChildren } from '@/types/common';

interface HomeLayoutProps {
  params: {
    workspaceId: string;
  };
}

const HomeLayout = ({ children, params }: StrictPropsWithChildren<HomeLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      <PCWrapper isHome>
        <SelectHeader workspaceId={workspaceId} isFull />
        <PageMain className="lg:pl-[87px] lg:!w-full lg:!h-[calc(100dvh-84px)]">{children}</PageMain>
        <BottomBar />
      </PCWrapper>
    </>
  );
};

export default HomeLayout;
