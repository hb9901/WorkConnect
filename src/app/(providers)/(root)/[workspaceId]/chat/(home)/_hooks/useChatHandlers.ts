import { GetChatMessageType } from '@/types/chat';
import { QUERY_KEYS } from '../../_constants/constants';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeSubscription';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback } from 'react';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

export const useChatHandlers = ({
  stringId,
  latestNotice,
  channelId,
  setPayloadMessages
}: {
  stringId: string;
  latestNotice: GetChatMessageType | undefined;
  channelId: string;
  setPayloadMessages: Dispatch<SetStateAction<RealtimePayloadMessagesType[]>>;
}) => {
  const queryClient = useQueryClient();

  const handleNoticeUpdates = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(stringId) });
  }, [queryClient, stringId]);

  const handleChatDelete = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) });
    setPayloadMessages([]);
  }, [queryClient, channelId, setPayloadMessages]);

  const handleUserUpdates = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) });
  }, [queryClient, channelId]);

  const handleChatInsert = useCallback(
    (newPayload: RealtimePayloadMessagesType) => {
      setPayloadMessages((prev) => [...prev, newPayload]);
    },
    [setPayloadMessages]
  );

  const handleChatUpdates = useCallback(
    (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload, old } = payload;

      const isNoticeDeleted = eventType === 'DELETE' && latestNotice?.id === old.id;
      const isNoticeUpdated = newPayload.type === 'notice';

      if (isNoticeDeleted || isNoticeUpdated) {
        handleNoticeUpdates();
      }

      switch (eventType) {
        case 'INSERT':
          handleChatInsert(newPayload);
          break;
        case 'DELETE':
          handleChatDelete();
          break;
      }
    },
    [handleNoticeUpdates, handleChatInsert, handleChatDelete, latestNotice]
  );

  return { handleChatUpdates, handleUserUpdates };
};
