'use client';

import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import useUserStore from '@/store/userStore';
import { LiveKitRoom, RoomAudioRenderer, usePersistentUserChoices } from '@livekit/components-react';
import { RoomConnectOptions } from 'livekit-client';
import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loading from '../../../_components/Loading';
import VideoChannelHeader from '../VideoChannelHeader';
import CustomVideoConference from '../VideoConference/CustomVideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');

  const { userChoices } = usePersistentUserChoices();
  const { isSettingOk } = useStreamSetStore();
  const { workspaceUserId } = useUserStore();

  useEffect(() => {
    if (!searchParams.get('username') || !isSettingOk) {
      redirect(`/${workspaceId}/video-channel/prejoin?room=${name}`);
      return;
    }
    (async () => {
      try {
        const room = params.name;
        console.log(room, workspaceUserId);
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

  if (token === '') {
    return <Loading />;
  }
  if (typeof token !== 'string') {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Typography as="h5" variant="Body16px">
          호스트가 서버를 열지 않았습니다...
        </Typography>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={userChoices.videoEnabled}
      audio={userChoices.audioEnabled}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{ height: '100vh' }}
      connectOptions={connectOptions}
    >
      <VideoChannelHeader />
      <CustomVideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoRoom;
