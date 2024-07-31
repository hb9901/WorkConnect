'use client';

import { useState } from 'react';
import TestHeader from '../_components/TestHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetSearchWorkspaceUsers } from '../_hooks/useQueryChat';
import { useSearchUsers } from './_provider/SearchUsersProvider';
import useCreateChannel from './_hooks/useCreateChannel';
import SearchResults from './_components/SearchResults';
import SelectedUsers from './_components/SelectedUsers';
import { getExistingChannelId } from './_utils/getExistingChannelId';
import { CHANNEL_TYPE } from '@/constants/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';

//TODO: 임시 코드
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const AddChatPage = () => {
  const searchParams = useSearchParams();
  const workspaceId = useWorkspaceId();
  const type = searchParams.get('type');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { selectedUsers, getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();

  const { data: searchUsers = [], refetch: refetchSearchUsers } = useGetSearchWorkspaceUsers({
    workspace_id: workspaceId,
    term: searchTerm,
    workspace_user_id: WORKSPACE_USER_ID
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    refetchSearchUsers();
  };

  const handleAddChat = async () => {
    const userIds = getSelectedUserIds();
    if (userIds.length === 0) return;

    if (userIds.length > 2 || type === CHANNEL_TYPE.video) {
      router.push(`/${workspaceId}/chat/add/group-setting?type=${type}`);
      return;
    }
    const existingChannelId = await getExistingChannelId({
      workspace_user_id: WORKSPACE_USER_ID,
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/${workspaceId}/chat/${existingChannelId}`);
      return;
    }

    handleCreateChannelAndUsers({ userIds });
  };

  return (
    <>
      <TestHeader title="채팅 추가" rightButton={<button onClick={handleAddChat}>추가</button>} />
      <div className="p-4">
        <SelectedUsers users={selectedUsers} />
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded p-2 mb-4 w-full"
        />
        <SearchResults users={searchUsers} />
      </div>
    </>
  );
};

export default AddChatPage;
