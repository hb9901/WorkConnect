'use client';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import { Tables } from '@/types/supabase';
import { useState } from 'react';

const FAKE_WORKSPACE_ID = 2;
const CreateChannelPage = () => {
  const { workspaceUserList } = useWorkspaceUserList(FAKE_WORKSPACE_ID);
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);

  const handleSelectUser = (user_id: string) => {
    setSelectedUserList((prev) => [...selectedUserList!, user_id]);
  };

  // [utils]
  const makeRoomName = () => {
    return selectedUserList.join(',');
  };

  return (
    <div>
      <div className="flex gap-5 p-5">
        <p>{makeRoomName()}</p>
        <button className="border hover:brightness-90">확인</button>
      </div>
      {workspaceUserList &&
        workspaceUserList.map((wokespaceUser) => (
          <div key={wokespaceUser.id} onClick={() => handleSelectUser(wokespaceUser.name as string)}>
            <UserItem {...wokespaceUser} />
          </div>
        ))}
    </div>
  );
};

export default CreateChannelPage;

type UserItemProps = Tables<'workspace_user'>;

const UserItem = ({ ...wokespaceUser }: UserItemProps) => {
  return (
    <div className="bg-red-100 hover:brightness-90 p-5">
      <p>{wokespaceUser.name}</p>
    </div>
  );
};
