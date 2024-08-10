'use client';

import { useEffect, useRef } from 'react';
import Chats from '../Chats';
import { useParams } from 'next/navigation';
import { MessagesWrapper } from '../MessagesContainer';
import { useGetChatMessages, useGetUsersInChannel } from '../../../../_hook/useChatQuery';
import { useChatHandlers } from '../../_hook/useChatHandlers';
import { handleSubscribeToChat } from '../../_utils/subscribe';

const Messages = () => {
  const { id } = useParams();

  const channelId = Array.isArray(id) ? id[0] : id;
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages = [], isPending } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { payloadMessages, handleMessagesUpdates, handleUserUpdates } = useChatHandlers();

  const {
    data: usersInChannel = {},
    isLoading,
    isPending: isPendingUsersInChannel
  } = useGetUsersInChannel(Number(channelId));

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages, isLoading]);

  useEffect(() => {
    if (!channelId || isPendingUsersInChannel) return;

    handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserUpdates: handleUserUpdates({ channelId }),
      id: channelId,
      userIds: Object.keys(usersInChannel).join(',')
    });
  }, [channelId, isPendingUsersInChannel]);

  return (
    <MessagesWrapper ref={containerRef}>
      <Chats data={chatMessages} usersInChannel={usersInChannel} />
      <Chats data={payloadMessages} usersInChannel={usersInChannel} />
    </MessagesWrapper>
  );
};

export default Messages;
