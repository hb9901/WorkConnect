'use client';

import { useRouter } from 'next/navigation';
import { useMutationCreateChannel, useMutationCreateChannelUsers } from '../../_hooks/useMutationChat';
import { ChannelType } from '@/types/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { CHANNEL_TYPE } from '@/constants/channel';
import { useState } from 'react';

type CreateChannelAndUsersParams = {
  channelName?: string;
  userIds: string[];
  type?: ChannelType['type'];
  thumbnail?: string;
};

const useCreateChannel = () => {
  const workspaceId = useWorkspaceId();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: createChannelUsers } = useMutationCreateChannelUsers();
  const { mutateAsync: createChannel } = useMutationCreateChannel({
    workspace_id: workspaceId
  });

  const handleCreateChannelAndUsers = async ({
    channelName,
    userIds,
    type = 'chat',
    thumbnail
  }: CreateChannelAndUsersParams) => {
    setIsLoading(true);
    if (isLoading) return;

    const { id: channelId } = await createChannel({ name: channelName || '', type, thumbnail });
    await createChannelUsers({ channel_id: channelId, workspaceUserIds: userIds });

    if (type === CHANNEL_TYPE.chat) {
      router.push(`/${workspaceId}/chat/${channelId}`);
      return;
    }

    router.push(`/${workspaceId}/video-channel/${channelName}`);
  };

  return { handleCreateChannelAndUsers };
};

export default useCreateChannel;
