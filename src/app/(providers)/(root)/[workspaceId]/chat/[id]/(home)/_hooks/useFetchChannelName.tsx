import { useGetChannelName } from '../../../_hook/useChatQuery';
import useGetChannelId from '../../../_hook/useGetChannelId';

export const useFetchChannelName = () => {
  const channelId = useGetChannelId();

  const { data, isPending } = useGetChannelName({ id: channelId });

  if (isPending) return '';

  return data ?? '';
};
