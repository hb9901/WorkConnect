import api from '@/api/api';
import { ChannelInsertType, ChannelType } from '@/types/channel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = ({ type, workspace_id }: Pick<ChannelType, 'type' | 'workspace_id'>) => {
  const queryClient = useQueryClient();
  const {
    data: channelList,
    isPending,
    isError
  } = useQuery<ChannelType[]>({
    queryKey: ['channel'],
    queryFn: () => api.channel.getChannelList({ type, workspace_id })
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
