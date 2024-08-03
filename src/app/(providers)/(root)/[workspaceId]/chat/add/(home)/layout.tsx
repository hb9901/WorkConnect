'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import { PageLayout } from '@/components/PageLayout';
import { CheckIcon, XIcon } from '@/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import useCreateChannel from '../_hooks/useCreateChannel';
import { CHANNEL_TYPE } from '@/constants/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { getExistingChannelId } from '../_utils/getExistingChannelId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { isEmpty } from '@/utils/isEmpty';

const AddChatHomeLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();
  const router = useRouter();

  const handleAddChat = async () => {
    const userIds = getSelectedUserIds();
    if (isEmpty(userIds)) return;

    if (userIds.length > 2 || type === CHANNEL_TYPE.video) {
      router.push(`/${workspaceId}/chat/add/group-setting?type=${type}`);
      return;
    }
    const existingChannelId = await getExistingChannelId({
      workspace_user_id: workspaceUserId,
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/${workspaceId}/chat/${existingChannelId}`);
      return;
    }

    handleCreateChannelAndUsers({ userIds });
  };

  return (
    <PageLayout
      title="대화상대 선택"
      showBottomBar={false}
      TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}
      TopBarRightIcon1={
        <button onClick={handleAddChat}>
          <CheckIcon />
        </button>
      }
    >
      {children}
    </PageLayout>
  );
};

export default AddChatHomeLayout;
