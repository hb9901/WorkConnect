'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetChatMessageType } from '@/types/chat';
import { useParams } from 'next/navigation';
import { useGetChatMessages, useGetUsersInChannel } from '../../_hooks/useQueryChat';
import { QUERY_KEYS } from '../../_constants/constants';
import { subscribeToChat } from '../../_utils/subscribe';
import ChatMessagesWrapper from '../_components/ChatMessagesWrapper';
import ChatMessages from '../_components/ChatMessages';
import ChatFooter from '../_components/ChatFooter';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeSubscription';

// TODO: 데이터 추가 시 수정 필요
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

const ChatDetailPage = () => {
  const { id: channelId }: { id: string; workspaceId: string } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);
  const [isOpenUtil, setIsOpenUtil] = useState(false);
  const queryClient = useQueryClient();

  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(channelId),
    workspace_user_id: WORKSPACE_USER_ID
  });

  const isPending = isPendingChatMessages || isPendingUsersInChannel;

  // TODO: 나의 삭제만 처리해야하나? 근데 위치에 고정시키면 굳이 다른 사람의 삭제 또한 막을 필요가 없을듯..
  // TODO: 그런 관점에서 useState를 굳이 유지할 필요가 있낭? 근데... 필요하긴 한데 왜냐면 db 호출 계속 하는거 아니니까 ㅠㅠ
  const handleChatUpdates = (payload: RealtimeChatPayloadType) => {
    if (payload.eventType === 'INSERT') {
      setPayloadMessages((prev) => [...prev, payload.new]);
      return;
    }

    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) });
    setPayloadMessages([]);
  };

  const handleUserUpdates = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL });
  };

  const handleOpenUtil = () => {
    setIsOpenUtil((prev) => !prev);
  };

  const userIds = useMemo(() => {
    return Object.keys(usersInChannel).join(',');
  }, [usersInChannel]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(subscribeToChat({ handleUserUpdates, handleChatUpdates, id: channelId, userIds }), [userIds]);

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col flex-grow h-[calc(100dvh+35px)] transform ease-in-out duration-300 ${
          isOpenUtil ? 'translate-y-[-96px]' : 'translate-y-[0px]'
        }`}
      >
        <ChatMessagesWrapper ref={containerRef}>
          <ChatMessages data={chatMessages} usersInChannel={usersInChannel} />
          <ChatMessages data={payloadMessages} usersInChannel={usersInChannel} />
        </ChatMessagesWrapper>
        <ChatFooter id={channelId} handleOpenUtil={handleOpenUtil} />
        {isOpenUtil && <div className="fixed top-0 left-0 w-full h-full z-40" onClick={handleOpenUtil} />}
      </div>
    </div>
  );
};

export default ChatDetailPage;
