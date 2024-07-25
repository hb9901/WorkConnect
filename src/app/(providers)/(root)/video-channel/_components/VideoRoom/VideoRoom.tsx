'use client';

import useStreamSetStore from '@/store/streamSetStore';
import { ControlBar, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VideoConference from '../VideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const [token, setToken] = useState('');

  const { audioEnable, videoEnable, isStreamOk } = useStreamSetStore();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username');

  useEffect(() => {
    if (!userName || !isStreamOk) {
      redirect(`/video-channel/prejoin?room=${name}&username=${userName}`);
      return;
    }
    (async () => {
      try {
        const resp = await fetch(`/api/get-participant-token?room=${name}&username=${userName}`);
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
  );
};

export default VideoRoom;
