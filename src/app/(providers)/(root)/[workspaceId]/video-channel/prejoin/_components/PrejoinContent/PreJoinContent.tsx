'use client';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices } from '@livekit/components-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CustomPrejoin from '../CustomPrejoin';

const PreJoinContent = () => {
  const prams = useParams();
  const searchParams = useSearchParams();
  const room = searchParams.get('room');

  const router = useRouter();
  const [userName, setUserName] = useState<string>();
  const { preJoinChoices, setPreJoinChoices, setIsSettingOk } = useStreamSetStore();

  useEffect(() => {
    setUserName(preJoinChoices.username);
  }, []);

  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    console.log('LocalUserChoices', values);
    setPreJoinChoices(values);
    setIsSettingOk(true);
    router.push(`/${prams.workspaceId}/video-channel/${room}?username=${preJoinChoices.username}`);
  }, []);

  return (
    <div className="h-[100vh] bg-[#fff] flex items-center justify-center ">
      <CustomPrejoin
        joinLabel={'입장하기'}
        userLabel={userName}
        defaults={preJoinChoices}
        onSubmit={handlePreJoinSubmit}
        onValidate={(values) => {
          return true;
        }}
      />
      {/* <PreJoin/> */}
    </div>
  );
};

export default PreJoinContent;
