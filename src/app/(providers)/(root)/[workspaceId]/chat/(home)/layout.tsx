'use client';

import { PageLayout, LayoutContainer } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChatLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <LayoutContainer>
      <PageLayout title="채팅">{children}</PageLayout>
    </LayoutContainer>
  );
};

export default ChatLayout;
