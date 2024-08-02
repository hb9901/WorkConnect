'use client';

import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import type { StrictPropsWithChildren } from '@/types/common';
import type { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { createContext, useCallback, useContext, useState } from 'react';

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
  const workspaceUserId = useWorkspaceUserId();
  const [selectedUsers, setSelectedUsers] = useState<SearchUsersContextType['selectedUsers']>([]);

  const handleSelectUser: SearchUsersContextType['handleSelectUser'] = useCallback(
    (user) => {
      if (selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
        handleRemoveUser(user);
        return;
      }

      setSelectedUsers((prev) => [...prev, user]);
    },
    [selectedUsers]
  );

  const handleRemoveUser: SearchUsersContextType['handleRemoveUser'] = (user) => {
    setSelectedUsers((prev) => prev.filter((selectedUser) => selectedUser.id !== user.id));
  };

  const getSelectedUserIds: SearchUsersContextType['getSelectedUserIds'] = useCallback(() => {
    return selectedUsers.map((user) => user.id).concat([workspaceUserId]);
  }, [selectedUsers, workspaceUserId]);

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
