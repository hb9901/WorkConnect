'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import useCreateChannel from '../_hooks/useCreateChannel';
import { CHANNEL_TYPE } from '@/constants/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { getExistingChannelId } from '../_utils/getExistingChannelId';
import { isEmpty } from '@/utils/isEmpty';
import AddChatLayout from '../_components/AddChatLayout';

const AddChatHomeLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();
  const router = useRouter();

  const handleSubmit = async () => {
    const userIds = getSelectedUserIds();
    if (isEmpty(userIds)) return;
    const isGroupChat = userIds.length > 2 || type === CHANNEL_TYPE.video;

    if (isGroupChat) {
      router.push(`/${workspaceId}/channel/add/group-setting?type=${type}`);
      return;
    }
    const existingChannelId = await getExistingChannelId({
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/${workspaceId}/chat/${existingChannelId}`);
      return;
    }

    handleCreateChannelAndUsers({ userIds });
  };

  return (
    <AddChatLayout title="대화상대 선택" onSubmit={handleSubmit}>
      {children}
    </AddChatLayout>
  );
};

export default AddChatHomeLayout;
