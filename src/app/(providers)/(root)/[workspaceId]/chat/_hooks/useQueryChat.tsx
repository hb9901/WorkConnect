import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import type { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import { getChannelNameOptions, getUsersInChannelOptions } from '../_utils/getQueryOptions';

export const useGetChannels = (workspaceId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNELS({ workspaceId }),
    queryFn: api.channel.getChannels,
    refetchOnWindowFocus: false
  });
};

export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages(channel_id),
    refetchOnWindowFocus: false
  });
};

export const useGetSearchWorkspaceUsers = ({ workspace_id, term }: GetSearchWorkspaceUsersProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_WORKSPACE_USERS(workspace_id, term),
    queryFn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term }),
    refetchOnWindowFocus: false
  });
};

export const useGetLatestNotice = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice(id),
    refetchOnWindowFocus: false
  });
};

export const useGetUsersInChannel = (channelId: number) => {
  return useQuery(getUsersInChannelOptions(channelId));
};

export const useGetChannelName = ({ id }: { id: number }) => {
  return useQuery(getChannelNameOptions(id));
};
