'use client';

import { useEffect, useState } from 'react';
import TestHeader from '../_components/TestHeader';
import { useRouter } from 'next/navigation';
import { useGetExistingChannelId, useGetSearchWorkspaceUsers } from '../_hooks/useQueryChat';
import { useSearchUsers } from './_provider/SearchUsersProvider';
import useCreateChannel from './_hooks/useCreateChannel';
import SearchResults from './_components/SearchResults';
import SelectedUsers from './_components/SelectedUsers';
import api from '@/api';

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

  // TODO: 왜 안되나요 ㅋㅋㅋㅋㅋㅋㅋ
  // const { data: existingChannelId, refetch: refetchExistingChannelId } = useGetExistingChannelId({
  //   workspace_user_id: WORKSPACE_USER_ID,
  //   other_workspace_user_id: selectedUsers[0]?.id
  // });

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

    //refetchExistingChannelId();

    // TODO: 데이터가 안 오는게 말이 안됨..
    // TODO: 한박자 느림 refetch 하니까 한박자 느려서 정확히 안됨 ㅠㅠㅠㅠㅠ
    //console.log('@@', existingChannelId);

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
