'use client';

import useStreamSetStore from '@/store/streamSetStore';
import {
  CarouselLayout,
  ControlBar,
  FocusLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  TrackReferenceOrPlaceholder,
  useTracks
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Params = {
  params: {
    name: string;
  };
};

const VideoCallRoom = ({ params }: Params) => {
  // TODO: get user input for room and name
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
    <LiveKitRoom
      video={videoEnable}
      audio={audioEnable}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
};
export default VideoCallRoom;

const MyVideoConference = () => {
  const [focusedTrack, setFocusedTrack] = useState<TrackReferenceOrPlaceholder>();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );
  const focustrack = tracks.find((track) => track.participant.isSpeaking);

  useEffect(() => {
    if (focustrack) setFocusedTrack(focustrack);
  }, [focustrack]);

  return (
    <div className="flex  h-[80vh]">
      {focusedTrack && <FocusLayout trackRef={focusedTrack}></FocusLayout>}
      <div className="w-[25vw]">
        <CarouselLayout
          orientation="vertical"
          tracks={tracks}
          style={{ height: 'calc(50vh 50vw - var(--lk-control-bar-height))' }}
        >
          <ParticipantTile onParticipantClick={() => {}} />
        </CarouselLayout>
      </div>
    </div>
  );
};
