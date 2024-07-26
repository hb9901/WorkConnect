import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = (channel_id: number, workspace_user_id?: string) => {
  const queryClient = useQueryClient();
  const {
    data: channelUser,
    isPending,
    isError
  } = useQuery({
    queryKey: ['channelUser', channel_id],
    queryFn: () => api.channelUser.getChannelUserList(channel_id)
  });

  const { mutateAsync: enterChannel } = useMutation({
    mutationFn: (row: Tables<'channel_user'>) => api.channelUser.postChannelUser(row),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser', channel_id] });
    }
  });

  const { mutateAsync: leaveChannel } = useMutation({
    mutationFn: (row: Tables<'channel_user'>) => api.channelUser.deleteChannelUser(channel_id, workspace_user_id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser', channel_id] });
    }
  });

  return { channelUser, isPending, isError, enterChannel, leaveChannel };
};
