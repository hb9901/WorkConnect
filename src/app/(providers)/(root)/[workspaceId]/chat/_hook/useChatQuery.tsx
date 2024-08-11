import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { getChannelNameOptions, getUsersInChannelOptions } from '../_utils/getQueryOptions';
import { QUERY_KEYS } from '../_constants/constants';

export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages(channel_id),
    refetchOnWindowFocus: false
  });
};

export const useGetLatestNotice = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice(Number(id)),
    refetchOnWindowFocus: false
  });
};

export const useGetUsersInChannel = (channelId: number) => {
  return useQuery(getUsersInChannelOptions(channelId));
};

export const useGetChannelName = ({ id }: { id: number }) => {
  return useQuery(getChannelNameOptions(id));
};

export const useGetChannelDocuments = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_DOCUMENTS(channelId),
    queryFn: () => api.chat.getChannelDocuments(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetChannelMedia = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_MEDIA(channelId),
    queryFn: () => api.chat.getChannelMedia(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetChannelNotices = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_NOTICES(channelId),
    queryFn: () => api.chat.getChannelNotices(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};
