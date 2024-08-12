import {
  FocusLayout,
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  useTracks,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const WebLayout = ({ tracks }: VideoConferenceProps) => {
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  const { localParticipant } = useLocalParticipant();
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

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
    <FocusLayoutContainer
      className={`${focusedTrack ? 'block' : 'none'} relative w-screen h-[81vh] m-0 overflow-hidden`}
    >
      {focusedTrack && (
        <FocusLayout trackRef={focusedTrack} className="h-full md:w-[65vw] lg:w-[70vw] xl:w-[75vw] mx-1">
          {isTrackReference(focusedTrack) && (
            <div className="flex justify-center items-center m-0 w-full h-full">
              <VideoTrack trackRef={focusedTrack} />
            </div>
          )}
        </FocusLayout>
      )}
      <div className={`${focusedTrack ? 'flex items-start my-auto mx-auto' : 'none'}`}>
        <ParticipantListLayout />
      </div>
    </FocusLayoutContainer>
  );
};

export default WebLayout;
