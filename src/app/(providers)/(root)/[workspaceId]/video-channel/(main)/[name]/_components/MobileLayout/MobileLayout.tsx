import { FocusLayoutContainer, isTrackReference, useLocalParticipant, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
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
    <div id="mobile-layout" className={`relative h-full w-screen `}>
      <FocusLayoutContainer className="h-[100%]">
        <div className="absolute h-screen">
          {isTrackReference(focusedTrack) && <VideoTrack trackRef={focusedTrack} />}
        </div>
        <div className="absolute mt-1 right-0 top-0 ">
          <ParticipantListLayout trackRefs={remoteTrackRefs} />
        </div>
      </FocusLayoutContainer>
    </div>
  );
};

export default MobileLayout;
