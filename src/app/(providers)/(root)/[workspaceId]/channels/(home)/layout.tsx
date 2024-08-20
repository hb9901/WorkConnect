'use client';

import { BottomBar, PageMain, PCHeader, PCWrapper } from '@/components/Layout/PageLayout';
import { TopBar } from '@/components/Layout/TopBar';
import { StrictPropsWithChildren } from '@/types/common';
import { MessageChatButton, VideoChatButton } from '../_components/TopBarButtons';

const ChannelHomeLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PCWrapper>
      <PCHeader className="!flex !w-full !relative lg:!fixed" isChannels isFull />
      <PageMain className="!w-full">
        <TopBar title="대화" Icon3={<VideoChatButton />} Icon4={<MessageChatButton />} className="!hidden lg:!flex" />
        {children}
      </PageMain>
      <BottomBar />
    </PCWrapper>
  );
};

export default ChannelHomeLayout;
