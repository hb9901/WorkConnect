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

enum FocusPriority {
  SCREEN_SHARE,
  SPEAKER,
  DEFAULT
}

const VideoConference = () => {
  const [focusedTrack, setFocusedTrack] = useState<TrackReferenceOrPlaceholder | null>();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    } else if (speakerTrackRef) {
      setFocusedTrack(speakerTrackRef);
    }
  }, [speakerTrackRef, screenShareTrackRef]);

  return (
    <div className="flex gap-2 h-[80vh] p-3">
      {focusedTrack && <FocusLayout trackRef={focusedTrack}></FocusLayout>}
      <div className={`${focusedTrack ? 'w-[25vw]' : ''}`}>
        <CarouselLayout
          orientation={`${focusedTrack ? 'vertical' : 'horizontal'}`}
          tracks={tracks}
          style={{ height: 'calc(50vh 50vw - var(--lk-control-bar-height))' }}
        >
          <ParticipantTile />
        </CarouselLayout>
      </div>
    </div>
  );
};

export default VideoConference;
