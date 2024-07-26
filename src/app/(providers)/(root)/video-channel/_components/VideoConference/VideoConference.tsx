'use client';

import {
  CarouselLayout,
  FocusLayout,
  ParticipantTile,
  TrackReferenceOrPlaceholder,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
const VideoConference = () => {
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
    <div className="flex gap-2 h-[80vh] p-3">
      {focusedTrack && <FocusLayout trackRef={focusedTrack}></FocusLayout>}
      <div className="w-[25vw]">
        <CarouselLayout
          orientation="vertical"
          tracks={tracks}
          style={{ height: 'calc(50vh 50vw - var(--lk-control-bar-height))' }}
        >
          <ParticipantTile onClick={(e) => console.log(e.detail)} />
        </CarouselLayout>
      </div>
    </div>
  );
};

export default VideoConference;
