import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';

export const getChannelNameOptions = (id: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.CHANNEL_NAME(id),
    queryFn: () => api.channel.getChannelName(id),
    refetchOnWindowFocus: false
  });
};

export const getUsersInChannelOptions = (channelId: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.USERS_IN_CHANNEL(channelId),
    queryFn: () => api.channel.getUsersInChannel(channelId),
    refetchOnWindowFocus: false
  });
};
