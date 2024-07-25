import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useChannel = (type: 'chat' | 'video', workspace_id: number) => {
  const queryClient = useQueryClient();

  const {
    data: channelList,
    isPending,
    isError
  } = useQuery({
    queryKey: ['channel'],
    queryFn: () => api.channel.getChannelList(type, workspace_id)
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
      return api.channel.deleteChannel(channel.id as number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channel'] });
    }
  });

  return { channelList, isPending, isError, addChannel, delChannel };
};

export default useChannel;
