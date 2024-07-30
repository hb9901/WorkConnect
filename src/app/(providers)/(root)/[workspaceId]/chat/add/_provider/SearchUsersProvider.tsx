'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import type { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { createContext, useContext, useState } from 'react';

//TODO
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

type SearchUsersContextType = {
  selectedUsers: SearchWorkspaceUserType[];
  handleSelectUser: (user: SearchWorkspaceUserType) => void;
  handleRemoveUser: (user: SearchWorkspaceUserType) => void;
  getSelectedUserIds: () => string[];
};

const initialState = {
  selectedUsers: [],
  handleSelectUser: () => {},
  handleRemoveUser: () => {},
  getSelectedUserIds: () => []
};

const SearchUsersContext = createContext<SearchUsersContextType>(initialState);

export const SearchUsersProvider = ({ children }: StrictPropsWithChildren) => {
  const [selectedUsers, setSelectedUsers] = useState<SearchUsersContextType['selectedUsers']>([]);

  const handleSelectUser: SearchUsersContextType['handleSelectUser'] = (user) => {
    if (selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
      handleRemoveUser(user);
      return;
    }

    setSelectedUsers((prev) => [...prev, user]);
  };
  const handleRemoveUser: SearchUsersContextType['handleRemoveUser'] = (user) => {
    setSelectedUsers((prev) => prev.filter((selectedUser) => selectedUser.id !== user.id));
  };

  const getSelectedUserIds: SearchUsersContextType['getSelectedUserIds'] = () => {
    return selectedUsers.map((user) => user.id).concat([WORKSPACE_USER_ID]);
  };

  return (
    <SearchUsersContext.Provider
      value={{
        selectedUsers,
        handleSelectUser,
        handleRemoveUser,
        getSelectedUserIds
      }}
    >
      {children}
    </SearchUsersContext.Provider>
  );
};

export const useSearchUsers = () => useContext(SearchUsersContext);

export default SearchUsersContext;
