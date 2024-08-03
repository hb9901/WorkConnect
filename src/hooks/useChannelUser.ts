import api from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ChannelUserProps = {
  channelId?: number;
  workspaceUserIds?: string[];
};

const useChannelUser = ({ workspaceUserIds, channelId }: ChannelUserProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: enterChannel } = useMutation({
    mutationFn: (enteredChannelId: number) =>
      api.channelUser.createChannelUsers({ channel_id: enteredChannelId!, workspaceUserIds: workspaceUserIds! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  const { mutateAsync: leaveChannel } = useMutation({
    mutationFn: (workspaceUserId: string) =>
      api.channelUser.deleteChannelUser({ workspace_user_id: workspaceUserId, channel_id: channelId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelUser'] });
    }
  });

  return { enterChannel, leaveChannel };
};

export default useChannelUser;
