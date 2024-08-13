import {
  FocusLayout,
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import ParticipantListLayout from '../RemoteParticipant';

const MobileLayout = ({ tracks }: VideoConferenceProps) => {
  const { localParticipant } = useLocalParticipant();
  const { isMobile } = useDeviceType();
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  // TODO: 나를 제외한 사용자 리스트로 출력 해보기.
  const remoteTrackRefs = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  useEffect(() => {
    const filteredTrack = tracks.filter(
      (track) => track.participant.sid === localParticipant.sid && track.source === Track.Source.Camera
    )[0];
    setFocusedTrack(filteredTrack);
  }, [localParticipant]);

  return (
    <div className={`relative h-full w-screen items-center justify-center `}>
      {focusedTrack && (
        <FocusLayoutContainer className={`${isMobile ? 'h-[80vh]' : 'h-full'} w-full flex justify-center my-1`}>
          <FocusLayout
            trackRef={focusedTrack}
            className="w-screen h-screen flex items-center justify-center overflow-hidden"
          >
            {isTrackReference(focusedTrack) && <VideoTrack trackRef={focusedTrack} />}
          </FocusLayout>
        </FocusLayoutContainer>
      )}
      <div className=" absolute h-screen mt-1 right-0 top-0 ">
        <ParticipantListLayout />
      </div>
    </div>
  );
};

export default MobileLayout;
