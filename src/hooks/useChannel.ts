import api from '@/api/api';
import { ChannelInsertType } from '@/types/channel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = (type: 'chat' | 'video', workspace_id: number) => {
  const queryClient = useQueryClient();
  const {
    data: channelList,
    isPending,
    isError
  } = useQuery({
    queryKey: ['channel', type, workspace_id],
    queryFn: () => api.channel.getChannelList(type, workspace_id)
  });

  const { mutateAsync: createChannel } = useMutation({
    mutationFn: (channel: ChannelInsertType) => api.channel.postChannel(channel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channel'] });
    }
  });

  const { mutateAsync: delChannel } = useMutation({
    mutationFn: (id: number) => {
      return api.channel.deleteChannel(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channel'] });
    }
  });

  return { channelList, isPending, isError, createChannel, delChannel };
};

export default useChannel;
