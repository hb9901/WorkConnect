import {
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  isTrackReference,
  ParticipantClickEvent,
  useLocalParticipant,
  useTracks,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import RemoteParticipant from '../RemoteParticipant';

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

  const clickFocus = (e: ParticipantClickEvent) => {
    if (e.participant.identity === focusedTrack?.participant.identity) {
      setFocusedTrack(undefined);
      return;
    }
    setFocusedTrack({
      participant: e.participant,
      publication: e.participant.getTrackPublication(e.track!.source),
      source: e.track!.source
    });
  };
  return (
    <FocusLayoutContainer className={`${focusedTrack ? 'block' : 'none'} relative w-screen`}>
      {focusedTrack && (
        <FocusLayout trackRef={focusedTrack} className="h-screen w-[80vw] mx-1 -z-10">
          {isTrackReference(focusedTrack) && <VideoTrack trackRef={focusedTrack} />}
        </FocusLayout>
      )}
      <GridLayout tracks={tracks} className="flex w-[50px] max-h-5 justify-center items-center">
        <RemoteParticipant onParticipantClick={clickFocus} />
      </GridLayout>
    </FocusLayoutContainer>
  );
};

export default WebLayout;
