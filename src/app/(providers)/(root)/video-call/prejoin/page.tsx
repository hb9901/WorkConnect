'use client';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, PreJoin, setLogLevel } from '@livekit/components-react';
import '@livekit/components-styles';
import { useRouter, useSearchParams } from 'next/navigation';

const PreJoinExample = () => {
  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const userName = searchParams.get('username');
  const router = useRouter();
  const { audio, video, setAudio, setAudioEnable, setVideo, setVideoEnable, StreamCheck } = useStreamSetStore();

  const setStream = (values: LocalUserChoices) => {
    setAudio(values.audioDeviceId);
    setVideo(values.videoDeviceId);
    setAudioEnable(values.audioEnabled);
    setVideoEnable(values.videoEnabled);
    if (audio.length > 0 && video.length > 0) {
      StreamCheck(true);
      router.push(`/video-call/${room}?username=${userName}`);
    }
  };

  return (
    <div className="flex items-center h-[100vh] bg-[#121212]">
      <PreJoin
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

export default PreJoinExample;
