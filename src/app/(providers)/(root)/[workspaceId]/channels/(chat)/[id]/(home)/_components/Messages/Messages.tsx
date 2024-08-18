'use client';

import { useEffect, useRef } from 'react';
import Chats from '../Chats';
import { MessagesWrapper } from '../MessagesContainer';
import { useGetChatMessages, useGetUsersInChannel } from '../../../../_hook/useChatQuery';
import { useChatHandlers } from '../../_hooks/useChatHandlers';
import { handleSubscribeToChat } from '../../_utils/subscribe';
import useGetParamsChannelId from '../../../../_hook/useGetParamsChannelId';

const Messages = () => {
  const channelId = useGetParamsChannelId();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages = [], isPending } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { payloadMessages, handleMessagesUpdates, handleUserInfoUpdates } = useChatHandlers();

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

    const channel = handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserInfoUpdates: handleUserInfoUpdates({ channelId }),
      id: channelId,
      userIds: Object.keys(usersInChannel).join(',')
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId, isPendingUsersInChannel]);

  return (
    <MessagesWrapper ref={containerRef}>
      <Chats data={chatMessages} usersInChannel={usersInChannel} />
      <Chats data={payloadMessages} usersInChannel={usersInChannel} />
    </MessagesWrapper>
  );
};

export default Messages;
