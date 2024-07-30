'use client';

import {
  ControlBar,
  FocusLayout,
  GridLayout,
  ParticipantClickEvent,
  ParticipantTile,
  RoomAudioRenderer,
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

const CustomVideoConference = () => {
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
    } else {
      setFocusedTrack(null);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (screenShareTrackRef) return;
    if (speakerTrackRef) {
      setFocusedTrack(speakerTrackRef);
    }
  }, [speakerTrackRef]);

  const clickFocus = (e: ParticipantClickEvent) => {
    setFocusedTrack({
      participant: e.participant,
      publication: e.participant.getTrackPublication(e.track!.source),
      source: e.track!.source
    });
  };

  return (
    <div className="flex flex-col gap-2 h-[80vh] p-3">
      <div className="flex p-4 h-full items-center">
        <div className={`${focusedTrack ? 'w-[80vw] m-5' : 'none'}`}>
          {focusedTrack && <FocusLayout trackRef={focusedTrack} />}
        </div>
        <div className={` ${focusedTrack ? 'w-[300px]' : 'w-full'}`}>
          <GridLayout tracks={tracks} style={{ height: 'calc(50vh 50vw - var(--lk-control-bar-height))' }}>
            <ParticipantTile onParticipantClick={clickFocus} />
          </GridLayout>
        </div>
      </div>
      <RoomAudioRenderer />
      <ControlBar className="h-[20vw]" />
    </div>
  );
};

export default CustomVideoConference;
