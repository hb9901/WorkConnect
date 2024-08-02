'use client';

import { useState } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import { useGetSearchWorkspaceUsers } from '../../_hooks/useQueryChat';
import SelectedUsers from '../_components/SelectedUsers';
import SearchResults from '../_components/SearchResults';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

const AddChatPage = () => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const [searchTerm, setSearchTerm] = useState('');
  const { selectedUsers } = useSearchUsers();

  const { data: searchUsers = [], refetch: refetchSearchUsers } = useGetSearchWorkspaceUsers({
    workspace_id: workspaceId,
    term: searchTerm,
    workspace_user_id: workspaceUserId
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
