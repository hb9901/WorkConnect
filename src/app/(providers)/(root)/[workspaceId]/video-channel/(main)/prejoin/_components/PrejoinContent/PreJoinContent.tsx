'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';

import useStreamSetStore from '@/store/streamSetStore';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { LocalUserChoices, usePersistentUserChoices } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import CustomPrejoin from '../CustomPrejoin';
import PrejoinHeader from '../PrejoinHeader';

const PreJoinContent = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');

  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { workspaceUserId } = useUserStore();
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const { userChoices, saveUsername } = usePersistentUserChoices();
  const { setIsSettingOk } = useStreamSetStore();

  useEffect(() => {
    if (workspaceUser) {
      saveUsername(workspaceUser.name);
    }
  }, []);

  useEffect(() => {
    setIsSettingOk(true);
  }, [userChoices]);

  const handlePreJoinSubmit = useCallback(
    (values: LocalUserChoices) => {
      router.push(`/${workspaceId}/video-channel/${room}?username=${userChoices.username}`);
    },
    [userChoices]
  );

  return (
    <div className="h-[100vh] bg-[#fff] flex flex-col mt-0">
      <PrejoinHeader />
      <CustomPrejoin
        joinLabel={'지금 참가'}
        userLabel={userChoices!.username}
        defaults={userChoices}
        onSubmit={handlePreJoinSubmit}
        onValidate={(values) => {
          return true;
        }}
      />
    </div>
  );
};

export default PreJoinContent;
