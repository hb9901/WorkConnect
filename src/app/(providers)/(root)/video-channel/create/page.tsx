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
  const { createChannel } = useChannel({ type: 'video', workspace_id: FAKE_WORKSPACE_ID });
  const [selectedUserList, setSelectedUserList] = useState<WorkspaceUserType[]>([]);
  const [roomName, setRoomName] = useState<string>();

  useEffect(() => {
    const temp = selectedUserList.map((user) => user.name).join(',');
    setRoomName(temp);
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
    const newChannel: ChannelInsertType = {
      name: roomName as string,
      type: 'video',
      workspace_id: FAKE_WORKSPACE_ID
    };

    const channel = await createChannel(newChannel); // 생성된 채널 정보 가져오기

    console.log(channel);

    selectedUserList.forEach((user) => {
      const { enterChannel } = useChannelUser(channel[0].channel_id, user.id);
      enterChannel(user.user_id);
    });

    if (roomName) {
      router.push(`/video-channel/${roomName}?username=${userName}`);
    } else {
      alert('방이름과 사용자 이름을 입력해 주세요.');
    }
  };
  // [utils] : 방 이름 작성

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
