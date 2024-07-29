import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ChannelUserProps = {
  channelId?: number;
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
    queryFn: () => api.channelUser.getChannelUserList(channelId!)
  });

  const { mutateAsync: enterChannel } = useMutation({
    mutationFn: (enteredChannelId: number) =>
      api.channelUser.createChannelUsers({ channel_id: enteredChannelId!, workspaceUserIds: workspaceUserIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  const { mutateAsync: leaveChannel } = useMutation({
    mutationFn: (leftChannelId: number) =>
      api.channelUser.deleteChannelUser({ channel_id: leftChannelId!, workspaceUserIds: workspaceUserIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  return { channelUser, isPending, isError, enterChannel, leaveChannel };
};

export default useChannelUser;
