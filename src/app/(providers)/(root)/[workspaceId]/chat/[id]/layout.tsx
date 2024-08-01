'use client';

import { PageLayout, LayoutContainer } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <LayoutContainer>
      <PageLayout title="채팅" showBottomBar={false}>
        {children}
      </PageLayout>
    </LayoutContainer>
  );
};

export default ChatDetailLayout;
