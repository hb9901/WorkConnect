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
  thumbnail?: string;
};

const useCreateChannel = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutateAsync: createChannelUsers, isPending: isCreatingChannelUsers } = useMutationCreateChannelUsers();
  const { mutateAsync: createChannel, isPending: isCreatingChannel } = useMutationCreateChannel({
    workspace_id: workspaceId
  });

  const handleCreateChannelAndUsers = async ({
    channelName,
    userIds,
    type = 'chat',
    thumbnail
  }: CreateChannelAndUsersParams) => {
    if (isCreatingChannel || isCreatingChannelUsers) return;

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
