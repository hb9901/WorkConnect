'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useGetChatChannels } from '../_hooks/useQueryChat';
import ChannelItem from './_components/ChannelItem';
import TestHeader from '../_components/TestHeader';
import { QUERY_KEYS } from '../_constants/constants';
import { ChannelListContainer } from './_components/ChannelList';
import { updateChatChannels } from './_utils/updateChatChannels';
import { subscribeToChannels } from '../_utils/subscribe';
import type { GetChatChannelsResponse } from '@/types/channel';
import type { ChatSubscribePayloadProps } from '@/types/chat';

// TODO: 데이터 추가 시 수정 필요
const WORKSPACE_ID = 2;
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const ChatListPage = () => {
  const queryClient = useQueryClient();
  const { data: channels = [] } = useGetChatChannels({
    workspace_id: WORKSPACE_ID,
    workspace_user_id: WORKSPACE_USER_ID
  });

  const handleChatInserts = ({ new: payload }: { new: ChatSubscribePayloadProps }) => {
    queryClient.setQueryData(QUERY_KEYS.CHAT_CHANNELS, (prev: GetChatChannelsResponse[]) => {
      return updateChatChannels(prev, payload);
    });
  };

  const handleChannelUserInserts = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_CHANNELS });
  };

  const channelIds = useMemo(() => {
    return channels.map((channel) => channel.channel_id).join(',');
  }, [channels]);

  useEffect(
    subscribeToChannels({
      handleChatInserts,
      channelIds,
      workspace_user_id: WORKSPACE_USER_ID,
      handleChannelUserInserts
    }),
    [channelIds]
  );

  if (!channels || channels.length === 0) {
    return <div>채팅 리스트가 없습니다.</div>;
  }

  return (
    <>
      <TestHeader title="채팅 리스트" rightButton={<Link href="/chat/add">생성</Link>} />
      <div className="p-4" />
      <ChannelListContainer>
        {channels.map((item) => (
          <ChannelItem key={item.channel_id} {...item} />
        ))}
      </ChannelListContainer>
    </>
  );
};

export default ChatListPage;
