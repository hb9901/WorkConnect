'use client';

import { useEffect } from 'react';
import useGetParamsChannelId from '../../../../_hook/useGetParamsChannelId';
import { useMutationUpdateChannelActiveAt } from '../../../../_hook/useChatMutation';

const UpdateChannelReadAt = () => {
  const channelId = useGetParamsChannelId();

  const { mutate: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();

  useEffect(() => {
    if (!channelId) return;

    updateChannelActiveAt(channelId);
  }, [channelId]);

  return null;
};

export default UpdateChannelReadAt;
