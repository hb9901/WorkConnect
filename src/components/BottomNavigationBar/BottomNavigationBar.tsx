'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import CalendarIcon from '@/icons/Calendar.svg';
import HomeIcon from '@/icons/HomeIcon.svg';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import UserIcon from '@/icons/User.svg';
import useUserStore from '@/store/userStore';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationBar, Tab } from '../NavigationBar/NavigationBar';

const BottomNavigationBar = ({ className }: { className?: string }) => {
  const pathName = usePathname();
  const curPath = pathName.split('/')[2];
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  return (
    <div className={className}>
      <NavigationBar>
        <Tab active={!curPath}>
          <Link href={`/${workspaceId}`} className="w-full">
            <HomeIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                !curPath ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            홈
          </Link>
        </Tab>
        <Tab active={curPath === 'chat'}>
          <Link href={`/${workspaceId}/chat`} className="w-full">
            <MessageCircleIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                curPath === 'chat' ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            대화
          </Link>
        </Tab>
        <Tab active={curPath === 'to-do-list'}>
          <Link href={`/${workspaceId}/to-do-list`} className="w-full">
            <CalendarIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                curPath === 'to-do-list' ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
              )}
            />
            일정
          </Link>
        </Tab>
        <Tab active={curPath === 'profile'}>
          <Link href={`/${workspaceId}/profile/${workspaceUserId}`} className="w-full">
            <UserIcon
              className={clsx(
                'stroke-current items-center justify-center mx-auto mb-3',
                curPath === 'profile' ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
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
