'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { MenuIcon, MessagePlusIcon, Video48Icon } from '@/icons';
import Link from 'next/link';

export const VideoChatButton = () => {
  const workspaceId = useWorkspaceId();

  return (
    <Link href={`/${workspaceId}/channels/add?type=video`}>
      <Video48Icon className="text-grey700Black stroke-current w-6 h-6" />
    </Link>
  );
};

export const MessageChatButton = () => {
  const workspaceId = useWorkspaceId();

  return (
    <Link href={`/${workspaceId}/channels/add?type=chat`}>
      <MessagePlusIcon className="text-grey700Black stroke-current w-6 h-6" />
    </Link>
  );
};

export const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick} aria-label="메뉴 열기">
      <MenuIcon />
    </button>
  );
};
