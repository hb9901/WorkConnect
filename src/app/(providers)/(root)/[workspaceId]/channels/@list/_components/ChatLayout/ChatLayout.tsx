'use client';

import { PageLayout } from '@/components/PageLayout';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { MessagePlusIcon, Video48Icon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import Link from 'next/link';

const ChatLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();

  return (
    <PageLayout
      title="대화"
      TopBarRightIcon2={<VideoChatButton workspaceId={workspaceId} />}
      TopBarRightIcon1={<MessageChatButton workspaceId={workspaceId} />}
    >
      {children}
    </PageLayout>
  );
};

const VideoChatButton = ({ workspaceId }: { workspaceId: number }) => {
  return (
    <Link href={`/${workspaceId}/channels/add?type=video`}>
      <Video48Icon className="text-grey700Black stroke-current w-6 h-6" />
    </Link>
  );
};

const MessageChatButton = ({ workspaceId }: { workspaceId: number }) => {
  return (
    <Link href={`/${workspaceId}/channels/add?type=chat`}>
      <MessagePlusIcon className="text-grey700Black stroke-current w-6 h-6" />
    </Link>
  );
};

export default ChatLayout;
