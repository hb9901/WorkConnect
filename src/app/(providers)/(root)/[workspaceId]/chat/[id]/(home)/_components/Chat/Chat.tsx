'use client';

import { memo, useCallback, useMemo, type ComponentProps } from 'react';
import { CHAT_TYPE } from '@/constants/chat';
import clsx from 'clsx';
import type { ContextMenuContextType } from '../../_provider/ContextMenuProvider';
import ChatImage from '../../../_components/ChatImage';
import ChatVideo from '../../../_components/ChatVideo';
import useLongPress from '@/hooks/useLongPress';
import { ChatFile, ChatText, ChatNotice } from './Components';

type HandleContextMenuEventProps = React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>;

type ChatMessageProps = {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
  noticeUrl: string;
  openContextMenu: ContextMenuContextType['openContextMenu'];
};

const DATA_TARGET = 'message';

const getStyles = (isMe: boolean) => ({
  margin: isMe ? '' : 'ml-[40px] mt-[6px]',
  rounded: isMe ? 'rounded-br-none' : 'rounded-tl-none',
  background: isMe ? 'bg-[#EBECFE]' : 'bg-grey50',
  select: 'prevent-select'
});

export const ChatMessage = memo(({ content, type, isMe, id, noticeUrl, openContextMenu }: ChatMessageProps) => {
  const { margin, rounded, background, select } = useMemo(() => getStyles(isMe), [isMe]);

  const handleContextMenu = useCallback(
    (event: React.TouchEvent | HandleContextMenuEventProps) => {
      event.preventDefault?.();

      const targetElement = (event.target as HTMLElement)?.closest('[data-target="message"]')?.getBoundingClientRect();
      if (!targetElement) return;

      openContextMenu({ targetElement, id, type, text: content, isMe });
    },
    [openContextMenu, id, type, content, isMe]
  );

  const { onTouchStart, onTouchEnd } = useLongPress(handleContextMenu);

  switch (type) {
    case CHAT_TYPE.image:
      return (
        <ChatImage
          src={content}
          className={clsx('rounded-lg w-[200px] h-auto', margin, select)}
          width={300}
          height={300}
          data-target={DATA_TARGET}
          onContextMenu={handleContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      );
    case CHAT_TYPE.document:
      return (
        <ChatFile
          fileUrl={content}
          fileName={content.split('/').pop() || ''}
          className={clsx(margin, select)}
          data-target={DATA_TARGET}
          onContextMenu={handleContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      );
    case CHAT_TYPE.video:
      return (
        <ChatVideo
          src={content}
          className={clsx('rounded-lg', margin, select)}
          width={200}
          controls
          data-target={DATA_TARGET}
          onContextMenu={handleContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      );
    case CHAT_TYPE.text:
      return (
        <ChatText
          className={clsx(background, margin, rounded, select)}
          data-target={DATA_TARGET}
          onContextMenu={handleContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {content}
        </ChatText>
      );

    case CHAT_TYPE.notice:
      return (
        <ChatNotice
          noticeUrl={noticeUrl}
          className={clsx(margin, rounded, select)}
          data-target={DATA_TARGET}
          onContextMenu={handleContextMenu}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {content}
        </ChatNotice>
      );
    default:
      return null;
  }
});
