'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import { LiveKitRoom, RoomAudioRenderer, usePersistentUserChoices } from '@livekit/components-react';
import { RoomConnectOptions } from 'livekit-client';

import { redirect, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useMemo, useState } from 'react';
import CustomVideoConference from '../VideoConference/CustomVideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [token, setToken] = useState('');

  const { userChoices } = usePersistentUserChoices();
  const { isSettingOk } = useStreamSetStore();

  useEffect(() => {
    if (!username || !isSettingOk) {
      redirect(`/${workspaceId}/video-channel/prejoin?room=${name}`);
      return;
    }
    (async () => {
      try {
        const room = name;
        const resp = await fetch(`/api/get-participant-token?room=${room}&username=${userChoices.username}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true
    };
  }, []);

  if (token === '' || token === null) {
    return <LoadingSpinner className="h-full w-full items-center justify-center" />;
  }

  return (
    <LiveKitRoom
      video={userChoices.videoEnabled}
      audio={userChoices.audioEnabled}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{ height: '100vh' }}
      connectOptions={connectOptions}
      options={{
        publishDefaults: {
          videoCodec: 'vp9'
        }
      }}
    >
      <CustomVideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoRoom;
