import { GetChatMessageType } from '@/types/chat';
import { QUERY_KEYS } from '../../_constants/constants';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeSubscription';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

type HandleNoticeUpdatesProps = { latestNoticeId: number; channelId: string };

type HandleChatUpdatesProps = {
  channelId: string;
};

export const useChatHandlers = () => {
  const queryClient = useQueryClient();
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);

  const handleChatUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload } = payload;

      switch (eventType) {
        case 'INSERT':
          setPayloadMessages((prev) => [...prev, newPayload]);
          break;
        case 'DELETE':
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) });
          setPayloadMessages([]);
          break;
      }
    };
  }, []);

  const handleNoticeUpdates = useCallback(({ latestNoticeId, channelId }: HandleNoticeUpdatesProps) => {
    (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload, old } = payload;

      const isNoticeDeleted = eventType === 'DELETE' && latestNoticeId === old.id;
      const isNoticeUpdated = newPayload.type === 'notice';

      if (isNoticeDeleted || isNoticeUpdated) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(channelId) });
      }
    };
  }, []);

  const handleUserUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) });
    };
  }, []);

  return { handleNoticeUpdates, handleChatUpdates, payloadMessages, handleUserUpdates };
};
