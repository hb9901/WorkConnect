'use client';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, PreJoin } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const PreJoinContent = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const name = searchParams.get('username');

  const router = useRouter();
  const [userName, setUserName] = useState<string>();
  const { preJoinChoices, setPreJoinChoices, setIsSettingOk } = useStreamSetStore();

  useEffect(() => {
    setUserName(preJoinChoices.username);
  }, []);

  // const setStream = (values: LocalUserChoices) => {
  //   setAudio(values.audioDeviceId);
  //   setVideo(values.videoDeviceId);
  //   setAudioEnable(values.audioEnabled);
  //   setVideoEnable(values.videoEnabled);
  //   setUserName(name || 'test-user');
  //   if (audio.length > 0 && video.length > 0) {
  //     StreamCheck(true);
  //     router.push(`/video-channel/${room}?username=${userName}`);
  //   }
  // };

  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    setPreJoinChoices(values);
    setIsSettingOk(true);
    router.push(`/video-channel/${room}?username=${preJoinChoices.username}`);
  }, []);

  return (
    <div className="h-[100vh] bg-[#121212]">
      <PreJoin
        joinLabel={'입장하기'}
        userLabel={userName}
        data-lk-theme="default"
        defaults={preJoinChoices}
        onSubmit={(values) => handlePreJoinSubmit(values)}
        onValidate={(values) => {
          return true;
        }}
      />
    </div>
  );
};

export default PreJoinContent;
