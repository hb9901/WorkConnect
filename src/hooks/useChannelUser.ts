import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannelUser = (channel_id: number, workspace_user_id: string) => {
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
    mutationFn: (user_id: string) => api.channelUser.postChannelUser({ user_id, channel_id, workspace_user_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser', channel_id] });
    }
  });

  const { mutateAsync: leaveChannel } = useMutation({
    mutationFn: () => api.channelUser.deleteChannelUser(channel_id, workspace_user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser', channel_id] });
    }
  });

  return { channelUser, isPending, isError, enterChannel, leaveChannel };
};

export default useChannelUser;
