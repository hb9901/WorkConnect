'use client';

import { BottomBar, PageAside, PageLayout, PageMain, PCHeader } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChannelHomeLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout>
      <PCHeader className="!flex !w-full !relative lg:!w-auto lg:!fixed" isChannels />
      <PageAside> </PageAside>
      <PageMain>{children}</PageMain>
      <BottomBar />
    </PageLayout>
  );
};

export default ChannelHomeLayout;
