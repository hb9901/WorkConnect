import { useEffect, useMemo, useRef } from 'react';
import Chats from '../Chats';
import { useParams } from 'next/navigation';
import { useGetChatMessages, useGetUsersInChannel } from '../../../_hooks/useQueryChat';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { handleSubscribeToChat } from '../../../_utils/subscribe';
import { MessagesWrapper } from '../MessagesContainer';
import { useChatHandlers } from '../../_hook/useChatHandlers';

const Messages = () => {
  const { id } = useParams();
  const channelId = Array.isArray(id) ? id[0] : id;
  const workspaceUserId = useWorkspaceUserId();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { payloadMessages, handleMessagesUpdates, handleUserUpdates } = useChatHandlers();

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(channelId),
    workspace_user_id: workspaceUserId
  });

  const userIds = useMemo(() => {
    return Object.keys(usersInChannel).join(',');
  }, [usersInChannel]);

  const isPending = isPendingChatMessages || isPendingUsersInChannel;

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(() => {
    if (!userIds || !channelId) return;

    handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserUpdates: handleUserUpdates({ channelId }),
      id: channelId,
      userIds
    });
  }, [userIds, channelId]);

  return (
    <MessagesWrapper ref={containerRef}>
      <Chats data={chatMessages} usersInChannel={usersInChannel} />
      <Chats data={payloadMessages} usersInChannel={usersInChannel} />
    </MessagesWrapper>
  );
};

export default Messages;
