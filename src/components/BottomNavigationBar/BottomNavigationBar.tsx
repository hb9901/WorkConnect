'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import CalendarIcon from '@/icons/Calendar.svg';
import HomeIcon from '@/icons/HomeIcon.svg';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import UserIcon from '@/icons/User.svg';
import useBottomNavigationStore from '@/store/bottomNavigationStore';
import useUserStore from '@/store/userStore';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { NavigationBar, Tab } from '../NavigationBar/NavigationBar';

const BottomNavigationBar = ({ className }: { className?: string }) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { bottomIndex, setBottomIndex } = useBottomNavigationStore(
    useShallow((state) => ({
      bottomIndex: state.bottomIndex,
      setBottomIndex: state.setBottomIndex
    }))
  );

  const handleClick = (index: number) => {
    setBottomIndex(index);
  };

  return (
    <div className={className}>
      <NavigationBar>
        <Tab active={bottomIndex === 0} onClick={() => handleClick(0)}>
          <Link href={`/${workspaceId}`} className="w-full">
            <HomeIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                bottomIndex === 0 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            홈
          </Link>
        </Tab>
        <Tab active={bottomIndex === 1} onClick={() => handleClick(1)}>
          <Link href={`/${workspaceId}/chat`} className="w-full">
            <MessageCircleIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                bottomIndex === 1 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            대화
          </Link>
        </Tab>
        <Tab active={bottomIndex === 2} onClick={() => handleClick(2)}>
          <Link href={`/${workspaceId}/to-do-list`} className="w-full">
            <CalendarIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                bottomIndex === 2 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            일정
          </Link>
        </Tab>
        <Tab active={bottomIndex === 3} onClick={() => handleClick(3)}>
          <Link href={`/${workspaceId}/profile/${workspaceUserId}`} className="w-full">
            <UserIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                bottomIndex === 3 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            마이페이지
          </Link>
        </Tab>
      </NavigationBar>
    </div>
  );
};

export default BottomNavigationBar;
