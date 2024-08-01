'use client';

import { useState } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import { useGetSearchWorkspaceUsers } from '../../_hooks/useQueryChat';
import SelectedUsers from '../_components/SelectedUsers';
import SearchResults from '../_components/SearchResults';

//TODO: 임시 코드
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const AddChatPage = () => {
  const workspaceId = useWorkspaceId();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedUsers } = useSearchUsers();

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

  return (
    <>
      <div className="mx-4">
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-3 mb-2 w-full bg-grey50 h-[45px]"
        />
      </div>
      <SelectedUsers users={selectedUsers} />
      <SearchResults searchUsers={searchUsers} selectedUsers={selectedUsers} />
    </>
  );
};

export default AddChatPage;
