'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GetChatMessageType } from '@/types/chat';
import { useParams } from 'next/navigation';
import { useGetChatMessages, useGetLatestNotice, useGetUsersInChannel } from '../../_hooks/useQueryChat';
import { subscribeToChat } from '../../_utils/subscribe';
import ChatMessagesWrapper from '../_components/ChatMessagesWrapper';
import ChatMessages from '../_components/ChatMessages';
import ChatFooter from '../_components/ChatFooter';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import ChatNotice from '../_components/ChatNotice';
import { isEmpty } from '@/utils/isEmpty';
import { useChatHandlers } from '../../(home)/_hooks/useChatHandlers';

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
  const [isOpenUtil, setIsOpenUtil] = useState(false);

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

  const handleOpenUtil = () => {
    setIsOpenUtil((prev) => !prev);
  };

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
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+42px)] transform ease-in-out duration-300 ${
        isOpenUtil ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      }`}
    >
      {isExistLatestNotice && <ChatNotice latestNotice={latestNotice} />}
      <ChatMessagesWrapper ref={containerRef}>
        <ChatMessages data={chatMessages} usersInChannel={usersInChannel} />
        <ChatMessages data={payloadMessages} usersInChannel={usersInChannel} />
      </ChatMessagesWrapper>
      <ChatFooter id={stringId} handleOpenUtil={handleOpenUtil} />
      {isOpenUtil && <div className="fixed top-0 left-0 w-full h-full z-40" onClick={handleOpenUtil} />}
    </div>
  );
};

export default ChatDetailPage;
