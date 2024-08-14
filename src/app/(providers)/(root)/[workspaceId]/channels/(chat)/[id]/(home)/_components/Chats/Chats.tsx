'use client';

import type { GetChatMessageType } from '@/types/chat';
import { ChatMessage } from '../Chat';
import type { GetUsersInChannelResponse } from '@/types/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useParams } from 'next/navigation';
import { isEmpty } from '@/utils/isEmpty';
import { useContextMenu } from '../../_provider/ContextMenuProvider';
import { formatDate } from '@/utils/time';
import { OtherProfile, ReadBadge, Time } from './Components';
import { useMemo } from 'react';
import { getLastActiveAtForChannel } from '../../_utils/getLastActiveAtForChannel';
import dayjs from 'dayjs';

type ChatMessagesProps = {
  data: GetChatMessageType[] & { channel_id?: string };
  usersInChannel: GetUsersInChannelResponse;
};

// TODO: video onLoad event 가 있으면 모두 다 로딩된 후에 스크롤을 가장 아래로 내리도록 수정

const Chats = ({ data = [], usersInChannel = {} }: ChatMessagesProps) => {
  const { id: channelId } = useParams();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const { openContextMenu } = useContextMenu();
  const lastActiveAt = useMemo(() => getLastActiveAtForChannel({ usersInChannel, workspaceUserId }), [usersInChannel]);

  const noticeUrl = `/${workspaceId}/channels/${channelId}/notice`;

  if (isEmpty(usersInChannel)) return null;

  return (
    <>
      {data.map((chat) => {
        const userInfo = usersInChannel[chat.workspace_user_id];
        const isMe = chat.workspace_user_id === workspaceUserId;
        const profileUrl = `/${workspaceId}/profile/${chat.workspace_user_id}`;
        const hasRead = isMe && lastActiveAt?.isAfter(dayjs(chat.created_at));

        return (
          <div key={chat.id} className={`flex items-end gap-2 justify-end ${isMe ? '' : 'flex-wrap flex-row-reverse'}`}>
            {!isMe && (
              <OtherProfile profileImage={userInfo?.profile_image} name={userInfo?.name} profileUrl={profileUrl} />
            )}
            <div className="flex flex-col gap-1">
              {hasRead && <ReadBadge />}
              <Time>{formatDate(chat.created_at, 'A h:mm').toKor()}</Time>
            </div>
            <ChatMessage
              content={chat.content}
              type={chat.type}
              id={chat.id}
              isMe={isMe}
              noticeUrl={noticeUrl}
              openContextMenu={openContextMenu}
            />
          </div>
        );
      })}
    </>
  );
};

export default Chats;
