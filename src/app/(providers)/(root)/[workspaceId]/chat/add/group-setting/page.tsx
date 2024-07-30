'use client';

import { useRef } from 'react';
import TestHeader from '../../_components/TestHeader';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useSearchParams } from 'next/navigation';
import type { ChannelType } from '@/types/channel';

const GroupSettingPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as ChannelType['type'];
  const ref = useRef<HTMLInputElement>(null);
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();

  const handleSubmit = async () => {
    if (!ref.current?.value) {
      alert('그룹채팅방 이름을 입력해주세요.');
      return;
    }

    const userIds = getSelectedUserIds();

    if (userIds.length < 2) {
      return;
    }

    handleCreateChannelAndUsers({ channelName: ref.current.value, userIds, type });
  };

  return (
    <>
      <TestHeader title="그룹채팅방 설정" rightButton={<button onClick={handleSubmit}>확인</button>} />
      <div className="flex flex-col gap-4 p-4 h-[300px] w-[300px] items-center justify-center mx-auto">
        <input
          ref={ref}
          type="text"
          className="text-black border-b border-gray-300 w-full h-[45px]"
          placeholder="그룹채팅방 이름"
        />
      </div>
    </>
  );
};

export default GroupSettingPage;
