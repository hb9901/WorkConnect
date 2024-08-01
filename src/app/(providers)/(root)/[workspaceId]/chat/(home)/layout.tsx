'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChatLayout = ({ children }: StrictPropsWithChildren) => {
  return <PageLayout title="채팅">{children}</PageLayout>;
};

export default ChatLayout;
