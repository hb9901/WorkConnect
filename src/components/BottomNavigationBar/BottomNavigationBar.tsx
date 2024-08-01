'use client';

import CalendarIcon from '@/icons/Calendar.svg';
import HomeIcon from '@/icons/HomeIcon.svg';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import UserIcon from '@/icons/User.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { NavigationBar, Tab } from '../NavigationBar/NavigationBar';

const BottomNavigationBar = ({ className }: { className?: string }) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={className}>
      <NavigationBar>
        <Tab active={activeIndex === 0} onClick={() => handleClick(0)}>
          <Link href={`/${workspaceId}`}>
            <HomeIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                activeIndex === 0 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            홈
          </Link>
        </Tab>
        <Tab active={activeIndex === 1} onClick={() => handleClick(1)}>
          <Link href={`/${workspaceId}/chat`}>
            <MessageCircleIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                activeIndex === 1 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            대화
          </Link>
        </Tab>
        <Tab active={activeIndex === 2} onClick={() => handleClick(2)}>
          <Link href={`/${workspaceId}/to-do-list`}>
            <CalendarIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                activeIndex === 2 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            일정
          </Link>
        </Tab>
        <Tab active={activeIndex === 3} onClick={() => handleClick(3)}>
          <Link href={`/${workspaceId}/profile/${workspaceUserId}`}>
            <UserIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                activeIndex === 3 ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
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
