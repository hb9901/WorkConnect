'use client';

import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { StrictPropsWithChildren } from '@/types/common';

const ChatLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceUserId = useWorkspaceUserId();

  if (!workspaceUserId) return null;

  return <>{children}</>;
};

export default ChatLayout;
