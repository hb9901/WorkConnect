'use client';

import { useRouter } from 'next/navigation';
import { useMutationCreateChannel, useMutationCreateChannelUsers } from '../../_hooks/useMutationChat';

//TODO: 임시 코드
const WORKSPACE_ID = 2;

type CreateChannelAndUsersParams = { channelName?: string; userIds: string[] };

const useCreateChannel = () => {
  const router = useRouter();
  const { mutateAsync: createChannelUsers } = useMutationCreateChannelUsers();
  const { mutateAsync: createChannel } = useMutationCreateChannel({ workspace_id: WORKSPACE_ID });

  const handleCreateChannelAndUsers = async ({ channelName, userIds }: CreateChannelAndUsersParams) => {
    const { id: channelId } = await createChannel({ name: channelName || '', type: 'chat' });
    await createChannelUsers({ channel_id: channelId, workspaceUserIds: userIds });
    router.push(`/chat/${channelId}`);
  };

  return { handleCreateChannelAndUsers };
};

export default useCreateChannel;
