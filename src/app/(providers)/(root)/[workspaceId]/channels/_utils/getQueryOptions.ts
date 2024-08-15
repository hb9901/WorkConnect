import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';

export const getChannelsOptions = (workspaceId: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.CHANNELS(workspaceId),
    queryFn: api.channel.getChannels,
    refetchOnWindowFocus: false
  });
};

export const getChannelIdOptions = (workspaceId: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.CHANNEL_ID(workspaceId),
    queryFn: api.channel.getChannelId,
    refetchOnWindowFocus: false
  });
};
