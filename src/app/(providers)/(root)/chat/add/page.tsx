'use client';

import { useState } from 'react';
import TestHeader from '../_components/TestHeader';
import { useRouter } from 'next/navigation';
import { useGetSearchWorkspaceUsers } from '../_hooks/useQueryChat';
import { useSearchUsers } from './_provider/SearchUsersProvider';
import useCreateChannel from './_hooks/useCreateChannel';
import SearchResults from './_components/SearchResults';
import SelectedUsers from './_components/SelectedUsers';
import { getExistingChannelId } from './_utils/getExistingChannelId';

//TODO: 임시 코드
const WORKSPACE_ID = 2;
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const AddChatPage = ({ params }: { params: { id: string } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { selectedUsers, getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();

  const { data: searchUsers = [], refetch: refetchSearchUsers } = useGetSearchWorkspaceUsers({
    workspace_id: WORKSPACE_ID,
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

    if (userIds.length > 2) {
      router.push('/chat/add/group-setting');
      return;
    }
    // TODO: 이거 복수여도 되는건데 ㅡㅡ 아 왜 아니ㅗ러아니러;ㅇ나러 왜 안돼 외ㅏㄹㅇ널; 1:1만 하고 싶다고 ㅡㅡ 판단..
    const existingChannelId = await getExistingChannelId({
      workspace_user_id: WORKSPACE_USER_ID,
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/chat/${existingChannelId}`);
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
