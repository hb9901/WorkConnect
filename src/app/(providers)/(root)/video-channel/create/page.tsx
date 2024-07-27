'use client';
import useChannel from '@/hooks/useChannel';
import useChannelUser from '@/hooks/useChannelUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import { ChannelInsertType } from '@/types/channel';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FAKE_WORKSPACE_ID = 2;

// 임시 파일
type WorkspaceUserType = Tables<'workspace_user'>;

const CreateChannelPage = () => {
  const userName = 'minkon';
  const router = useRouter();

  const { workspaceUserList } = useWorkspaceUserList(FAKE_WORKSPACE_ID);
  const { createChannel } = useChannel('video', FAKE_WORKSPACE_ID);
  const [selectedUserList, setSelectedUserList] = useState<WorkspaceUserType[]>([]);

  const handleSelectUser = (user: WorkspaceUserType) => {
    setSelectedUserList((prev) => [...selectedUserList!, user]);
  };
  const handleSubmit = async (roomName: string) => {
    const newChannel: ChannelInsertType = {
      name: roomName,
      type: 'video',
      workspace_id: FAKE_WORKSPACE_ID
    };

    const channel = await createChannel(newChannel); // 생성된 채널 정보 가져오기

    console.log('생성된 채널 정보 : ', channel);
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
  const makeRoomName = () => {
    let roomName = '';
    for (let i = 0; i < selectedUserList.length; i++) {
      if (i !== 0) {
        roomName += `,${selectedUserList[i]}`;
      } else {
        roomName + selectedUserList[i];
      }
    }
    return roomName;
  };
  return (
    <div>
      <div className="flex gap-5 p-5">
        <button onClick={() => handleSubmit(makeRoomName())} className="border hover:brightness-90">
          확인
        </button>
      </div>
      {workspaceUserList &&
        workspaceUserList.map((wokespaceUser) => (
          <div key={wokespaceUser.id} onClick={() => handleSelectUser(wokespaceUser)}>
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
      <p>{wokespaceUser.user_id}</p>
    </div>
  );
};
