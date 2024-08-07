'use client';

import {
  CarouselLayout,
  FocusLayout,
  FocusLayoutContainer,
  ParticipantClickEvent,
  ParticipantTile,
  TrackReferenceOrPlaceholder,
  useLocalParticipant,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import BottomControlBar from '../BottomControlBar';

const CustomVideoConference = () => {
  const [focusedTrack, setFocusedTrack] = useState<TrackReferenceOrPlaceholder | null>();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: true }
  );
  const { localParticipant } = useLocalParticipant();
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const remotesTrack = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    } else {
      setFocusedTrack(null);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (screenShareTrackRef) return;
    if (speakerTrackRef && speakerTrackRef.participant.isCameraEnabled) {
      setFocusedTrack(speakerTrackRef);
    }
  }, [speakerTrackRef]);

  const clickFocus = (e: ParticipantClickEvent) => {
    if (e.participant.identity === focusedTrack?.participant.identity) {
      setFocusedTrack(null);
      return;
    }
    setFocusedTrack({
      participant: e.participant,
      publication: e.participant.getTrackPublication(e.track!.source),
      source: e.track!.source
    });
  };

  return (
    <>
      {/*TODO: focus Track이 있어야 할때 와 없어야 할때 구분 가능해야함 */}
      <div className="flex flex-col items-center gap-2 h-[80vh] p-3">
        <div className="flex p-4 h-full items-center">
          <div className={`overflow-hidden mr-5 ${focusedTrack ? 'sm:w-[full] m-5' : 'none'} `}>
            <FocusLayoutContainer
              style={{
                height: '80vh',
                width: '80rem',
                display: `${focusedTrack ? 'flex' : 'none'}`,
                justifyItems: 'center',
                alignItems: 'center',
                padding: '5px'
              }}
            >
              {focusedTrack && <FocusLayout trackRef={focusedTrack} />}
            </FocusLayoutContainer>
          </div>
          <div className={`${focusedTrack ? 'hidden md:block w-[300px]' : 'w-full'} h-full`}>
            <CarouselLayout
              orientation="vertical"
              tracks={tracks}
              style={{
                height: 'calc(100vh - var(--lk-control-bar-height))',
                gap: `${focusedTrack ? '5px' : 'none'}`
              }}
            >
              <ParticipantTile onParticipantClick={clickFocus} />
            </CarouselLayout>
          </div>
        </div>
        <BottomControlBar controls={{ microphone: true, camera: true, screenShare: true }} variation="verbose" />
      </div>
    </>
  );
};

export default CustomVideoConference;
