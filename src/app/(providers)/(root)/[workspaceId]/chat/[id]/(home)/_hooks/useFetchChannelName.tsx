import { getChannelId } from '@/utils/getChannelId';
import { useGetChannelName } from '../../../_hook/useChatQuery';

export const useFetchChannelName = () => {
  const channelId = getChannelId();

  const { data, isPending } = useGetChannelName({ id: channelId });

  if (isPending) return '';

  return data ?? '';
};
