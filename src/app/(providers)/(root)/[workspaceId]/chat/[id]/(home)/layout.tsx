'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { ContextMenuProvider } from '../_provider/ContextMenuProvider';
import ChatDetailLayout from '../_components/ChatDetailLayout';

const ChatDetailHomeLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <ContextMenuProvider>
      <ChatDetailLayout>{children}</ChatDetailLayout>
    </ContextMenuProvider>
  );
};

export default ChatDetailHomeLayout;
