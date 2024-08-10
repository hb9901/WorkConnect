'use client';

import { useEffect, useMemo } from 'react';
import { useGetChannels } from '../_hooks/useQueryChat';
import ChannelItem from './_components/ChannelItem';
import { handleSubscribeToChannels } from '../_utils/subscribe';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { isEmpty } from '@/utils/isEmpty';
import { useChannelHandlers } from './_hooks/useChannelHandlers';
import { CHANNEL_TYPE } from '@/constants/channel';

const ChatListPage = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const { handleChatInserts, handleChannelUserUpdates } = useChannelHandlers();

  const { data: channels = [] } = useGetChannels(workspaceId);

  const channelIds = useMemo(() => {
    return channels.map((channel) => channel.channel_id).join(',');
  }, [channels]);

  useEffect(() => {
    if (isEmpty(channelIds)) return;

    handleSubscribeToChannels({
      channelIds,
      workspaceUserId,
      handleChatInserts: handleChatInserts({ workspaceId }),
      handleChannelUserUpdates: handleChannelUserUpdates({ workspaceId })
    });
  }, [channelIds]);

  if (isEmpty(channels)) return null;

  return (
    <ul>
      {channels.map((item) => {
        const href =
          item.type === CHANNEL_TYPE.chat
            ? `/${workspaceId}/chat/${item.channel_id}`
            : `/${workspaceId}/video-channel/${item.channel_name}`;

        return (
          <ChannelItem
            {...item}
            href={href}
            key={item.channel_id}
            name={item.user_name ?? item.channel_name}
            user_count={item.is_dm ? undefined : item.user_count}
            user_thumbnail={item.user_thumbnail ?? undefined}
          />
        );
      })}
    </ul>
  );
};

export default ChatListPage;
