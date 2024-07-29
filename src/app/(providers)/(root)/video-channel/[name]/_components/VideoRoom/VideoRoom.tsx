'use client';

import useChannelUser from '@/hooks/useChannelUser';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import useStreamSetStore from '@/store/streamSetStore';
import { ControlBar, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CONST } from '../../../_constants/contants';
import { deleteChannel } from '../../_utils/videoChannelDelete';
import VideoConference from '../VideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  const searchParams = useSearchParams();
  const userName = searchParams.get('username');

  const { preJoinChoices, isSettingOk } = useStreamSetStore();
  const { enteredChannelId } = useEnterdChannelStore();
  const { leaveChannel } = useChannelUser({ channelId: enteredChannelId! });

  const onLeave = useCallback(() => {
    // TODO : 삭제 되는 거 확인했으니, 현재 유저 아이디 값 받아오면 됨.
    leaveChannel(CONST.FAKE_WORKSPACE_USER_ID);
    deleteChannel(enteredChannelId);
    router.push('/video-channel');
  }, []);

  useEffect(() => {
    if (!userName || !isSettingOk) {
      redirect(`/video-channel/prejoin?room=${name}`);
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
  }, [userName]);

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={preJoinChoices.videoEnabled}
      audio={preJoinChoices.audioEnabled}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100vh' }}
      onDisconnected={onLeave}
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
};

export default VideoRoom;
