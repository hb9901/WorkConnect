'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { MenuIcon } from '@/icons';
import { useGetChannelName, useGetUsersInChannel } from '../../../_hooks/useQueryChat';
import { getDmChannelName } from '../../../_utils/getDmChannelName';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useParams } from 'next/navigation';

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
    <>
      <PageLayout
        title={dmChannelName || channelName || ''}
        showBottomBar={false}
        TopBarRightIcon1={<MenuButton onClick={handleOpenSidebar} aria-label="사이드바 열기" />}
        contentClassName="h-[calc(100dvh-52px)] overflow-hidden"
      >
        {children}
      </PageLayout>
      <Sidebar isOpenSidebar={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} channelName={channelName} />
    </>
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
