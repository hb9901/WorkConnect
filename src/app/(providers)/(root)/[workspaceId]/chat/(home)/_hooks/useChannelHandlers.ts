import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { QUERY_KEYS } from '../../_constants/constants';
import { updateChatChannels } from '../_utils/updateChatChannels';
import { GetChatChannelsResponse } from '@/types/channel';
import { ChatSubscribePayloadProps } from '@/types/chat';

type WorkspaceInfoProps = {
  workspaceId: number;
  workspaceUserId: string;
};

export const useChannelHandlers = () => {
  const queryClient = useQueryClient();

  const handleChatInserts = useCallback(({ workspaceId, workspaceUserId }: WorkspaceInfoProps) => {
    return ({ new: payload }: { new: ChatSubscribePayloadProps }) => {
      queryClient.setQueryData(
        QUERY_KEYS.CHAT_CHANNELS({ workspaceId, workspaceUserId }),
        (prev: GetChatChannelsResponse[]) => {
          return updateChatChannels(prev, payload);
        }
      );
    };
  }, []);

  const handleChannelUserUpdates = useCallback(({ workspaceId, workspaceUserId }: WorkspaceInfoProps) => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CHAT_CHANNELS({ workspaceId, workspaceUserId })
      });
    };
  }, []);

  return { handleChatInserts, handleChannelUserUpdates };
};
