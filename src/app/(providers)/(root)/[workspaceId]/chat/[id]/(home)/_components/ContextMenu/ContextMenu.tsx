'use client';

import Typography from '@/components/Typography';
import CopyIcon from '@/icons/Copy.svg';
import HashIcon from '@/icons/Hash.svg';
import TrashIcon from '@/icons/Trash.svg';
import { CHAT_TYPE } from '@/constants/chat';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { useContextMenuActions } from '../../_hooks/useContextMenuActions';

const ContextMenu = () => {
  const { contextMenuState, closeContextMenu, copyText, deleteChat, handleNotice } = useContextMenuActions();

  if (!contextMenuState.isOpen) return null;
  const position = contextMenuState.isMe ? contextMenuState.position : contextMenuState.position + 40;

  return (
    <>
      <div
        style={{ bottom: position }}
        className={clsx(
          'fixed rounded-[6px] bg-bgBackground1 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] z-50 w-[154px] flex p-4 gap-[20px] flex-col',
          contextMenuState.position >= 150 ? '' : 'translate-y-[-100%]',
          contextMenuState.isMe ? 'right-[16px]' : 'left-[56px]'
        )}
      >
        {contextMenuState.type === CHAT_TYPE.text && (
          <ContextMenuButton title="복사" onClick={copyText} icon={<CopyIcon />} />
        )}
        <ContextMenuButton title="공지" onClick={handleNotice} icon={<HashIcon />} />
        {contextMenuState.isMe && <ContextMenuButton title="삭제" onClick={deleteChat} icon={<TrashIcon />} />}
      </div>
      <div className="fixed top-0 left-0 w-full h-full z-40" onClick={closeContextMenu} />
    </>
  );
};

type ContextMenuButtonProps = { title: string; icon: React.ReactNode } & ComponentPropsWithoutRef<'button'>;

const ContextMenuButton = ({ title, icon, ...props }: ContextMenuButtonProps) => {
  return (
    <button type="button" className="flex items-center justify-between" {...props}>
      <Typography variant="Subtitle16px" color="grey900">
        {title}
      </Typography>
      {icon}
    </button>
  );
};

export default ContextMenu;
