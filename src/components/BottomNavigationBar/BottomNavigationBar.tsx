'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import CalendarIcon from '@/icons/Calendar.svg';
import HomeIcon from '@/icons/HomeIcon.svg';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationBar, Tab } from '../NavigationBar/NavigationBar';

const TABS = [
  { path: '/', activePath: '/', label: '홈', Icon: HomeIcon, device: 'both', exact: true },
  { path: '/channels?redirect=true', activePath: '/channels', label: '대화', Icon: MessageCircleIcon, device: 'pc' },
  { path: '/channels', activePath: '/channels', label: '대화', Icon: MessageCircleIcon, device: 'mobile' },
  { path: '/to-do-list', activePath: '/to-do-list', label: '일정', Icon: CalendarIcon, device: 'both' }
];

const BottomNavigationBar = ({ className }: { className?: string }) => {
  const pathName = usePathname();
  const curPathName = `/${pathName.split('/')[2] ?? ''}`;
  const workspaceId = useWorkspaceId();

  return (
    <div className={className}>
      <NavigationBar className="flex lg:flex-col">
        {TABS.map(({ path, label, Icon, device, exact, activePath }) => {
          const isActive = exact ? curPathName === path : curPathName.includes(activePath);

          return (
            <Tab
              key={path}
              active={isActive}
              className={clsx(device === 'mobile' ? 'lg:hidden' : '', device === 'pc' ? 'hidden lg:block' : '')}
            >
              <Link href={`/${workspaceId}${path}`} className="w-full">
                <Icon
                  className={clsx(
                    'stroke-current items-center justify-center mx-auto mb-3',
                    isActive ? 'stroke-primary200Main text-primary200Main' : 'stroke-gray-500 text-gray-500'
                  )}
                />
                {label}
              </Link>
            </Tab>
          );
        })}
      </NavigationBar>
    </div>
  );
};

export default BottomNavigationBar;
