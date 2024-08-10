import { useGetChannelName } from '../../_hooks/useChatQuery';
import { getChannelId } from '../../_utils/getChannelId';

export const useFetchChannelName = () => {
  const channelId = getChannelId();

  const { data, isPending } = useGetChannelName({ id: channelId });

  if (isPending) return '';

  return data ?? '';
};
