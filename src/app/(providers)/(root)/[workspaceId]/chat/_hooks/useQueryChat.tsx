import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import type { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import type { GetChatChannelsProps, GetUsersInChannelRequestProps } from '@/types/channel';

export const useGetChatChannels = ({ workspace_id, workspace_user_id }: GetChatChannelsProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_CHANNELS(workspace_id, workspace_user_id),
    queryFn: () => api.channel.getChatChannels({ workspace_id, workspace_user_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages({ channel_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetSearchWorkspaceUsers = ({ workspace_id, term, workspace_user_id }: GetSearchWorkspaceUsersProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_WORKSPACE_USERS(workspace_id, term),
    queryFn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term, workspace_user_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetUsersInChannel = ({ channel_id, workspace_user_id }: GetUsersInChannelRequestProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS_IN_CHANNEL(channel_id),
    queryFn: () => api.channel.getUsersInChannel({ channel_id, workspace_user_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetChannelName = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_NAME(id),
    queryFn: () => api.chat.getChannelName({ id }),
    refetchOnWindowFocus: false
  });
};

export const useGetLatestNotice = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice({ id }),
    refetchOnWindowFocus: false
  });
};
