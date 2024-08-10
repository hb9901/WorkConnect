import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';

export const getChannelName = (id: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.CHANNEL_NAME(id),
    queryFn: () => api.chat.getChannelName({ id }),
    refetchOnWindowFocus: false
  });
};

export const getLatestNotice = (id: string) => {
  return queryOptions({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice({ id }),
    refetchOnWindowFocus: false
  });
};

export const getUsersInChannel = (channelId: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.USERS_IN_CHANNEL(channelId),
    queryFn: () => api.channel.getUsersInChannel(channelId),
    refetchOnWindowFocus: false
  });
};
