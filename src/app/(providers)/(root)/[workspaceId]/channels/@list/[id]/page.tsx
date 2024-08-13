'use client';

import { useEffect, useState } from 'react';
import ChatList from '../_components/ChatList';
import { ResponseList } from '../../_components/ResponseLayout';
import ChatLayout from '../_components/ChatLayout';
import { BottomBar } from '@/components/PageLayout';
import clsx from 'clsx';
import useIsPC from '@/hooks/useIsPc';

const ChatSlot = () => {
  const isPC = useIsPC();

  return (
    <>
      {!isPC && <BottomBar />}
      <ResponseList className={clsx('hidden', isPC ? 'lg:block' : '')}>
        {isPC && (
          <ChatLayout>
            <ChatList />
          </ChatLayout>
        )}
      </ResponseList>
    </>
  );
};

export default ChatSlot;
