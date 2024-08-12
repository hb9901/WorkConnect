import api from '@/api/api';
import { ChannelInsertType, ChannelType } from '@/types/channel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = () => {
  const queryClient = useQueryClient();

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

  return { createChannel, delChannel };
};

export default useChannel;
