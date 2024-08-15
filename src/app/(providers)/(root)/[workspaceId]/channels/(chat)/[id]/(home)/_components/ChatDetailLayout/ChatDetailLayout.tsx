'use client';

import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/NewPageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { MenuIcon } from '@/icons';
import { useFetchChannelName } from '../../_hooks/useFetchChannelName';
import { TopBar } from '@/components/TopBar';
import ChannelList from '../../../../../_components/ChannelList';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const channelName = useFetchChannelName();

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  // TODO: BottomBar 모바일에서는 안 보여야해서 컴포넌트 나눈거임
  return (
    <>
      <PageLayout>
        <PageAside>
          <ChannelList />
        </PageAside>
        <PageMain className="h-dvh overflow-hidden">
          <TopBar
            title={channelName}
            TopBarRightIcon1={<MenuButton onClick={handleOpenSidebar} aria-label="사이드바 열기" />}
          />
          {children}
        </PageMain>
        <BottomBar className="hidden lg:block" />
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
