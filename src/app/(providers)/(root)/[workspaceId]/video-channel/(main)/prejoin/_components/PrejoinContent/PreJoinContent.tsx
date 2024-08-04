'use client';
import SnackBar from '@/components/SnackBar';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, usePersistentUserChoices } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CustomPrejoin from '../CustomPrejoin';
import PrejoinHeader from '../PrejoinHeader';

type PrejoinContentType = {
  username: string;
};

const PreJoinContent = ({ username }: PrejoinContentType) => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();
  const room = searchParams.get('room');

  const router = useRouter();
  const { setIsSettingOk } = useStreamSetStore();
  const { userChoices, saveUsername } = usePersistentUserChoices();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (username) {
      saveUsername(username);
    }
    setIsSettingOk(true);
  }, []);

  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    if (!username) {
      setIsError(true);
      return (
        <SnackBar onClose={() => setIsError(false)} isOpen={isError} duration={2000} message="이름을 입력해주세요." />
      );
    }

    router.push(
      `/${workspaceId}/video-channel/${room}?username=${userChoices!.username ? userChoices.username : username}`
    );
  }, []);

  return (
    <>
      <PrejoinHeader />
      <div className="h-[100vh] bg-[#fff] flex flex-col  items-center justify-center ">
        <CustomPrejoin
          joinLabel={'입장하기'}
          userLabel={username}
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
