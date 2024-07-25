import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = (type: 'chat' | 'video') => {
  const queryClient = useQueryClient();

  const {
    data: channelList,
    isPending,
    isError
  } = useQuery({
    queryKey: ['channel'],
    queryFn: () => api.channel.getChannelList(type)
  });

  const { mutateAsync: addChannel } = useMutation({
    mutationFn: (channel: Tables<'channel'>) => {
      return api.channel.postChannel(channel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channel'] });
    }
  });

  const { mutateAsync: delChannel } = useMutation({
    mutationFn: (channel: Tables<'channel'>) => {
      return api.channel.deleteChannel(channel.name as string, channel.type as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channel'] });
    }
  });

  return { channelList, isPending, isError, addChannel, delChannel };
};

export default useChannel;
