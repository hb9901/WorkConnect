'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import Search from '../_components/Search';
import { useSearchParams } from 'next/navigation';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useRouter } from 'next/navigation';
import { isEmpty } from '@/utils/isEmpty';
import { CHANNEL_TYPE } from '@/constants/channel';
import { fetchExistingChannelId } from '../_utils/fetchExistingChannelId';
import AddChannelLayout from '../_components/AddChannelLayout';

const AddChatPage = () => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userIds = getSelectedUserIds();
    if (isEmpty(userIds)) return;

    const isGroupChat = userIds.length > 2 || type === CHANNEL_TYPE.video;

    if (isGroupChat) {
      router.push(`/${workspaceId}/channels/add/group-setting?type=${type}`);
      return;
    }
    const existingChannelId = await fetchExistingChannelId({
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/${workspaceId}/channels/${existingChannelId}`);
      return;
    }

    handleCreateChannelAndUsers({ userIds });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddChannelLayout title="대화상대 선택">
        <Search />
      </AddChannelLayout>
    </form>
  );
};

export default AddChatPage;
