import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { updateChatChannels } from '../_utils/updateChatChannels';
import { ChatSubscribePayloadProps } from '@/types/chat';
import { GetChannelsResponse } from '@/types/channel';
import { QUERY_KEYS } from '../../_constants/constants';

type WorkspaceInfoProps = {
  workspaceId: number;
};

export const useChannelHandlers = () => {
  const queryClient = useQueryClient();

  const handleChatInserts = useCallback(({ workspaceId }: WorkspaceInfoProps) => {
    return ({ new: payload }: { new: ChatSubscribePayloadProps }) => {
      queryClient.setQueryData(QUERY_KEYS.CHANNELS(workspaceId), (prev: GetChannelsResponse[]) => {
        return updateChatChannels(prev, payload);
      });
    };
  }, []);

  const handleChannelUserUpdates = useCallback(({ workspaceId }: WorkspaceInfoProps) => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CHANNELS(workspaceId)
      });
    };
  }, []);

  return { handleChatInserts, handleChannelUserUpdates };
};
