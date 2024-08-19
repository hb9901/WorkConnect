import { GetChatMessageType } from '@/types/chat';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeChannel';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { QUERY_KEYS } from '../../../_constants/constants';
import { useMutationUpdateChannelActiveAt } from '../../../_hook/useChatMutation';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

type HandleNoticeUpdatesProps = { latestNoticeId: number | undefined; channelId: number };

type HandleChatUpdatesProps = {
  channelId: number;
};

export const useChatHandlers = () => {
  const queryClient = useQueryClient();
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);
  const { mutateAsync: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();

  const handleMessagesUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    return async (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload } = payload;

      switch (eventType) {
        case 'INSERT':
          setPayloadMessages((prev) => [...prev, newPayload]);
          await updateChannelActiveAt(channelId);
          await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) });
          break;
        case 'DELETE':
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) });
          setPayloadMessages([]);
          break;
      }
    };
  }, []);

  const handleNoticeUpdates = useCallback(({ latestNoticeId, channelId }: HandleNoticeUpdatesProps) => {
    return (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload, old } = payload;

      const isNoticeDeleted = eventType === 'DELETE' && latestNoticeId === old.id;
      const isNoticeUpdated = newPayload.type === 'notice';

      if (isNoticeDeleted || isNoticeUpdated) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(channelId) });
      }
    };
  }, []);

  const handleUserInfoUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    return () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) });
    };
  }, []);

  return {
    handleNoticeUpdates,
    handleMessagesUpdates,
    payloadMessages,
    handleUserInfoUpdates
  };
};
