'use client';

import { useRouter } from 'next/navigation';
import { useMutationCreateChannel, useMutationCreateChannelUsers } from '../../_hooks/useMutationChat';
import { ChannelType } from '@/types/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { CHANNEL_TYPE } from '@/constants/channel';

type CreateChannelAndUsersParams = {
  channelName?: string;
  userIds: string[];
  type?: ChannelType['type'];
};

const useCreateChannel = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutateAsync: createChannelUsers } = useMutationCreateChannelUsers();
  const { mutateAsync: createChannel } = useMutationCreateChannel({ workspace_id: workspaceId });

  const handleCreateChannelAndUsers = async ({ channelName, userIds, type = 'chat' }: CreateChannelAndUsersParams) => {
    const { id: channelId } = await createChannel({ name: channelName || '', type });
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
