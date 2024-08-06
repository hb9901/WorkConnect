'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GetChatMessageType } from '@/types/chat';
import { useParams } from 'next/navigation';
import { useGetChatMessages, useGetLatestNotice, useGetUsersInChannel } from '../../_hooks/useQueryChat';
import { subscribeToChat } from '../../_utils/subscribe';
import ChatMessages from '../_components/ChatMessages';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import ChatNotice from '../_components/ChatNotice';
import { isEmpty } from '@/utils/isEmpty';
import { useChatHandlers } from '../../(home)/_hooks/useChatHandlers';
import { MessagesContainer, ChatMessagesWrapper } from '../_components/MessagesContainer';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

const ChatDetailPage = () => {
  const { id: channelId } = useParams();
  const stringId = Array.isArray(channelId) ? channelId[0] : channelId;
  const workspaceUserId = useWorkspaceUserId();

  const containerRef = useRef<HTMLDivElement>(null);
  // TODO: useState를 계속 유지할지 고민
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);

  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(channelId),
    workspace_user_id: workspaceUserId
  });

  const { data: latestNotice } = useGetLatestNotice({ id: stringId });

  const { handleChatUpdates, handleUserUpdates } = useChatHandlers({
    stringId,
    latestNotice,
    channelId: stringId,
    setPayloadMessages
  });

  const userIds = useMemo(() => {
    return Object.keys(usersInChannel).join(',');
  }, [usersInChannel]);

  const isPending = isPendingChatMessages || isPendingUsersInChannel;
  const isExistLatestNotice = !isEmpty(latestNotice);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(subscribeToChat({ handleUserUpdates, handleChatUpdates, id: stringId, userIds }), [
    userIds,
    latestNotice?.id
  ]);

  if (isPending) return null;

  return (
    <MessagesContainer>
      {isExistLatestNotice && <ChatNotice latestNotice={latestNotice} />}
      <ChatMessagesWrapper ref={containerRef}>
        <ChatMessages data={chatMessages} usersInChannel={usersInChannel} />
        <ChatMessages data={payloadMessages} usersInChannel={usersInChannel} />
      </ChatMessagesWrapper>
    </MessagesContainer>
  );
};

export default ChatDetailPage;
