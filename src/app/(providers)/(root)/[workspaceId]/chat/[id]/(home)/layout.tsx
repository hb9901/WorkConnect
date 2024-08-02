'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { ContextMenuProvider } from '../_provider/ContextMenuProvider';
import { PageLayout } from '@/components/PageLayout';
import { MenuIcon } from '@/icons';
import { useState } from 'react';
import Sidebar from '../_components/Sidebar';
import { useGetChannelName, useGetUsersInChannel } from '../../_hooks/useQueryChat';
import { useParams } from 'next/navigation';
import { getDmChannelName } from '../../_utils/getDmChannelName';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const workspaceUserId = useWorkspaceUserId();
  const { id } = useParams();
  const stringId = Array.isArray(id) ? id[0] : id;
  const { data: groupChannelName } = useGetChannelName({ id: stringId });

  const { data: usersInChannel = {} } = useGetUsersInChannel({
    channel_id: Number(stringId),
    workspace_user_id: workspaceUserId
  });

  const dmChannelName = getDmChannelName(usersInChannel);
  const channelName = dmChannelName || groupChannelName || '';

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <ContextMenuProvider>
      <PageLayout
        title={dmChannelName || channelName || ''}
        showBottomBar={false}
        TopBarRightIcon1={<MenuButton onClick={handleOpenSidebar} />}
        contentClassName="h-[calc(100dvh-52px)] overflow-hidden"
      >
        {children}
      </PageLayout>
      <Sidebar isOpenSidebar={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} channelName={channelName} />
    </ContextMenuProvider>
  );
};

const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick}>
      <MenuIcon />
    </button>
  );
};

export default ChatDetailLayout;
