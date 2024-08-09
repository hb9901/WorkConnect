'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { MenuIcon } from '@/icons';
import { useGetChannelName } from '../../_hook/useGetChannelName';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // TODO : 다른 페이지에서 이 정보를 가져올때 호출을 줄이는 것을 getQueryData로 해도 되나?, 그냥 호출해도 캐싱 되게 stale Time 해야하나?
  // TODO : Context는 필요 없어 useQuery가 이미 그 역할을 해주니까..
  const channelName = useGetChannelName();

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <PageLayout
        title={channelName}
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
