import { useGetChannelName } from '../../../_hook/useChatQuery';
import useGetParamsChannelId from '../../../_hook/useGetParamsChannelId';

export const useFetchChannelName = () => {
  const channelId = useGetParamsChannelId();

  const { data, isPending } = useGetChannelName({ id: channelId });

  if (isPending) return '';

  return data ?? '';
};
