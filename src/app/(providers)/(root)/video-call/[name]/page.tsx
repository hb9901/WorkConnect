'use client';

import useStreamSetStore from '@/store/streamSetStore';
import { ControlBar, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';
import { redirect, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import VideoConference from '../_components/VideoConference';

type Params = {
  params: {
    name: string;
  };
};

const VideoCallRoom = ({ params }: Params) => {
  const [token, setToken] = useState('');

  const { audioEnable, videoEnable, isStreamOk } = useStreamSetStore();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username');

  useEffect(() => {
    if (!userName || !isStreamOk) {
      redirect(`/video-call/prejoin?room=${params.name}&username=${userName}`);
      return;
    }
    (async () => {
      try {
        const resp = await fetch(`/api/get-participant-token?room=${params.name}&username=${userName}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [isStreamOk, userName]);

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LiveKitRoom
        video={videoEnable}
        audio={audioEnable}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
      >
        <VideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </LiveKitRoom>
    </Suspense>
  );
};
export default VideoCallRoom;
