import { FocusLayout, FocusLayoutContainer, useLocalParticipant, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import FocusedVideoTrack from '../FocusedVideoTrack';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const WebLayout = ({ tracks }: VideoConferenceProps) => {
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();
  const { isMobile } = useDeviceType();
  const { localParticipant } = useLocalParticipant();
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];

  useEffect(() => {
    if (speakerTrackRef && !screenShareTrackRef) {
      setFocusedTrack(speakerTrackRef);
    }
  }, []);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    } else {
      setFocusedTrack(undefined);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (!localTracks) return;
    setFocusedTrack(localTracks);
  }, [localTracks]);

  return (
    <FocusLayoutContainer className={`flex items-center justify-center w-[80vw] h-full m-auto overflow-hidden`}>
      {focusedTrack && (
        <FocusLayout
          trackRef={focusedTrack}
          className="h-full md:w-[65vw] lg:w-[70vw] xl:w-[75vw] md:ml-[2rem] lg:ml-[3rem] xl:ml-[4rem] "
        >
          <FocusedVideoTrack focusedTrackRef={focusedTrack} />
        </FocusLayout>
      )}
      <div className={`${focusedTrack ? 'flex  max-w-[300px] right-0' : 'flex'} `}>
        <ParticipantListLayout />
      </div>
    </FocusLayoutContainer>
  );
};

export default WebLayout;
