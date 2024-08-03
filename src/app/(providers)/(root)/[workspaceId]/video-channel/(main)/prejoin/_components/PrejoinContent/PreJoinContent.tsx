'use client';
import SnackBar from '@/components/SnackBar';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useStreamSetStore from '@/store/streamSetStore';
import useUserStore from '@/store/userStore';
import { LocalUserChoices, usePersistentUserChoices } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CustomPrejoin from '../CustomPrejoin';
import PrejoinHeader from '../PrejoinHeader';

const PreJoinContent = () => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();
  const room = searchParams.get('room');

  const router = useRouter();
  const { setIsSettingOk } = useStreamSetStore();
  const { userChoices, saveUsername } = usePersistentUserChoices();
  const { workspaceUserId } = useUserStore();
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (workspaceUser?.name) {
      saveUsername(workspaceUser!.name);
    }
    setIsSettingOk(true);
  }, []);

  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    if (!workspaceUser?.name) {
      setIsError(true);
      return (
        <SnackBar onClose={() => setIsError(false)} isOpen={isError} duration={2000} message="이름을 입력해주세요." />
      );
    }

    router.push(`/${workspaceId}/video-channel/${room}?username=${userChoices!.username || workspaceUser.name}`);
  }, []);

  return (
    <>
      <PrejoinHeader />
      <div className="h-[100vh] bg-[#fff] flex flex-col  items-center justify-center ">
        <CustomPrejoin
          joinLabel={'입장하기'}
          userLabel={workspaceUser?.name}
          defaults={userChoices}
          onSubmit={handlePreJoinSubmit}
          onValidate={(values) => {
            return true;
          }}
        />
      </div>
    </>
  );
};

export default PreJoinContent;
