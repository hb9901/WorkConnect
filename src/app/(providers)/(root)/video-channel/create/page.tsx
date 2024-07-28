// 임시 파일

'use client';
import useChannel from '@/hooks/useChannel';
import useChannelUser from '@/hooks/useChannelUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import { ChannelInsertType } from '@/types/channel';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FAKE_WORKSPACE_ID = 2;

type WorkspaceUserType = Tables<'workspace_user'>;

const CreateChannelPage = () => {
  const userName = 'minkon';
  const router = useRouter();

  const { workspaceUserList } = useWorkspaceUserList(FAKE_WORKSPACE_ID);
  const { createChannel } = useChannel({ type: 'video', workspace_id: FAKE_WORKSPACE_ID }); // workspace_id 안에 video 채널

  const [selectedUserList, setSelectedUserList] = useState<WorkspaceUserType[]>([]);
  const [roomName, setRoomName] = useState<string>();
  const [workspaceUserIds, setWorkspaceUserIds] = useState<string[]>([]);

  const { enterChannel } = useChannelUser({ workspaceUserIds });

  useEffect(() => {
    const temp = selectedUserList.map((user) => user.name).join(',');
    setRoomName(temp);
    setWorkspaceUserIds(selectedUserList.map((user) => user.id));
  }, [selectedUserList]);

  const handleSelectUser = (selectedUser: WorkspaceUserType) => {
    setSelectedUserList((prev) => {
      if (prev.some((user) => user.user_id === selectedUser.user_id)) {
        return prev.filter((user) => user.user_id !== selectedUser.user_id); // 선택 해제
      }
      return [...prev, selectedUser];
    });
  };

  const handleSubmit = async () => {
    if (!roomName) {
      return alert('사용자를 선택해주세요.');
    }

    const newChannel: ChannelInsertType = {
      name: roomName as string,
      type: 'video',
      workspace_id: FAKE_WORKSPACE_ID
    };

    const channelId = await createChannel(newChannel); // 채널 아이디 반환
    console.log('생성된 채널 아이디', channelId.id);
    enterChannel(channelId.id);

    router.push(`/video-channel/${roomName}?username=${userName}`);
  };

  return (
    <div>
      <div className="flex gap-5 p-5">
        <button onClick={handleSubmit} className="border hover:brightness-90">
          확인
        </button>
      </div>
      {roomName && roomName.length > 0 && <p>{roomName}</p>}
      {workspaceUserList &&
        workspaceUserList.map((workspaceUser) => (
          <div key={workspaceUser.id} onClick={() => handleSelectUser(workspaceUser)}>
            <UserItem
              {...workspaceUser}
              isSelected={selectedUserList.some((user) => user.user_id === workspaceUser.user_id)}
            />
          </div>
        ))}
    </div>
  );
};

export default CreateChannelPage;

type UserItemProps = Tables<'workspace_user'> & { isSelected: boolean };

const UserItem = ({ isSelected, ...workespaceUser }: UserItemProps) => {
  return (
    <div
      className={`bg-slate-50 flex hover:brightness-90 p-5 active:brightness-75 ${isSelected ? 'border-2 border-green-500' : ''}`}
    >
      <div
        className={`rounded-full w-[49px] h-[49px] ${isSelected ? 'bg-green-500' : 'bg-[#B1B1B1]'} flex justify-center items-center`}
      >
        profile
      </div>
      <p className="flex items-center ml-3">{workespaceUser.name}</p>
    </div>
  );
};
