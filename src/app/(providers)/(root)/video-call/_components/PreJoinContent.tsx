import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, PreJoin } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';

const PreJoinContent = () => {
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
    <div className="h-[100vh] bg-[#121212]">
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

export default PreJoinContent;
