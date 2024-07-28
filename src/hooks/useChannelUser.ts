import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ChannelUserProps = {
  channelId: number;
  workspaceUserIds: string[];
};

const useChannelUser = ({ workspaceUserIds, channelId }: ChannelUserProps) => {
  const queryClient = useQueryClient();
  const {
    data: channelUser,
    isPending,
    isError
  } = useQuery({
    queryKey: ['channelUser'],
    queryFn: () => api.channelUser.getChannelUserList(channelId)
  });

  const { mutateAsync: enterChannel } = useMutation({
    mutationFn: (user_id: string) =>
      api.channelUser.createChannelUsers({ channel_id: channelId, workspaceUserIds: workspaceUserIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  const { mutateAsync: leaveChannel } = useMutation({
    mutationFn: () => api.channelUser.deleteChannelUser({ channel_id: channelId, workspaceUserIds: workspaceUserIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  return { channelUser, isPending, isError, enterChannel, leaveChannel };
};

export default useChannelUser;
