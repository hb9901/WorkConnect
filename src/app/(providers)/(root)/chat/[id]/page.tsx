'use client';

import { useEffect, useRef, useState } from 'react';
import { subscribeToChat } from '../_utils/subscribe';
import { useGetChatMessages, useGetUsersInChannel } from '../_hooks/useQueryChat';
import TestHeader from '../_components/TestHeader';
import ChatMessages from './_components/ChatMessages';
import ChatFooter from './_components/ChatFooter';
import ChatMessagesWrapper from './_components/ChatMessagesWrapper';
import type { GetChatMessageType } from '@/types/chat';

// TODO: 데이터 추가 시 수정 필요
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

const ChatDetailPage = ({ params }: { params: { id: string } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);

  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(params.id)
  });
  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(params.id),
    workspace_user_id: WORKSPACE_USER_ID
  });

  const isPending = isPendingChatMessages || isPendingUsersInChannel;

  const handleInserts = (payload: { new: RealtimePayloadMessagesType }) => {
    setPayloadMessages((prev) => [...prev, payload.new]);
  };

  //TODO 유저 정보 바뀌면~ 감지하자...
  //QUERY_KEYS.USERS_IN_CHANNEL(channel_id, workspace_user_id)
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(subscribeToChat({ handleInserts, id: params.id }), []);

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="h-dvh flex flex-col">
      <TestHeader title="채팅 상세" />
      <ChatMessagesWrapper ref={containerRef}>
        <ChatMessages data={chatMessages} usersInChannel={usersInChannel} />
        <ChatMessages data={payloadMessages} usersInChannel={usersInChannel} />
      </ChatMessagesWrapper>
      <ChatFooter id={params.id} />
    </div>
  );
};

export default ChatDetailPage;
