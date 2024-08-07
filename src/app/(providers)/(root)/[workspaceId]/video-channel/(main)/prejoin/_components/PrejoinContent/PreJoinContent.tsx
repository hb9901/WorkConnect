'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
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
  const { workspaceUserId, workspaceId } = useUserStore();
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const { userChoices, saveUsername } = usePersistentUserChoices();

  useEffect(() => {
    if (workspaceUser) {
      saveUsername(workspaceUser.name);
    }
  }, []);
  useEffect(() => {
    // console.log('>>>', userChoices.username);
  }, [userChoices]);
  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    router.push(`/${workspaceId}/video-channel/${room}?username=${values.username}`);
  }, []);

  return (
    <div className="h-[100vh] bg-[#fff] flex flex-col mt-0">
      <PrejoinHeader />
      <CustomPrejoin
        joinLabel={'입장하기'}
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
