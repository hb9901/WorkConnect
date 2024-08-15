'use client';

import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/NewPageLayout';
import { TopBar } from '@/components/TopBar';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { MessagePlusIcon, Video48Icon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import Link from 'next/link';
import ChannelList from '../_components/ChannelList';

const ChannelHomeLayout = ({ children, list }: StrictPropsWithChildren<{ list: React.ReactNode }>) => {
  const workspaceId = useWorkspaceId();

  return (
    <PageLayout>
      <PageAside>
        <ChannelList />
      </PageAside>
      <PageMain>
        <TopBar
          title="대화"
          TopBarRightIcon2={<VideoChatButton workspaceId={workspaceId} />}
          TopBarRightIcon1={<MessageChatButton workspaceId={workspaceId} />}
        />
        {children}
      </PageMain>
      <BottomBar />
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

export default ChannelHomeLayout;
