'use client';

import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/Layout/PageLayout';
import { TopBar } from '@/components/Layout/TopBar';
import { StrictPropsWithChildren } from '@/types/common';
import { MessageChatButton, VideoChatButton } from '../_components/TopBarButtons';

const ChannelHomeLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout>
      <PageAside> </PageAside>
      <PageMain>
        <TopBar title="대화" Icon3={<VideoChatButton />} Icon4={<MessageChatButton />} />
        {children}
      </PageMain>
      <BottomBar />
    </PageLayout>
  );
};

export default ChannelHomeLayout;
