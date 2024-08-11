'use client';

import { useEffect } from 'react';
import useGetChannelId from '../../../../_hook/useGetChannelId';
import { useMutationUpdateChannelActiveAt } from '../../../../_hook/useChatMutation';

const UpdateChannelReadAt = () => {
  const channelId = useGetChannelId();

  const { mutate: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();

  useEffect(() => {
    updateChannelActiveAt(channelId);
  }, [channelId]);

  return null;
};

export default UpdateChannelReadAt;
