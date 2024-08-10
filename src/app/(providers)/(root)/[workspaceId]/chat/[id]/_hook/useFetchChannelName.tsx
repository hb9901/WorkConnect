import { useGetChannelName } from '../../_hooks/useQueryChat';
import { getChannelId } from '../../_utils/getChannelId';

export const useFetchChannelName = () => {
  const channelId = getChannelId();

  const { data: groupChannelName, isPending: isPendingGroupChannelName } = useGetChannelName({ id: channelId });

  if (isPendingGroupChannelName) return '';

  return groupChannelName ?? '';
};
