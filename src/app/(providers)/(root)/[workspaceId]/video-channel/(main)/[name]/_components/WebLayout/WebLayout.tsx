import {
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  useSpeakingParticipants,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import FocusedVideoTrack from '../FocusedVideoTrack';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const WebLayout = ({ tracks }: VideoConferenceProps) => {
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();
  const { localParticipant } = useLocalParticipant();
  const speakers = useSpeakingParticipants();
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];

  useEffect(() => {
    if (!focusedTrack) {
      const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];
      if (localTracks) {
        setFocusedTrack(localTracks);
      }
    }
  }, [tracks]);

  useEffect(() => {
    const speaker = speakers[0];
    if (isTrackReference(speaker) && !focusedTrack) {
      setFocusedTrack(speaker);
    }
  }, [speakers]);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    }
  }, [screenShareTrackRef]);

  return (
    <FocusLayoutContainer className={`relative flex items-end justify-end h-full  overflow-y-hidden`}>
      {focusedTrack && (
        <div
          style={{ width: 'calc(100% - 300px)' }}
          id="focusTrackWrapper"
          className="absolute pl-[4rem] top-[1rem] bottom-0
        "
        >
          <div className="h-[88%] w-full flex items-center justify-center">
            <FocusedVideoTrack />
          </div>
        </div>
      )}
      <div id="participantLayoutWrapper" className="absolute top-[1rem] right-0 flex flex-shrink-0 h-full w-[300px] ">
        <ParticipantListLayout />
      </div>
    </FocusLayoutContainer>
  );
};

export default React.memo(WebLayout);
