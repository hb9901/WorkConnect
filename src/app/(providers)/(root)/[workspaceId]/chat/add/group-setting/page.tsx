'use client';

import { useRef } from 'react';
import TestHeader from '../../_components/TestHeader';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChannelType } from '@/types/channel';
import { PageLayout } from '@/components/PageLayout';
import { CheckIcon, XIcon } from '@/icons';

const GroupSettingPage = () => {
  const router = useRouter();
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
    <PageLayout
      title="그룹대화방 설정"
      showBottomBar={false}
      TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}
      TopBarRightIcon1={
        <button onClick={handleSubmit}>
          <CheckIcon />
        </button>
      }
    >
      <div className="flex flex-col gap-4 p-4 h-[300px] w-[300px] items-center justify-center mx-auto">
        <input
          ref={ref}
          type="text"
          className="text-black border-b border-gray-300 w-full h-[45px]"
          placeholder="그룹채팅방 이름"
        />
      </div>
    </PageLayout>
  );
};

export default GroupSettingPage;
