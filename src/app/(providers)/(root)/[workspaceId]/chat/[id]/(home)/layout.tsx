'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { ContextMenuProvider } from '../_provider/ContextMenuProvider';
import { PageLayout } from '@/components/PageLayout';
import { MenuIcon } from '@/icons';
import { useState } from 'react';
import Sidebar from '../_components/Sidebar';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <ContextMenuProvider>
      <PageLayout
        title="채팅"
        showBottomBar={false}
        TopBarRightIcon1={<MenuButton onClick={handleOpenSidebar} />}
        contentClassName="h-[calc(100dvh-52px)] overflow-hidden"
      >
        {children}
      </PageLayout>
      <Sidebar isOpenSidebar={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} />
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
