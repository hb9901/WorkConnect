'use client';

import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import { LiveKitRoom, RoomAudioRenderer, usePersistentUserChoices } from '@livekit/components-react';
import { RoomConnectOptions } from 'livekit-client';

import { redirect, useSearchParams } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import Loading from '../../../_components/Loading';
import VideoChannelHeader from '../VideoChannelHeader';
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
      // console.log(`리다이렉트 되는거임. ${username} , ${isSettingOk}`);
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
  if (typeof token !== 'string' && token!) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Typography as="h5" variant="Body16px">
          토근을 가져오는 중 입니다...
        </Typography>
      </div>
    );
  }

  if (token === '' || token === null) {
    return <Loading />;
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
      <VideoChannelHeader />
      <CustomVideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoRoom;
