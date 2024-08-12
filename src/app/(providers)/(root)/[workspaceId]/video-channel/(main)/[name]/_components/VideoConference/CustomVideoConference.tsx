'use client';

import {
  ParticipantClickEvent,
  TrackReferenceOrPlaceholder,
  useLocalParticipant,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import BottomControlBar from '../BottomControlBar';
import MobileLayout from '../MobileLayout';
import WebLayout from '../WebLayout';

const CustomVideoConference = () => {
  const [focusedTrack, setFocusedTrack] = useState<TrackReferenceOrPlaceholder | null>();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: true }
  );
  const { localParticipant } = useLocalParticipant();
  const { isMobile } = useDeviceType();
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    } else {
      setFocusedTrack(null);
    }
  }, [screenShareTrackRef]);

  // useEffect(() => {
  //   if (screenShareTrackRef) return;
  //   if (speakerTrackRef && speakerTrackRef.participant.isCameraEnabled) {
  //     setFocusedTrack(speakerTrackRef);
  //   }
  // }, [speakerTrackRef]);

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
    <div className="flex flex-col items-center h-[full] bg-[#D9D9D9]">
      {isMobile ? <MobileLayout tracks={tracks} /> : <WebLayout tracks={tracks} />}

      <BottomControlBar controls={{ microphone: true, camera: true, screenShare: true }} variation="verbose" />
    </div>
  );
};

export default CustomVideoConference;
