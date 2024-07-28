'use client';

import useStreamSetStore from '@/store/streamSetStore';
import { ControlBar, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import VideoConference from '../VideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [connect, setConnect] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const { audioEnable, videoEnable, isStreamOk } = useStreamSetStore();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username');
  const onLeave = useCallback(() => router.push('/video-channel'), []);

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

  const handleDisconnect = () => {
    setConnect(false);
    setIsConnected(false);
  };

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
      onDisconnected={onLeave}
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
};

export default VideoRoom;
