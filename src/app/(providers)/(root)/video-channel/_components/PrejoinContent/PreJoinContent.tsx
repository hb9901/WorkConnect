'use client';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, PreJoin } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PreJoinContent = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const name = searchParams.get('username');

  const router = useRouter();
  const { audio, video, userName, setUserName, setAudio, setAudioEnable, setVideo, setVideoEnable, StreamCheck } =
    useStreamSetStore();

  useEffect(() => {
    setUserName(name || 'test-user');
  }, [name]);
  const setStream = (values: LocalUserChoices) => {
    setAudio(values.audioDeviceId);
    setVideo(values.videoDeviceId);
    setAudioEnable(values.audioEnabled);
    setVideoEnable(values.videoEnabled);
    setUserName(name || 'test-user');
    if (audio.length > 0 && video.length > 0) {
      StreamCheck(true);
      console.log('유저 네임 : ', userName);
      router.push(`/video-channel/${room}?username=${userName}`);
    }
  };

  return (
    <div className="h-[100vh] bg-[#121212]">
      <PreJoin
        joinLabel={'입장하기'}
        userLabel={userName}
        data-lk-theme="default"
        defaults={{ videoDeviceId: video, audioDeviceId: audio }}
        onSubmit={setStream}
        onValidate={(values) => {
          return true;
        }}
      />
    </div>
  );
};

export default PreJoinContent;
