import {
  FocusLayout,
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  useSpeakingParticipants,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useEffect } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import FocusedVideoTrack from '../FocusedVideoTrack';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const WebLayout = ({ tracks }: VideoConferenceProps) => {
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();
  const { isMobile } = useDeviceType();
  const { localParticipant } = useLocalParticipant();
  const speaker = useSpeakingParticipants();
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];

  useEffect(() => {
    if (!focusedTrack) {
      if (isTrackReference(localTracks)) {
        setFocusedTrack(localTracks);
      }
    }
  }, []);

  useEffect(() => {
    if (isTrackReference(speaker[0]) && !screenShareTrackRef) {
      setFocusedTrack(speaker[0]);
    }
  }, [speaker]);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (!localTracks) return;
    if (isTrackReference(localTracks)) {
      setFocusedTrack(localTracks);
    }
  }, [localTracks, isMobile]);

  return (
    <FocusLayoutContainer className={`relative flex items-end justify-end h-full  overflow-y-hidden`}>
      {focusedTrack && (
        <div
          style={{ width: 'calc(100% - 300px)' }}
          id="focusTrackWrapper"
          className="absolute pl-[4rem] top-[1rem] bottom-0
        "
        >
          <FocusLayout trackRef={focusedTrack} className="h-[88%] w-full flex items-center justify-center">
            <FocusedVideoTrack focusedTrackRef={focusedTrack} />
          </FocusLayout>
        </div>
      )}
      <div id="participantLayoutWrapper" className="absolute top-[1rem] right-0 flex flex-shrink-0 h-full w-[300px] ">
        <ParticipantListLayout />
      </div>
    </FocusLayoutContainer>
  );
};

export default React.memo(WebLayout);
