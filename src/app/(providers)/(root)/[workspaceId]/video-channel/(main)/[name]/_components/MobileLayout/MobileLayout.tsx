import { FocusLayout, FocusLayoutContainer, useLocalParticipant } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import FocusedVideoTrack from '../FocusedVideoTrack';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const MobileLayout = ({ tracks }: VideoConferenceProps) => {
  const { localParticipant } = useLocalParticipant();
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  const remoteTrackRefs = tracks.filter((track) => track.participant.sid !== localParticipant.sid);
  useEffect(() => {
    const filteredTrack = tracks.filter(
      (track) => track.participant.sid === localParticipant.sid && track.source === Track.Source.Camera
    )[0];
    setFocusedTrack(filteredTrack);
  }, [tracks]);

  return (
    <div className={`relative h-[50rem] w-screen items-center justify-center overflow-hidden `}>
      <FocusLayoutContainer className={`h-full flex`}>
        {focusedTrack && (
          <FocusLayout trackRef={focusedTrack} style={{ height: '50rem', display: 'flex' }}>
            <FocusedVideoTrack focusedTrackRef={focusedTrack} />
          </FocusLayout>
        )}
        <div className="absolute mt-1 right-0 top-0 ">
          <ParticipantListLayout trackRefs={remoteTrackRefs} />
        </div>
      </FocusLayoutContainer>
    </div>
  );
};

export default MobileLayout;
